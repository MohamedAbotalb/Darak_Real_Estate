<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Resources\PropertyImageResource;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\PropertytImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str; 

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 6);
        $properties = Property::paginate($perPage);
        return response()->json(PropertyResource::collection($properties));
    }
    public function show($slug)
    {
        $property = new PropertyResource(Property::where('slug', $slug)->firstOrFail());
        if (!Property::where('slug', $slug)->firstOrFail()) {
            return response()->json(['error' => 'Property not found'], 400);
        }
        return response()->json(['message' => 'Property fetched successfully', 'data' => $property,], 200);
    }
    private function showLatestProperties($property_type_id, $listing_type)
    {
        $latestProperties = Property::where('property_type_id', $property_type_id)
            ->where('listing_type', $listing_type)
            ->latest()
            ->take(3)
            ->get();

        if ($latestProperties->isEmpty()) {
            return response()->json(['message' => 'No properties found for ' . $listing_type . ' in this category'], 404);
        }

        return response()->json(['message' => 'Latest ' . $listing_type . ' properties fetched successfully', 'properties' => $latestProperties], 200);
    }
    public function showLatestRent($property_type_id)
    {
        return $this->showLatestProperties($property_type_id, 'renting');
    }

    public function showLatestSell($property_type_id)
    {
        return $this->showLatestProperties($property_type_id, 'selling');
    }
    public function store(StorePropertyRequest $request){
        $slug = Str::slug($request->title);
        $property = Property::create($request->except('images') +['slug' => $slug]);

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
        return response()->json(['message' => 'Property added successfully'], 201);

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
