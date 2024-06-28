<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function showLandlordNotifications()
    {
        $notifications = Notification::where('landlord_id', Auth::id())
            ->whereIn('type', ['request'])
            ->get();

        if ($notifications->isEmpty()) {
            return response()->json(['message' => 'No notifications found for the landlord'], 404);
        }

        return response()->json(['data' =>NotificationResource::collection($notifications)], 200);
    }
    public function showRenterNotifications()
    {
        $notifications = Notification::where('user_id', Auth::id())
            ->whereIn('type', ['confirmation', 'cancelation'])
            ->get();

        if ($notifications->isEmpty()) {
            return response()->json(['message' => 'No notifications found for the renter'], 404);
        }

        return response()->json(['data' => NotificationResource::collection($notifications)], 200);
    }
  
}
