<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportPropertyResource;
use App\Models\ReportProperty;
use Illuminate\Http\Request;

class ReportPropertyController extends Controller
{
    public function index(){
        $reports= ReportPropertyResource::collection(ReportProperty::all());
        if ($reports->isEmpty()) {
            return response()->json(['message' => 'No reports found'],400);
        }
        return $reports;
    }
}
