<?php

namespace App\Observers;

use App\Mail\PropertyStatusUpdateMail;
use App\Models\Notification;
use App\Models\Property;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PropertyObserver
{
    /**
     * Handle the Property "created" event.
     */
    public function created(Property $property): void
    {
        $adminUsers = User::where('role', 'admin')->get();
        $userName = $property->user->first_name . ' ' . $property->user->last_name;

        foreach ($adminUsers as $admin) {
            Notification::create([
                'from_user_id' => $property->user_id,
                'to_user_id' => $admin->id,
                'property_id' => $property->id,
                'message' => $userName . ' has added a new property.',
                'type' => 'property_request',
                'date' => now(),
            ]);
        }
    }

    /**
     * Handle the Property "updated" event.
     */
    public function updated(Property $property): void
    {
        if ($property->isDirty('status')) {
            $user = $property->user;
            $status = $property->status;
            $message = $this->generateNotificationMessage($property, $status);
    
            Notification::create([
                'from_user_id' => Auth::id(),
                'to_user_id' => $user->id,
                'property_id' => $property->id,
                'message' => $message,
                'type' => 'status_change',
                'date' => now(),
            ]);
    
            Mail::to($user->email)->send(new PropertyStatusUpdateMail($property, $user, $status, $message));
        }
    }

    /**
     * Handle the Property "deleted" event.
     */
    public function deleted(Property $property): void
    {
        //
    }

    /**
     * Handle the Property "restored" event.
     */
    public function restored(Property $property): void
    {
        //
    }

    /**
     * Handle the Property "force deleted" event.
     */
    public function forceDeleted(Property $property): void
    {
        //
    }
    protected function generateNotificationMessage(Property $property, string $status)
    {
        $username = $property->user->first_name . ' ' . $property->user->last_name;

        if ($status === 'accepted') {
            return "Hello $username, your property '{$property->title}' has been accepted.";
        } elseif ($status === 'rejected') {
            return "Hello $username, your property '{$property->title}' has been rejected.";
        }
    }
}
