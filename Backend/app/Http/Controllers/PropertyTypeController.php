<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PropertyTypeResource;
use App\Models\PropertyType;
class PropertyTypeController extends Controller
{
    public function index()
    {
        return response()->json(PropertyType::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:property_types|max:255',
        ]);

        $propertyType = PropertyType::create($request->all());

        return response()->json($propertyType, 201);
    }

    public function show($slug)
    {
        $propertyType = PropertyType::where('slug', $slug)->with('properties')->first();

        if (!$propertyType) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        return response()->json($propertyType);
    }

   public function update(Request $request, $slug)
    {
        $propertyType = PropertyType::where('slug', $slug)->first();

        if (!$propertyType) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        $request->validate([
            'name' => 'required|unique:property_types,name,' . $propertyType->id . '|max:255',
        ]);

        $propertyType->update($request->all());

        return response()->json($propertyType);
    }

    public function destroy($slug)
    {
        $propertyType = PropertyType::where('slug', $slug)->first();

        if (!$propertyType) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        $propertyType->delete();

        return response()->json(null, 204);
    }
}
