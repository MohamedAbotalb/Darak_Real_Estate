<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reasons\StoreReasonRequest;
use App\Http\Requests\Reasons\UpdateReasonRequest;
use App\Http\Resources\ReasonReportResource;
use App\Repositories\ReasonReportRepositoryInterface;
use Illuminate\Http\Request;

class ReasonReportController extends Controller
{
    protected $ReasonReportRepository;
    public function __construct(ReasonReportRepositoryInterface $reasonReportRepositoryInterface){
        $this->ReasonReportRepository=$reasonReportRepositoryInterface;
    }
    public function store(StoreReasonRequest $request){

        $reason = $this->ReasonReportRepository->storeReason($request->all());
        if($reason){
            return response()->json(['message' => 'Reason added successfully'], 201); 
        }else{
            return response()->json(['message' => 'failed to add reason'], 400);
        }

    }
    public function showReasonProperties(){
        $reasons=$this->ReasonReportRepository->showPropertiesReportReasons();
        if($reasons){
            return response()->json(['data'=>ReasonReportResource::collection($reasons)], 201); 
        }else{
            return response()->json(['message' => 'Reason not found'], 400);
        }
    }
    public function showReasonUser(){
        $reasons=$this->ReasonReportRepository->showUsersReportReasons();
        if($reasons){
            return response()->json(['data'=>ReasonReportResource::collection($reasons)], 201); 
        }else{
            return response()->json(['message' => 'Reason not found'], 400);
        }
    }
    public function delete(int $id){
        $reasons=$this->ReasonReportRepository->deleteReportReason($id);
        if($reasons){
            return response()->json(['message'=>'Reason deleted successfully'], 201); 
        }else{
            return response()->json(['message' => 'Reason not found'], 400);
        }
    }
    public function show(){
        $reasons=$this->ReasonReportRepository->showAllReasons();
        if($reasons){
            return response()->json(['data'=>ReasonReportResource::collection($reasons)], 201); 
        }else{
            return response()->json(['message' => 'Reasons not found'], 400);
        }
    }
    public function update(UpdateReasonRequest $request, $id)
    {
        $reason = $this->ReasonReportRepository->updateReason($id, $request->all());
        if ($reason) {
            return response()->json(['message' => 'Reason updated successfully', 'data' => new ReasonReportResource($reason)], 200); 
        } else {
            return response()->json(['message' => 'Reason not found'], 404);
        }
    }
}
