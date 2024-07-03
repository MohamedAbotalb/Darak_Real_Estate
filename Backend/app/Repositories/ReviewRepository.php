<?php

namespace App\Repositories;

use App\Models\Review;
use App\Repositories\Contracts\ReviewRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function showReviews(){
        return Review::with(['user', 'property','reactions'])->get();
    }
    public function storeReview(array $data)
    {
        $data['user_id']=Auth::id(); 
        return Review::create($data);
    }
    public function updateReview(int $id, array $data)
    {
        $review = Review::find($id);
        if ($review) {
            $review->update($data);
            return $review;
        }
        return null;
    }
    public function deleteReview(int $id){
        $review = Review::find($id);
        if ($review) {
            $review->delete();
            return true;
        }
        return null;
    }
}
