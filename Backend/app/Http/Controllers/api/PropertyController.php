<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(Request $request){
        $perPage = $request->query('perPage', 6);
        $properties = Property::paginate($perPage);
        return response()->json(PropertyResource::collection($properties));
    }
    public function show($slug){
        $property=new PropertyResource(Property::where('slug', $slug)->firstOrFail());
        if (!Property::where('slug', $slug)->firstOrFail()) {
            return response()->json(['error' => 'Property not found'],400);
        }
        return response()->json(['message' => 'Property fetched successfully', 'data' => $property,],200);

    }
}
