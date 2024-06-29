<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tours\StoreTourRequest;
use App\Http\Resources\TourResource;
use App\Repositories\TourRepositoryInterface;
use Illuminate\Http\Request;

class TourController extends Controller
{
    protected $tourRepository;

    public function __construct(TourRepositoryInterface $tourRepository)
    {
        $this->tourRepository = $tourRepository;
    }

    public function send_request(StoreTourRequest $request)
    {
        try {
            $tour = $this->tourRepository->createTour($request->validated());

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

        $success = $this->tourRepository->approveTour($id, $request->tour_date);
        if (!$success) {
            return response()->json(['error' => 'Tour not found'], 404);
        }

        if (!$success) {
            return response()->json(['error' => 'Selected tour date not found for this tour'], 404);
        }

        return response()->json(['message' => 'Tour approved successfully'], 200);
    }

    public function declineTour($id)
    {
        $success = $this->tourRepository->declineTour($id);
        if (!$success) {
            return response()->json(['error' => 'Tour not found'], 404);
        }

        return response()->json(['message' => 'Tour cancelled successfully'], 200);
    }

    public function getUserTours()
    {
        $tours = $this->tourRepository->getUserTours(auth()->id());

        return response()->json([
            'tours' => TourResource::collection($tours),
        ], 200);
    }
}