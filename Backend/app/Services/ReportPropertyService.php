<?php
namespace App\Services;

use App\Models\ReportProperty;
use Illuminate\Support\Facades\DB;

class ReportPropertyService
{
    public function getAllReports()
    {
        return ReportProperty::all();
    }

    public function findReportById(int $id)
    {
        return ReportProperty::find($id);
    }

    public function deleteReport(ReportProperty $report)
    {
        return $report->delete();
    }

    public function deletePropertyAndReport(ReportProperty $report)
    {
        return DB::transaction(function () use ($report) {
            if ($report->property) {
                $report->property->delete();
            }
            return $report->delete();
        });
    }
    public function createReport(array $data)
    {
        return ReportProperty::create($data);
    }
}
