<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reports\CreateReportUserRequest;
use App\Http\Resources\ReportUserResource;
use App\Services\ReportUserService;
use Illuminate\Http\JsonResponse;

class ReportUserController extends Controller
{
    protected $reportUserService;

    public function __construct(ReportUserService $reportUserService)
    {
        $this->reportUserService = $reportUserService;
    }

    public function index()
    {
        $reports = ReportUserResource::collection($this->reportUserService->getAllReports());
        
        if ($reports->isEmpty()) {
            return response()->json(['message' => 'No reports found'], 400);
        }

        return response()->json(['message' => 'Reports fetched successfully', 'data' => $reports], 200);
    }

    public function deleteReport(int $id)
    {
        $report = $this->reportUserService->findReportById($id);
        
        if (!$report) {
            return response()->json(['error' => 'Report not found'], 400);
        }

        $this->reportUserService->deleteReport($report);

        return response()->json(['message' => 'Report deleted successfully', 'data' => new ReportUserResource($report)], 200);
    }

    
    public function deleteUser(int $id)
    {
        $report = $this->reportUserService->findReportById($id);
        
        if (!$report) {
            return response()->json(['error' => 'Report not found'], 400);
        }

        $this->reportUserService->deleteUserAndReport($report);

        return response()->json(['message' => 'User and report deleted successfully'], 200);
    }

    public function store(CreateReportUserRequest $request): JsonResponse
    {
        $report = $this->reportUserService->createReport($request->validated());

        return response()->json(['message' => 'Report created successfully', 'data' => new ReportUserResource($report)], 201);
    }
}
