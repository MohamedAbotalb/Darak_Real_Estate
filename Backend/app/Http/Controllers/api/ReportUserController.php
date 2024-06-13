<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportUserResource;
use App\Models\ReportUser;
use Illuminate\Http\Request;

class ReportUserController extends Controller
{
    public function index(){
        $reports= ReportUserResource::collection(ReportUser::all());
        if ($reports->isEmpty()) {
            return response()->json(['message' => 'No reports found'],400);
        }
        return response()->json(['message' => 'Reports fetched successfully', 'data' => $reports,],200);
    }
}
