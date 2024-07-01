<?php

namespace App\Repositories;

interface ReasonReportRepositoryInterface
{
    public function storeReason(array $data);
    public function showPropertiesReportReasons();
    public function showUsersReportReasons();
    public function deleteReportReason(int $id);
    public function showAllReasons();
    public function updateReason($id, array $data);

}
