<?php

namespace App\Repositories;

use App\Models\Amenity;
use App\Repositories\Contracts\AmenityRepositoryInterface;

class AmenityRepository implements AmenityRepositoryInterface
{
    public function getAllAmenities()
    {
        return Amenity::where('availability','available')->get();
    }

    public function createAmenity(array $data)
    {
        return Amenity::create($data);
    }

    public function findAmenityBySlug(string $slug)
    {
        return Amenity::where('slug', $slug)->first();
    }

    public function updateAmenity(string $slug, array $data)
    {
        $amenity = $this->findAmenityBySlug($slug);
        if ($amenity) {
            $amenity->update($data);
            return $amenity;
        }

        return null;
    }

    public function deleteAmenity(string $slug)
    {
        $amenity = $this->findAmenityBySlug($slug);
        if ($amenity) {
            $amenity->delete();
            return true;
        }

        return false;
    }
    public function updateAmenityAvailability(int $id, string $status)
    {
        $amenity = Amenity::find($id);
        if(!$amenity){
            return null;
        }
        $amenity->availability = $status;
        $amenity->save();
        return true;
    }
}
