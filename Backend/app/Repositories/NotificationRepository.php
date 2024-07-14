<?php

namespace App\Repositories;

use App\Models\Notification;
use App\Models\User;
use App\Repositories\Contracts\NotificationRepositoryInterface;

class NotificationRepository implements NotificationRepositoryInterface
{
    public function getLandlordNotifications(int $landlordId)
    {
        $landlord = User::find($landlordId);

        if ($landlord && $landlord->role === 'landlord') {
            return Notification::where('to_user_id', $landlordId)
                ->whereIn('type', ['request'])
                ->with(['fromUser', 'toUser', 'tour.tourDates'])
                ->get();
        }

        return null;
    }

    public function getRenterNotifications(int $userId)
    {
        $user = User::find($userId);

        if ($user && $user->role === 'user') {
            return Notification::where('to_user_id', $userId)
                ->whereIn('type', ['confirmation', 'cancelation'])
                ->with(['fromUser', 'toUser', 'tour.tourDates'])
                ->get();
        }

        return null;
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
