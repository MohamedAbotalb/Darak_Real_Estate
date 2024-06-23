<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\WishlistResource;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function show(){

        $wishlist = Wishlist::with(['user', 'property'])->where('user_id', Auth::id())->get();
        return response()->json(WishlistResource::collection($wishlist));
    }
    public function store(Request $request,){
        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);

        $propertyId = $request->property_id;

        $existingWishlistItem = Wishlist::where('user_id', Auth::id())->where('property_id', $propertyId)->first();

        if ($existingWishlistItem) {
            return response()->json(['message' => 'Property already in wishlist'], 200);
        }

        $wishlist = Wishlist::create([
            'user_id' => Auth::id(),
            'property_id' => $propertyId,
        ]);

        return response()->json(['message' => 'Property added to wishlist', 'data' => $wishlist], 200);
    }
}
