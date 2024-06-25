<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTourRequest;
use App\Http\Resources\TourResource;
use App\Services\TourService;

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
}
