<?php

namespace App\Repositories;

use App\Models\Review;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function showReviews(){
        return Review::with(['user', 'property'])->get();
    }
}
