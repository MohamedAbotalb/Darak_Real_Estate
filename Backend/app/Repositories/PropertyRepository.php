<?php

namespace App\Repositories;

use App\Models\Location;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Repositories\Contracts\PropertyRepositoryInterface;
use App\Utils\ImageUpload;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class PropertyRepository implements PropertyRepositoryInterface
{
    public function getAllProperties(int $perPage)
    {
        return Property::with('images', 'location', 'amenities', 'propertyType','user')->paginate($perPage);
    }

    public function getPropertyBySlug(string $slug)
    {
        return Property::where('slug', $slug)->with('location', 'images', 'amenities', 'propertyType','user')->firstOrFail();
    }

    public function getLatestProperties(int $property_type_id, string $listing_type)
    {
        return Property::with('location', 'images', 'amenities', 'propertyType')
            ->where('property_type_id', $property_type_id)
            ->where('listing_type', $listing_type)
            ->latest()
            ->take(3)
            ->get();
    }

    public function createProperty(array $data)
    {
        DB::beginTransaction();

        try {
            $location = Location::firstOrCreate(
                [
                    'city' => $data['city'],
                    'state' => $data['state'],
                    'street' => $data['street']
                ],
                $data
            );
            $data['availability'] = 'available';
            $data['user_id'] = Auth::id();
            $slug = Str::slug($data['title']);
            $property = Property::create($data + ['slug' => $slug, 'location_id' => $location->id]);

            if (isset($data['images'])) {
                $uploadedImages = ImageUpload::uploadImages($data['images'], 'images/properties');
                foreach ($uploadedImages as $uploadedImage) {
                    PropertyImage::create([
                        'property_id' => $property->id,
                        'image' => $uploadedImage,
                    ]);
                }
            }

            if (isset($data['amenities'])) {
                $property->amenities()->attach($data['amenities']);
            }

            $property->load('location', 'propertyType', 'user', 'images', 'amenities');

            DB::commit();
            return $property;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }


    public function searchProperties(array $filters)
    {
        $query = Property::with('images', 'location', 'amenities', 'propertyType','user');

        if (isset($filters['property_type'])) {
            $query->where('property_type_id', $filters['property_type']);
        }
        if (isset($filters['listing_type'])) {
            $query->where('listing_type', $filters['listing_type']);
        }
        if (isset($filters['num_of_rooms'])) {
            if ($filters['num_of_rooms'] === '+7') {
                $query->where('num_of_rooms', '>', 7);
            } else {
                $query->where('num_of_rooms', $filters['num_of_rooms']);
            }
        }
        if (isset($filters['num_of_bathrooms'])) {
            if ($filters['num_of_bathrooms'] === '+7') {
                $query->where('num_of_bathrooms', '>', 7);
            } else {
                $query->where('num_of_bathrooms', $filters['num_of_bathrooms']);
            }
        }
        if (isset($filters['price'])) {
            $query->where('price', $filters['price']);
        }
        if (isset($filters['city'])) {
            $query->join('locations', 'properties.location_id', '=', 'locations.id');
            $query->where('locations.city', $filters['city']);
        }
        if (isset($filters['min_price']) && isset($filters['max_price'])) {
            $query->whereBetween('price', [$filters['min_price'], $filters['max_price']]);
        } elseif (isset($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        } elseif (isset($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        return $query->get();
    }

    public function showUserProperties(int $id)
    {
        return Property::where('user_id', $id)->with('images', 'location', 'amenities', 'propertyType','user')->get();
    }
    public function updateProperty(array $data, int $propertyId)
    {
        DB::beginTransaction();

        try {
            $property = Property::findOrFail($propertyId);
            $property->update($data);
            if (isset($data['city']) && isset($data['state']) && isset($data['street'])) {
                $location = Location::updateOrCreate(
                    [
                        'city' => $data['city'],
                        'state' => $data['state'],
                        'street' => $data['street']
                    ],
                    $data
                );

                $property->location_id = $location->id;
            }

            if (isset($data['images'])) {
                $uploadedImages = ImageUpload::uploadImages($data['images'], 'images/properties');
                foreach ($uploadedImages as $uploadedImage) {
                    PropertyImage::create([
                        'property_id' => $property->id,
                        'image' => $uploadedImage,
                    ]);
                }
            }

            if (isset($data['amenities'])) {
                $property->amenities()->sync($data['amenities']);
            }

            $property->load('location', 'propertyType', 'user', 'images', 'amenities','user');

            DB::commit();
            return $property;
        } catch (\Exception $e) {
            DB::rollback();
            throw new \Exception('Failed to update property: ' . $e->getMessage());
        }
    }
    public function delete(int $id){
        $property=Property::find($id);
        if(!$property){
            return null;
        }
        $property->delete();
        return true;
    }
}
