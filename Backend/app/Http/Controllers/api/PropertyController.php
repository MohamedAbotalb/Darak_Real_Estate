<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Http\Request;

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
    public function showLatestRent($property_type_id)
    {
        $latestProperties = Property::where('property_type_id', $property_type_id)
            ->where('listing_type', 'renting')
            ->latest()
            ->take(3)
            ->get();

        if ($latestProperties->isEmpty()) {
            return response()->json(['message' => 'No properties found for rent in this category'], 404);
        }

        return response()->json(['message' => 'properties fetched successfully', 'properties' => $latestProperties], 200);
    }
    public function showLatestSell($property_type_id)
    {
        $latestProperties = Property::where('property_type_id', $property_type_id)
            ->where('listing_type', 'selling')
            ->latest()
            ->take(3)
            ->get();

        if ($latestProperties->isEmpty()) {
            return response()->json(['message' => 'No properties found for Sell in this category'], 404);
        }

        return response()->json(['message' => 'properties fetched successfully', 'properties' => $latestProperties], 200);
    }
}
