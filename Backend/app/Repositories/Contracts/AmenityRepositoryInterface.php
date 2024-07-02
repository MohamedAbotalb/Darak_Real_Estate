<?php

namespace App\Repositories\Contracts;

use App\Models\Amenity;

interface AmenityRepositoryInterface
{
    public function getAllAmenities();
    public function createAmenity(array $data);
    public function findAmenityBySlug(string $slug);
    public function updateAmenity(string $slug, array $data);
    public function deleteAmenity(string $slug);
}
