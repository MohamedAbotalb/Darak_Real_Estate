<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PropertyTypeResource;
use App\Repositories\PropertyTypeRepositoryInterface;
use Illuminate\Http\Request;

class PropertyTypeController extends Controller
{
    protected $propertyTypeRepository;

    public function __construct(PropertyTypeRepositoryInterface $propertyTypeRepository)
    {
        $this->propertyTypeRepository = $propertyTypeRepository;
    }

    public function index()
    {
        $propertyTypes = $this->propertyTypeRepository->getAllPropertyTypes();
        return response()->json(PropertyTypeResource::collection($propertyTypes));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:property_types|max:255',
        ]);

        $propertyType = $this->propertyTypeRepository->createPropertyType($request->all());

        return response()->json(new PropertyTypeResource($propertyType), 201);
    }

    public function show($slug)
    {
        $propertyType = $this->propertyTypeRepository->findPropertyTypeBySlug($slug);

        if (!$propertyType) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        return response()->json(new PropertyTypeResource($propertyType));
    }

    public function update(Request $request, $slug)
    {
        $propertyType = $this->propertyTypeRepository->findPropertyTypeBySlug($slug);

        if (!$propertyType) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        $request->validate([
            'name' => 'required|unique:property_types,name,' . $propertyType->id . '|max:255',
        ]);

        $updatedPropertyType = $this->propertyTypeRepository->updatePropertyType($slug, $request->all());

        return response()->json(new PropertyTypeResource($updatedPropertyType));
    }

    public function destroy($slug)
    {
        $deleted = $this->propertyTypeRepository->deletePropertyType($slug);

        if (!$deleted) {
            return response()->json(['error' => 'property-type not found'], 404);
        }

        return response()->json(["message" => "property-type deleted successfully"], 204);
    }
}
