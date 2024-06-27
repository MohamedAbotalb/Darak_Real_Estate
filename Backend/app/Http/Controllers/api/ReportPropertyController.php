<?php
namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reports\CreateReportPropertyRequest;
use App\Http\Resources\ReportPropertyResource;
use App\Services\ReportPropertyService;

class ReportPropertyController extends Controller
{
    protected $reportPropertyService;

    public function __construct(ReportPropertyService $reportPropertyService)
    {
        $this->reportPropertyService = $reportPropertyService;
    }

    public function index()
    {
        $reports = ReportPropertyResource::collection($this->reportPropertyService->getAllReports());
        
        if ($reports->isEmpty()) {
            return response()->json(['message' => 'No reports found'], 400);
        }

        return response()->json($reports, 200);
    }
    public function deleteReport(int $id)
    {
        $report = $this->reportPropertyService->findReportById($id);
        
        if (!$report) {
            return response()->json(['error' => 'Report not found'], 400);
        }

        $this->reportPropertyService->deleteReport($report);

        return response()->json(['message' => 'Report deleted successfully', 'data' => new ReportPropertyResource($report)], 200);
    }
    public function deleteProperty(int $id)
    {
        $report = $this->reportPropertyService->findReportById($id);
        
        if (!$report) {
            return response()->json(['error' => 'Report not found'], 400);
        }

        $this->reportPropertyService->deletePropertyAndReport($report);

        return response()->json(['message' => 'Property and report deleted successfully'], 200);
    }
    public function store(CreateReportPropertyRequest $request)
    {
        $report = $this->reportPropertyService->createReport($request->validated());

        return response()->json(['message' => 'Report created successfully', 'data' => new ReportPropertyResource($report)], 201);
    }
}
