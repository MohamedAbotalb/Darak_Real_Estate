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
        return PropertyResource::collection($properties);
    }
}
