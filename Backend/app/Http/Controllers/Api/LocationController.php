<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LocationResource;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::all();

        if ($locations->isEmpty()) {
            return response()->json(['message' => 'Location list is empty'], 404);
        }

        return response()->json(LocationResource::collection($locations));
    }
}
