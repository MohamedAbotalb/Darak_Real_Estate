<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reasons\StoreReasonRequest;
use App\Repositories\ReasonReportRepositoryInterface;
use Illuminate\Http\Request;

class ReasonReportController extends Controller
{
    protected $ReasonReportRepository;
    public function __construct(ReasonReportRepositoryInterface $reasonReportRepositoryInterface){
        $this->ReasonReportRepository=$reasonReportRepositoryInterface;
    }
    public function Store(StoreReasonRequest $request){

        $reason = $this->ReasonReportRepository->storeReason($request->all());
        if($reason){
            return response()->json(['message' => 'Reason added successfully'], 201); 
        }else{
            return response()->json(['message' => 'failed to add reason'], 400);
        }

    }
}
