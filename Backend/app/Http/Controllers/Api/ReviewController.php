<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reviews\StoreReviewRequest;
use App\Http\Requests\Reviews\UpdateReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Repositories\Contracts\ReviewRepositoryInterface;

class ReviewController extends Controller
{
    protected $reviewRepository;
    public function __construct(ReviewRepositoryInterface $reviewRepositoryInterface){
        $this->reviewRepository=$reviewRepositoryInterface;
    }
    public function show()
    {
        $reviews = $this->reviewRepository->showReviews();
        if(!$reviews->isEmpty()){
            return response()->json(['data'=>ReviewResource::collection($reviews)]);
        }else{
            return response()->json(['message'=>'Reviews is empty']);
        }
    }
    public function store(StoreReviewRequest $request)
    {
        
        $review = $this->reviewRepository->storeReview($request->validated());
        if ($review) {
            return response()->json(['data' => new ReviewResource($review)], 201);
        } else {
            return response()->json(['message' => 'Failed to create review'], 400);
        }
    }
    public function update(UpdateReviewRequest $request, $id)
    {
        $review = $this->reviewRepository->updateReview($id, $request->validated());
        if ($review) {
            return response()->json(['data' => new ReviewResource($review)], 200);
        } else {
            return response()->json(['message' => 'Failed to update review or review not found'], 404);
        }
    }
    public function delete($id){
        $review = $this->reviewRepository->deleteReview($id);
        if ($review) {
            return response()->json(['message' => 'review deleted successfuly'], 200);
        } else {
            return response()->json(['message' => 'review not found'], 404);
        }
    }
    
}
