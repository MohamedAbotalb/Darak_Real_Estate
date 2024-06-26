<?php
namespace App\Services;

use App\Models\Notification;
use App\Models\Tour;
use App\Models\TourDate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TourService
{
    public function createTour(array $data)
    {
        DB::beginTransaction();

        try {
            $tour = Tour::create([
                'user_id' => Auth::id(),
                'property_id' => $data['property_id'],
                'status' => $data['status'],
            ]);

            foreach ($data['dates'] as $date) {
                TourDate::create([
                    'tour_id' => $tour->id,
                    'date' => $date,
                ]);
            }

            $landlord_id = $tour->property->user_id;

            Notification::create([
                'user_id' => Auth::id(),
                'landlord_id' => $landlord_id,
                'message' => 'Tour request for property: ' . $tour->property->title,
                'type' => 'request',
                'date' => now(),
            ]);

            DB::commit();

            return $tour->load('tourDates', 'property');
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
