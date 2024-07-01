<?php

namespace App\Repositories;

interface ReviewRepositoryInterface
{
    public function showReviews();
    public function storeReview(array $data);

    
}
