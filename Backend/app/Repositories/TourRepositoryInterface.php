<?php


namespace App\Repositories;

interface TourRepositoryInterface
{
    public function createTour(array $data);
    public function approveTour(int $id, int $tourDateId);
    public function declineTour(int $id);
    public function getUserTours(int $userId);
}

