<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reports\CreateReportPropertyRequest;
use App\Http\Resources\ReportPropertyResource;
use App\Repositories\ReportPropertyRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ReportPropertyController extends Controller
{
    protected $reportPropertyRepository;

    public function __construct(ReportPropertyRepositoryInterface $reportPropertyRepository)
    {
        $this->reportPropertyRepository = $reportPropertyRepository;
    }

    public function index()
    {
        $reports = ReportPropertyResource::collection($this->reportPropertyRepository->getAllReports());

        if ($reports->isEmpty()) {
            return response()->json(['message' => 'No reports found'], 400);
        }

        return response()->json($reports, 200);
    }

    public function deleteReport(int $id)
    {
        $report = $this->reportPropertyRepository->deleteReportById($id);

        if (!$report) {
            return response()->json(['error' => 'Report not found'], 400);
        }

        return response()->json(['message' => 'Report deleted successfully'], 200);
    }

    public function deleteProperty(int $id)
    {
        $report = $this->reportPropertyRepository->deletePropertyAndReportById($id);

        if (!$report) {
            return response()->json(['error' => 'Report not found'], 400);
        }

        return response()->json(['message' => 'Property and report deleted successfully'], 200);
    }

    public function store(CreateReportPropertyRequest $request)
    {
        $data = $request->validated() ;
        $data['user_id']=Auth::id();
        $report = $this->reportPropertyRepository->createReport($data);
        return response()->json(['message' => 'Report created successfully', 'data' => new ReportPropertyResource($report)], 201);
    }
}
