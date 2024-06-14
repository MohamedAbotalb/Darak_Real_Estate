<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportPropertyResource;
use App\Models\Property;
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
    public function deleteReport($id){
        $report=new ReportPropertyResource(ReportProperty::find($id));
        if (!ReportProperty::find($id)) {
            return response()->json(['error' => 'Report not found'],400);
        }
        $report->delete();
        return response()->json(['message' => 'Report deleted successfully', 'data' => $report],200);
    }
    public function deleteUser($id){
        $property = new Property(Property::find($id));
        if (!Property::find($id)) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        $property->delete();
        return response()->json(['message' => 'Property deleted successfully','property'=>$property], 200);
    }
}
