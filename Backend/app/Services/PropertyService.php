<?php
namespace App\Services;

use App\Models\Location;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class PropertyService
{
    public function getAllProperties($perPage)
    {
        return Property::with('images', 'location','amenities')->paginate($perPage);
    }

    public function getPropertyBySlug($slug)
    {
        return Property::where('slug', $slug)->with('location', 'images','amenities')->firstOrFail();
    }

    public function getLatestProperties($property_type_id, $listing_type)
    {
        return Property::with('location', 'images','amenities')
            ->where('property_type_id', $property_type_id)
            ->where('listing_type', $listing_type)
            ->latest()
            ->take(3)
            ->get();
    }

    public function createProperty($data)
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
            $data['user_id'] =Auth::id();
            $slug = Str::slug($data['title']);
            $property = Property::create($data + ['slug' => $slug, 'location_id' => $location->id]);
    

            if (isset($data['images'])) {
                foreach ($data['images'] as $image) {
                    $imageName = time() . '_' . $image->getClientOriginalName();
                    $image->move(public_path('images/properties'), $imageName);
                    PropertyImage::create([
                        'property_id' => $property->id,
                        'image' => 'images/properties/'. $imageName,
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

    public function searchProperties($filters)
    {
        $query = Property::query();

        if (isset($filters['property_type'])) {
            $query->where('property_type_id', $filters['property_type']);
        }
        if (isset($filters['listing_type'])) {
            $query->where('listing_type', $filters['listing_type']);
        }
        if (isset($filters['location_id'])) {
            $query->where('location_id', $filters['location_id']);
        }

        return $query->get();
    }
}
