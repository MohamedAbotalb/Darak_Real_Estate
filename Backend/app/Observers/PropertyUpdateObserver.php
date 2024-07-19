<?php

namespace App\Observers;

use App\Mail\PropertyUpdateApprovedMail;
use App\Mail\PropertyUpdateRejectedMail;
use App\Mail\TourPropertyUpdateMail;
use App\Models\Notification;
use App\Models\PropertyUpdate;
use App\Models\TourDate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PropertyUpdateObserver
{
    /**
     * Handle the PropertyUpdate "created" event.
     */
    public function created(PropertyUpdate $propertyUpdate): void
    {
        //
    }

    /**
     * Handle the PropertyUpdate "updated" event.
     */
    public function updated(PropertyUpdate $propertyUpdate): void
    {
        if ($propertyUpdate->isDirty('status')) {
            if ($propertyUpdate->status === 'approved') {
                $this->handleApproved($propertyUpdate);
            } elseif ($propertyUpdate->status === 'rejected') {
                $this->handleRejected($propertyUpdate);
            }
        }
    }
    protected function handleApproved(PropertyUpdate $propertyUpdate)
    {
        $property = $propertyUpdate->property;

        $property->update($propertyUpdate->data);

        $landlord = $property->user;
        Mail::to($landlord->email)->send(new PropertyUpdateApprovedMail($property));
        Notification::create([
            'from_user_id' => Auth::id(),
            'to_user_id' => $landlord->id,
            'property_id' => $property->id,
            'message' => "Hello {$landlord->first_name}, your property update for '{$property->title}' has been accepted.",
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
                'message' => "Hello {$user->first_name}, the property '{$property->title}' you requested a tour for has been updated.",
                'type' => 'tour_property_update',
                'date' => now(),
            ]);
            Mail::to($user->email)->send(new TourPropertyUpdateMail($property, $user));
        }
    }
    protected function handleRejected(PropertyUpdate $propertyUpdate)
    {
        $property = $propertyUpdate->property;
        $landlord = $property->user;
        Notification::create([
            'from_user_id' => Auth::id(),
            'to_user_id' => $landlord->id,
            'property_id' => $property->id,
            'message' => "Hello {$landlord->first_name}, your property update for '{$property->title}' has been rejected.",
            'type' => 'property_update_rejected',
            'date' => now(),
        ]);
        Mail::to($landlord->email)->send(new PropertyUpdateRejectedMail($property));
    }

    /**
     * Handle the PropertyUpdate "deleted" event.
     */
    public function deleted(PropertyUpdate $propertyUpdate): void
    {
        //
    }

    /**
     * Handle the PropertyUpdate "restored" event.
     */
    public function restored(PropertyUpdate $propertyUpdate): void
    {
        //
    }

    /**
     * Handle the PropertyUpdate "force deleted" event.
     */
    public function forceDeleted(PropertyUpdate $propertyUpdate): void
    {
        //
    }
}
