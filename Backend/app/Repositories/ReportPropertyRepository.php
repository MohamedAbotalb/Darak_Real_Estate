<?php

namespace App\Repositories;

use App\Models\ReportProperty;
use App\Repositories\Contracts\ReportPropertyRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ReportPropertyRepository implements ReportPropertyRepositoryInterface
{
    public function getAllReports()
    {
        return ReportProperty::all();
    }

    public function findReportById(int $id)
    {
        return ReportProperty::find($id);
    }

    public function deleteReportById(int $id)
    {
        $report = ReportProperty::find($id);

        if ($report) {
            return $report->delete();
        }

        return false;
    }

    public function deletePropertyAndReportById(int $id)
    {
        return DB::transaction(function () use ($id) {
            $report = ReportProperty::find($id);

            if ($report) {
                if ($report->property) {
                    $report->property->delete();
                }
                return $report->delete();
            }

            return false;
        });
    }

    public function createReport(array $data)
    {
        $report = ReportProperty::create($data);
        $report->load('reason'); 
        return $report;
    }
}
