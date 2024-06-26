<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\WishlistResource;
use App\Services\WishlistService;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    protected $wishlistService;

    public function __construct(WishlistService $wishlistService)
    {
        $this->wishlistService = $wishlistService;
    }

    public function show()
    {
        $wishlist = $this->wishlistService->getUserWishlist();
        return response()->json(WishlistResource::collection($wishlist));
    }

    public function store(Request $request)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);

        $propertyId = $request->property_id;

        $wishlistItem = $this->wishlistService->addToWishlist($propertyId);

        if (!$wishlistItem) {
            return response()->json(['message' => 'Property already in wishlist'], 200);
        }

        return response()->json(['message' => 'Property added to wishlist', 'data' => new WishlistResource($wishlistItem)], 200);
    }

    public function delete($id)
    {
        $this->wishlistService->removeFromWishlist($id);
        return response()->json(['message' => 'Item deleted successfully']);
    }
}
