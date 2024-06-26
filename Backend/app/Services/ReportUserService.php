<?php
namespace App\Services;

use App\Models\ReportUser;
use Illuminate\Support\Facades\DB;

class ReportUserService
{

    public function getAllReports()
    {
        return ReportUser::all();
    }
    public function findReportById(int $id)
    {
        return ReportUser::find($id);
    }
    public function deleteReport(ReportUser $report)
    {
        return $report->delete();
    }

    public function deleteUserAndReport(ReportUser $report)
    {
        return DB::transaction(function () use ($report) {
            if ($report->user) {
                $report->user->delete();
            }
            return $report->delete();
        });
    }

    public function createReport(array $data)
    {
        return ReportUser::create($data);
    }
}
