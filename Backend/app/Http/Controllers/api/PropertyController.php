<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 90);
        $properties = Property::with('images')->with('location')->paginate($perPage);
        return PropertyResource::collection($properties);
    }
    public function show($slug)
    {
        $property = new PropertyResource(Property::where('slug', $slug)->with('location')->with('images')->firstOrFail());
        if (!Property::where('slug', $slug)->first()) {
            return response()->json(['error' => 'Property not found'], 400);
        }
        return response()->json(['message' => 'Property fetched successfully', 'data' => $property,], 200);
    }
    private function showLatestProperties($property_type_id, $listing_type)
    {
        $latestProperties = Property::with('location')->with('images')->where('property_type_id', $property_type_id)
            ->where('listing_type', $listing_type)
            ->latest()
            ->take(3)
            ->get();

        if ($latestProperties->isEmpty()) {
            return response()->json(['message' => 'No properties found for ' . $listing_type . ' in this category'], 404);
        }

        return response()->json(['message' => 'Latest ' . $listing_type . ' properties fetched successfully', 'properties' =>  PropertyResource::collection( $latestProperties)], 200);
    }
    public function showLatestRent($property_type_id)
    {
        return $this->showLatestProperties($property_type_id, 'renting');
    }

    public function showLatestSell($property_type_id)
    {
        return $this->showLatestProperties($property_type_id, 'selling');
    }
    public function store(StorePropertyRequest $request)
    {
        DB::beginTransaction();

        try {
            $slug = Str::slug($request->title);
            $property = Property::create($request->except('images') + ['slug' => $slug]);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imageName = time() . '_' . $image->getClientOriginalName();
                    $image->move(public_path('images/properties'), $imageName);
                    PropertyImage::create([
                        'property_id' => $property->id,
                        'image' => $imageName,
                    ]);
                }
            }

            if ($request->has('amenities')) {
                $property->amenities()->attach($request->input('amenities'));
            }

            DB::commit();

            return response()->json(['message' => 'Property added successfully'], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to add property', 'error' => $e->getMessage()], 500);
        }
    }
    public function search(Request $request)
    {
        $query = Property::query();
        if ($request->has('property_type')) {
            $query->where('property_type_id', $request->input('property_type'));
        }
        if ($request->has('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }
        if ($request->has('location_id')) {
            $query->where('location_id', $request->input('location_id'));
        }

        $properties = $query->get();
        if ($properties->isEmpty()) {
            return response()->json(['message' => 'No Result found'], 404);
        }
        return response()->json(['data' => $properties]);
    }
}
