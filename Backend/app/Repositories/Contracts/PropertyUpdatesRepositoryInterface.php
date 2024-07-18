<?php

namespace App\Repositories\Contracts;


interface PropertyUpdatesRepositoryInterface
{
    public function index();
    public function show($id);
    public function approvePropertyUpdate(int $propertyUpdateId);
    public function rejectPropertyUpdate(int $propertyUpdateId);

    
}
