<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AmenityResource;
use App\Models\Amenity;



use Illuminate\Http\Request;

class AmenityController extends Controller
{
    public function index()
    {
        $amenities = Amenity::all();
        return response()->json($amenities);
    }


    public function show($slug)
    {
        $amenity = Amenity::where('slug',$slug)->first();
        return response()->json($amenity);
    }

    public function update(Request $request, $slug)
    {
        $amenity = Amenity::where('slug',$slug)->first();
        $amenity->update($request->all());
        return response()->json(['message' => 'Amenity updated successfully', 'amenity' => $amenity]);
    }
}
