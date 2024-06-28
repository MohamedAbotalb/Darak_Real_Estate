<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function show()
    {
        $reviews = Review::with(['user', 'property'])->get();
        return response()->json($reviews);
    }
}
