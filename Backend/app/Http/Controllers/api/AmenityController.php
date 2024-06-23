<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AmenityRequest;
use App\Http\Resources\AmenityResource;
use App\Models\Amenity;
use Illuminate\Http\Request;

class AmenityController extends Controller
{
    public function index()
    {
        return AmenityResource::collection(Amenity::all());
    }

    public function store(AmenityRequest $request)
    {
        $amenity = Amenity::create($request->validated());
        return response()->json(new AmenityResource($amenity), 201);
    }

    public function show($slug)
    {
        $amenity = Amenity::where('slug', $slug)->first();

        if (!$amenity) {
            return response()->json(['error' => 'Amenity not found'], 404);
        }

        return response()->json(new AmenityResource($amenity));
    }


    public function update(AmenityRequest $request, $slug)
    {
        $amenity = Amenity::where('slug', $slug)->first();

        if (!$amenity) {
            return response()->json(['error' => 'Amenity not found'], 404);
        }
        $amenity->update($request->validated());
        return response()->json(new AmenityResource($amenity));
    }

    public function destroy($slug)
    {
        $amenity = Amenity::where('slug', $slug)->first();

        if (!$amenity) {
            return response()->json(['error' => 'Amenity not found'], 404);
        }
        $amenity->delete();
        return response()->json(["message" => "Amenity deleted successfully"]);
    }
}
