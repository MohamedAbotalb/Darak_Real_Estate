<?php
namespace App\Repositories;

use App\Models\Notification;
use App\Models\Tour;
use App\Models\TourDate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TourRepository implements TourRepositoryInterface
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

    public function approveTour(int $id, int $tourDateId)
    {
        $tour = Tour::find($id);
        if(!$tour){
            return null;
        }

        $tourDate = TourDate::where('id', $tourDateId)
            ->where('tour_id', $id)
            ->first();

        if (!$tourDate) {
            return false;
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

        return true;
    }

    public function declineTour(int $id)
    {
        $tour = Tour::find($id);
        if(!$tour){
            return null;
        }
        $tour->status = 'declined';
        $tour->save();

        Notification::create([
            'user_id' => $tour->user_id,
            'landlord_id' => $tour->property->user_id,
            'message' => 'Tour request for property ' . $tour->property->title . ' has been cancelled',
            'type' => 'cancelation',
            'date' => now(),
        ]);

        return true;
    }

    public function getUserTours(int $userId)
    {
        return Tour::where('user_id', $userId)
            ->with(['user', 'property', 'tourDates'])
            ->get();
    }
}
