<?php

namespace App\Repositories;

use App\Models\Review;
use App\Repositories\Contracts\ReviewRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function showReviews(){
        return Review::with(['user', 'property','reactions','replies'])->get();
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
        $review['user_id']=Auth::id();
        if ($review) {
            $review->delete();
            return true;
        }
        return null;
    }
    public function showPropertyReviews(int $id)
    {
        return Review::where('property_id', $id)->with('replies')->get();
    }
    public function getAverageRating(int $propertyId)
    {
         $averageRating=Review::where('property_id', $propertyId)
            ->avg('rate');
            if(!$averageRating){
                return null;
            }
            return number_format($averageRating, 1);
    }
}
