<?php

namespace App\Services;

use App\Models\Wishlist;
use Illuminate\Support\Facades\Auth;

class WishlistService
{
    public function getUserWishlist()
    {
        return Wishlist::with(['user', 'property'])->where('user_id', Auth::id())->get();
    }

    public function addToWishlist($propertyId)
    {
        $existingWishlistItem = Wishlist::where('user_id', Auth::id())->where('property_id', $propertyId)->first();

        if ($existingWishlistItem) {
            return null;
        }

        $wishlist = Wishlist::create([
            'user_id' => Auth::id(),
            'property_id' => $propertyId,
        ]);

        return $wishlist;
    }

    public function removeFromWishlist($id)
    {
        $wishlistItem = Wishlist::find($id);

        if ($wishlistItem) {
            $wishlistItem->delete();
        }
    }
}
