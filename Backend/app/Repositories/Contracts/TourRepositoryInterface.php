<?php


namespace App\Repositories\Contracts;

interface TourRepositoryInterface
{
    public function createTour(array $data);
    public function approveTour(int $id, int $tourDateId);
    public function declineTour(int $id);
    public function getUserTours(int $userId);
    public function getToursByStatus(string $status,int $userId);
    public function deleteTour(int $id);
}

