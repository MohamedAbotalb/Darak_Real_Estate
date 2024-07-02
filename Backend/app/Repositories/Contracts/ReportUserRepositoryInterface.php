<?php

namespace App\Repositories\Contracts;

interface ReportUserRepositoryInterface
{
    public function getAllReports();
    public function findReportById(int $id);
    public function deleteReportById(int $id);
    public function deleteUserAndReportById(int $id);
    public function createReport(array $data);
}
