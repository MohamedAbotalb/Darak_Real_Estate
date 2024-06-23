<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTourRequest;
use App\Http\Resources\TourResource;
use App\Models\Notification;
use App\Models\Tour;
use App\Models\TourDate;
use Illuminate\Support\Facades\Auth;

class TourController extends Controller
{
    public function send_Request(StoreTourRequest $request){
    
        $tour = Tour::create([
            'user_id' => Auth::id(), 
            'property_id' => $request->input('property_id'),
            'status' => $request->input('status'),
        ]);

        foreach ($request->dates as $date) {
            TourDate::create([
                'tour_id' => $tour->id,
                'date' => $date,
            ]);
        }
        $landlord_id = $tour->property->user_id;

        Notification::create([
            'user_id' => Auth::id(),
            'landlord_id' => $landlord_id,
            'message' => 'Tour request for property : ' . $tour->property->title,
            'type' => 'request',
            'date' => now(),
        ]);

        return response()->json([
            'message' => 'Tour created successfully and Notification sent.',
            new TourResource($tour->load('tourDates', 'property'))
        ], 201);
    }
}
