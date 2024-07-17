<?php

namespace App\Repositories;

use App\Mail\PropertyUpdateApprovedMail;
use App\Mail\PropertyUpdateRejectedMail;
use App\Mail\TourPropertyUpdateMail;
use App\Models\Notification;
use App\Models\PropertyUpdate;
use App\Models\Tour;
use App\Models\TourDate;
use App\Repositories\Contracts\PropertyUpdatesRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PropertyUpdatesRepository implements PropertyUpdatesRepositoryInterface
{
    public function index()
    {
        $pendingUpdates = PropertyUpdate::where('status', 'pending')->with('property')->get();

        if ($pendingUpdates->isEmpty()) {
            return false;
        }

        return $pendingUpdates;
    }
    public function show($id)
    {
        $propertyUpdate = PropertyUpdate::where('status', 'pending')
            ->with('property')
            ->find($id);

        if (!$propertyUpdate) {
            return null;
        }

        return $propertyUpdate;
    }
    public function approvePropertyUpdate(int $propertyUpdateId)
    {
        $propertyUpdate = PropertyUpdate::find($propertyUpdateId);

        if (!$propertyUpdate) {
            return null;
        }

        $property = $propertyUpdate->property;

        $property->update($propertyUpdate->data);

        $propertyUpdate->status = 'approved';
        $propertyUpdate->save();

        $landlord = $property->user;
        Mail::to($landlord->email)->send(new PropertyUpdateApprovedMail($property));
        Notification::create([
            'from_user_id' => Auth::id(),
            'to_user_id' => $landlord->id,
            'property_id' => $property->id,
            'message' => "Hello $landlord->first_name, your property update for '{$property->title}' has been accepted.",
            'type' => 'property_update_approved',
            'date' => now(),
        ]);
        $tourDates = TourDate::where('approved', true)
            ->where('date', '>', now())
            ->whereHas('tour', function ($query) use ($property) {
                $query->where('property_id', $property->id);
            })
            ->get();

        foreach ($tourDates as $tourDate) {
            $user = $tourDate->tour->user;
            Notification::create([
                'from_user_id' => Auth::id(),
                'to_user_id' => $user->id,
                'property_id' => $property->id,
                'message' => "Hello $user->first_name, the property '{$property->title}' you requested a tour for has been updated.",
                'type' => 'tour_property_update',
                'date' => now(),
            ]);
            Mail::to($user->email)->send(new TourPropertyUpdateMail($property, $user));
        }
        return $property;
    }

    public function rejectPropertyUpdate(int $propertyUpdateId)
    {
        $propertyUpdate = PropertyUpdate::find($propertyUpdateId);

        if (!$propertyUpdate) {
            return null;
        }

        $propertyUpdate->status = 'rejected';
        $propertyUpdate->save();
        $property = $propertyUpdate->property;
        $landlord = $propertyUpdate->property->user;
        Notification::create([
            'from_user_id' => Auth::id(),
            'to_user_id' => $landlord->id,
            'property_id' => $propertyUpdate->property->id,
            'message' => "Hello $landlord->first_name, your property update for '{$propertyUpdate->property->title}' has been rejected.",
            'type' => 'property_update_rejected',
            'date' => now(),
        ]);
        Mail::to($landlord->email)->send(new PropertyUpdateRejectedMail($property));

        return $propertyUpdate->property;
    }
}
