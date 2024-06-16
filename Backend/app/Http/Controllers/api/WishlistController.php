<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function show($id){

         //It will edit with auth user
        $wishlist = Wishlist::with('property')->where('user_id', $id)->get();
        return response()->json($wishlist);
    }
}
