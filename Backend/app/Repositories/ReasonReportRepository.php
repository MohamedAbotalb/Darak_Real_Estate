<?php

namespace App\Repositories;

use App\Models\ReasonReport;

class ReasonReportRepository implements ReasonReportRepositoryInterface
{
    public function storeReason(array $data){
        return ReasonReport::create($data);
    }
   public function showPropertiesReportReasons(){
        return ReasonReport::where('type','report-property')->get();
   }
}
