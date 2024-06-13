<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportUserResource;
use App\Http\Resources\UserResource;
use App\Models\ReportUser;
use App\Models\User;
use Illuminate\Http\Request;

class ReportUserController extends Controller
{
    public function index(){
        $reports= ReportUserResource::collection(ReportUser::all());
        if ($reports->isEmpty()) {
            return response()->json(['message' => 'No reports found'],400);
        }
        return response()->json(['message' => 'Reports fetched successfully', 'data' => $reports],200);
    }
    public function deleteReport($id){
        $report=new ReportUserResource(ReportUser::find($id));
        if (!ReportUser::find($id)) {
            return response()->json(['error' => 'Report not found'],400);
        }
        $report->delete();
        return response()->json(['message' => 'Report deleted successfully', 'data' => $report],200);
    }
    public function deleteUser($id){
        $user = new UserResource(User::find($id));
        if (!User::find($id)) {
            return response()->json(['error' => 'User not found'], 404);
        }
        if (User::find($id)->role !== 'landlord') {
            return response()->json(['error' => 'User is not a landlord'], 403);
        }
        $user->delete();
        return response()->json(['message' => 'Landloard deleted successfully','landlord'=>$user], 200);
    }
}
