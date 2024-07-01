<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reports\CreateReportUserRequest;
use App\Http\Resources\ReportUserResource;
use App\Repositories\ReportUserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ReportUserController extends Controller
{
    protected $reportUserRepository;

    public function __construct(ReportUserRepositoryInterface $reportUserRepository)
    {
        $this->reportUserRepository = $reportUserRepository;
    }

    public function index()
    {
        $reports = ReportUserResource::collection($this->reportUserRepository->getAllReports());
        
        if ($reports->isEmpty()) {
            return response()->json(['message' => 'No reports found'], 400);
        }

        return response()->json(['message' => 'Reports fetched successfully', 'data' => $reports], 200);
    }

    public function deleteReport(int $id)
    {
        $deleted = $this->reportUserRepository->deleteReportById($id);

        if (!$deleted) {
            return response()->json(['error' => 'Report not found'], 400);
        }

        return response()->json(['message' => 'Report deleted successfully'], 200);
    }

    public function deleteUser(int $id)
    {
        $deleted = $this->reportUserRepository->deleteUserAndReportById($id);

        if (!$deleted) {
            return response()->json(['error' => 'Report not found'], 400);
        }

        return response()->json(['message' => 'User and report deleted successfully'], 200);
    }

    public function store(CreateReportUserRequest $request)
    {
        $data = $request->validated() ;
        $data['user_id']=Auth::id();
        $report = $this->reportUserRepository->createReport($data);
        return response()->json(['message' => 'Report created successfully', 'data' => new ReportUserResource($report)], 201);
    }
}
