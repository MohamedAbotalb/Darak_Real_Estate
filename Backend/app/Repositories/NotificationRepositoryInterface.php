<?php

namespace App\Repositories;

interface NotificationRepositoryInterface
{
    public function getLandlordNotifications(int $landlordId);
    public function getRenterNotifications(int $userId);
    public function deleteNotification(int $id);

}
