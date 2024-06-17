<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    //it will edit with auth user
    public function showLandlordNotifications($landlord_id)
    {
        $notifications = Notification::where('landlord_id', $landlord_id)
            ->whereIn('type', ['request'])
            ->get();

        if ($notifications->isEmpty()) {
            return response()->json(['message' => 'No notifications found for the landlord'], 404);
        }

        return response()->json(['data' => $notifications], 200);
    }
    public function showRenterNotifications($renter_id)
    {
        $notifications = Notification::where('user_id', $renter_id)
            ->whereIn('type', ['confirmation', 'cancelation'])
            ->get();

        if ($notifications->isEmpty()) {
            return response()->json(['message' => 'No notifications found for the renter'], 404);
        }

        return response()->json(['data' => $notifications], 200);
    }
    public function updateType(Request $request, $id)
    {
        $request->validate([
            'type' => 'required|in:confirmation,cancelation',
        ]);

        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        $notification->type = $request->input('type');
        $notification->save();

        return response()->json(['message' => 'Notification type updated successfully', 'data' => new NotificationResource($notification)], 200);
    }
}
