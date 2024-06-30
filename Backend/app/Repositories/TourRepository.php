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
            $existingTour = Tour::where('user_id', Auth::id())
                ->where('status', $data['status'])
                ->first();

            if ($existingTour) {
                return null;
            }
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

            $property = $tour->property;
            if ($property) {
                $landlord_id = $property->user_id;

                Notification::create([
                    'user_id' => Auth::id(),
                    'landlord_id' => $landlord_id,
                    'tour_id' => $tour->id,
                    'message' => 'Tour request for property: ' . $property->title,
                    'type' => 'request',
                    'date' => now(),
                ]);
            } else {
                return null;
            }

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

        if (!$tour) {
            return false;
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

        $property = $tour->property;
        if (!$property) {
            return null;
        }

        $existingNotification = Notification::where('user_id', $tour->user_id)
            ->where('landlord_id', $property->user_id)
            ->where('tour_id', $tour->id)
            ->where('type', 'confirmation')
            ->exists();

        if (!$existingNotification) {
            Notification::create([
                'user_id' => $tour->user_id,
                'landlord_id' => $property->user_id,
                'tour_id' => $tour->id,
                'message' => 'Tour request for property ' . $property->title . ' has been approved',
                'type' => 'confirmation',
                'date' => now(),
            ]);
            return true;
        } else {
            return null;
        }
    }

    public function declineTour(int $id)
    {
        $tour = Tour::find($id);

        if (!$tour) {
            return false;
        }

        $property = $tour->property;
        if (!$property) {
            return null;
        }

        $tour->status = 'declined';
        $tour->save();

        $existingNotification = Notification::where('user_id', $tour->user_id)
            ->where('landlord_id', $property->user_id)
            ->where('tour_id', $tour->id)
            ->where('type', 'cancelation')
            ->exists();

        if (!$existingNotification) {
            Notification::create([
                'user_id' => $tour->user_id,
                'landlord_id' => $property->user_id,
                'tour_id' => $tour->id,
                'message' => 'Tour request for property ' . $property->title . ' has been cancelled',
                'type' => 'cancelation',
                'date' => now(),
            ]);
            return true;

        }else{
            return null;
        }

    }


    public function getUserTours(int $userId)
    {
        return Tour::where('user_id', $userId)
            ->with(['user', 'property', 'tourDates'])
            ->get();
    }
    public function getToursByStatus($status, $userId)
    {
        return Tour::where('status', $status)
            ->where('user_id', $userId)
            ->with(['user', 'property', 'tourDates'])
            ->get();
    }
}
