<?php

namespace App\Repositories;

use App\Models\ReportUser;
use App\Repositories\Contracts\ReportUserRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ReportUserRepository implements ReportUserRepositoryInterface
{
    public function getAllReports()
    {
        return ReportUser::all();
    }

    public function findReportById(int $id)
    {
        return ReportUser::find($id);
    }

    public function deleteReportById(int $id)
    {
        $report = ReportUser::find($id);

        if ($report) {
            return $report->delete();
        }

        return false; 
    }

    public function deleteUserAndReportById(int $id)
    {
        return DB::transaction(function () use ($id) {
            $report = ReportUser::find($id);

            if ($report) {
                if ($report->user) {
                    $report->user->delete();
                }
                return $report->delete();
            }

            return false; 
        });
    }

    public function createReport(array $data)
    {
        $report = ReportUser::create($data);
        $report->load('reason'); 
        return $report;
    }
}
