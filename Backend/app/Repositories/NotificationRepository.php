<?php

namespace App\Repositories;
use App\Models\Notification;

class NotificationRepository implements NotificationRepositoryInterface
{
    public function getLandlordNotifications(int $landlordId)
    {
        return Notification::where('landlord_id', $landlordId)
            ->whereIn('type', ['request'])
            ->with(['user', 'landlord','tour'])
            ->get();
    }

    public function getRenterNotifications(int $userId)
    {
        return Notification::where('user_id', $userId)
            ->whereIn('type', ['confirmation', 'cancelation'])
            ->with(['user', 'landlord'])
            ->get();
    }
    public function deleteNotification(int $id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            $notification->delete();
            return true;
        }
        return false;
    }
}