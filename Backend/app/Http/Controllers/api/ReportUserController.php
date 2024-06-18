<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportUserResource;
use App\Http\Resources\UserResource;
use App\Models\ReportUser;
use App\Http\Requests\CreateReportUserRequest;
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
        $report = ReportUser::findOrFail($id);
        $user = User::findOrFail($report->landlord_id);
        $user->delete();
        $report->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
    public function store(CreateReportUserRequest $request)
    {
        $report = ReportUser::create($request->validated());
        return response()->json(['message' => 'Report created successfully', 'data' => new ReportUserResource($report)], 201);
    }
}
