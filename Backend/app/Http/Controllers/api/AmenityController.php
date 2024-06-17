<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AmenityRequest;
use App\Models\Amenity;
use Illuminate\Http\Request;

class AmenityController extends Controller
{
    public function index()
    {
        return Amenity::all();
    }

    public function store(AmenityRequest $request)
    {
        $amenity = Amenity::create($request->validated());
        return response()->json($amenity, 201);
    }

    public function show($id)
    {
        $amenity = Amenity::findOrFail($id);
        return response()->json($amenity);
    }

    public function update(AmenityRequest $request, $id)
    {
        $amenity = Amenity::findOrFail($id);
        $amenity->update($request->validated());
        return response()->json($amenity);
    }

    public function destroy($id)
    {
        $amenity = Amenity::findOrFail($id);
        $amenity->delete();
        return response()->json(null, 204);
    }
}
