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
    public function store(Request $request,$id){
        //It will edit with auth user
        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);

        $userId = $id;
        $propertyId = $request->property_id;

        $existingWishlistItem = Wishlist::where('user_id', $userId)->where('property_id', $propertyId)->first();

        if ($existingWishlistItem) {
            return response()->json(['message' => 'Property already in wishlist'], 200);
        }

        $wishlist = Wishlist::create([
            'user_id' => $userId,
            'property_id' => $propertyId,
        ]);

        return response()->json(['message' => 'Property added to wishlist', 'data' => $wishlist], 200);
    }
}
