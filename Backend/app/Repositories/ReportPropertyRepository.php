<?php

namespace App\Repositories;

use App\Models\PropertyImage;
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
            $property = $report->property;

            if ($property) {
                ReportProperty::where('property_id', $property->id)->delete();
                PropertyImage::where('property_id', $property->id)->delete();
                $property->amenities()->detach();
                $property->delete();
            }

            return true;
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
