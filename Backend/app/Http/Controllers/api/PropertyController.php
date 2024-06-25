<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Services\PropertyService;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    protected $propertyService;

    public function __construct(PropertyService $propertyService)
    {
        $this->propertyService = $propertyService;
    }

    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 90);
        $properties = $this->propertyService->getAllProperties($perPage);
        return PropertyResource::collection($properties);
    }

    public function show($slug)
    {
        $property = new PropertyResource($this->propertyService->getPropertyBySlug($slug));
        return response()->json(['message' => 'Property fetched successfully', 'data' => $property], 200);
    }

    public function showLatestRent($property_type_id)
    {
        return $this->showLatestProperties($property_type_id, 'renting');
    }

    public function showLatestSell($property_type_id)
    {
        return $this->showLatestProperties($property_type_id, 'selling');
    }

    private function showLatestProperties($property_type_id, $listing_type)
    {
        $latestProperties = $this->propertyService->getLatestProperties($property_type_id, $listing_type);

        if ($latestProperties->isEmpty()) {
            return response()->json(['message' => 'No properties found for ' . $listing_type . ' in this category'], 404);
        }

        return response()->json(['message' => 'Latest ' . $listing_type . ' properties fetched successfully', 'properties' => PropertyResource::collection($latestProperties)], 200);
    }

    public function store(StorePropertyRequest $request)
    {
        try {
            $property = $this->propertyService->createProperty($request->validated());
            return response()->json(['message' => 'Property added successfully', 'data' => new PropertyResource($property)], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to add property', 'error' => $e->getMessage()], 500);
        }
    }

    public function search(Request $request)
    {
        $filters = $request->only(['property_type', 'user_id', 'location_id']);
        $properties = $this->propertyService->searchProperties($filters);

        if ($properties->isEmpty()) {
            return response()->json(['message' => 'No Result found'], 404);
        }

        return response()->json(['data' => $properties]);
    }
}
