<?php

namespace App\Repositories;

use App\Models\ReasonReport;

class ReasonReportRepository implements ReasonReportRepositoryInterface
{
    public function storeReason(array $data){
        return ReasonReport::create($data);
    }
   
}
