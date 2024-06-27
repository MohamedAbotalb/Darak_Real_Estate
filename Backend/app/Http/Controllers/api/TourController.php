<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tours\StoreTourRequest;
use App\Http\Resources\TourResource;
use App\Models\Notification;
use App\Models\Tour;
use App\Models\TourDate;
use App\Services\TourService;
use Illuminate\Http\Request;

class TourController extends Controller
{
    protected $tourService;

    public function __construct(TourService $tourService)
    {
        $this->tourService = $tourService;
    }

    public function send_request(StoreTourRequest $request)
    {
        try {
            $tour = $this->tourService->createTour($request->validated());

            return response()->json([
                'message' => 'Tour created successfully and Notification sent.',
                'tour' => new TourResource($tour)
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create tour and send notification.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function approveTour(Request $request, $id)
    {
        $request->validate([
            'tour_date' => 'required|exists:tour_dates,id,tour_id,' . $id,
        ]);

        $tour = Tour::findOrFail($id);

        $tourDateId = $request->tour_date;
        $tourDate = TourDate::where('id', $tourDateId)
            ->where('tour_id', $id)
            ->first();

        if (!$tourDate) {
            return response()->json(['error' => 'Selected tour date not found for this tour'], 404);
        }

        $tour->status = 'approved';
        $tour->save();

        $tourDate->approved = true;
        $tourDate->save();

        Notification::create([
            'user_id' => $tour->user_id,
            'landlord_id' => $tour->property->user_id,
            'message' => 'Tour request for property ' . $tour->property->title . ' has been approved',
            'type' => 'confirmation',
            'date' => now(),
        ]);

        return response()->json(['message' => 'Tour approved successfully'], 200);
    }
    public function declineTour($id)
    {
        $tour = Tour::findOrFail($id);

        $tour->status = 'declined';
        $tour->save();

        Notification::create([
            'user_id' => $tour->user_id,
            'landlord_id' => $tour->property->user_id,
            'message' => 'Tour request for property ' . $tour->property->title . ' has been cancelled',
            'type' => 'cancelation',
            'date' => now(),
        ]);

        return response()->json(['message' => 'Tour cancelled successfully'], 200);
    }
}
