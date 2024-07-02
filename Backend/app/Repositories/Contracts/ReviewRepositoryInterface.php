<?php

namespace App\Repositories\Contracts;

interface ReviewRepositoryInterface
{
    public function showReviews();
    public function storeReview(array $data);
    public function updateReview(int $id, array $data);
    
}
