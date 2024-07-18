<?php

namespace App\Repositories\Contracts;


interface PropertyUpdatesRepositoryInterface
{
    public function index();
    public function showNewProperty($id);
    public function showOldProperty($id);
    public function approvePropertyUpdate(int $propertyUpdateId);
    public function rejectPropertyUpdate(int $propertyUpdateId);

    
}
