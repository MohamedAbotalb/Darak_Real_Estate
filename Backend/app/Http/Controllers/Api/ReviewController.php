<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reviews\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use App\Repositories\ReviewRepositoryInterface;
use Illuminate\Http\Request;

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
}
