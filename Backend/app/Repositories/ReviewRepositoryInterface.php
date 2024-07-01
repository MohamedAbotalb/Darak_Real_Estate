<?php

namespace App\Repositories;

interface ReviewRepositoryInterface
{
    public function showReviews();
    public function storeReview(array $data);
    public function updateReview(int $id, array $data);
    
}
