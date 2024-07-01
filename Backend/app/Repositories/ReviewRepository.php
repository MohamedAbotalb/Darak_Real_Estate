<?php

namespace App\Repositories;

use App\Models\Review;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function showReviews(){
        return Review::with(['user', 'property'])->get();
    }
    public function storeReview(array $data)
    {
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
}
