<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Repositories\NotificationRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    protected $notificationRepository;

    public function __construct(NotificationRepositoryInterface $notificationRepository)
    {
        $this->notificationRepository = $notificationRepository;
    }

    public function showLandlordNotifications()
    {
        $notifications = $this->notificationRepository->getLandlordNotifications(Auth::id());

        if ($notifications->isEmpty()) {
            return response()->json(['message' => 'No notifications found for the landlord'], 404);
        }

        return response()->json(['data' => NotificationResource::collection($notifications)], 200);
    }

    public function showRenterNotifications()
    {
        $notifications = $this->notificationRepository->getRenterNotifications(Auth::id());

        if ($notifications->isEmpty()) {
            return response()->json(['message' => 'No notifications found for the renter'], 404);
        }

        return response()->json(['data' => NotificationResource::collection($notifications)], 200);
    }
    public function deleteNotification($id)
    {
        $result = $this->notificationRepository->deleteNotification($id);

        if ($result) {
            return response()->json(['message' => 'Notification deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Notification not found'], 404);
        }
    }
}
