<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Wishlists\StoreWishlistRequest;
use App\Http\Resources\WishlistResource;
use App\Repositories\WishlistRepositoryInterface;
use Illuminate\Http\Request;
class WishlistController extends Controller
{
    protected $wishlistRepository;

    public function __construct(WishlistRepositoryInterface $wishlistRepository)
    {
        $this->wishlistRepository = $wishlistRepository;
    }

    public function show()
    {
        $userId = auth()->id();
        $wishlist = $this->wishlistRepository->getUserWishlist($userId);
        return response()->json(["data"=>WishlistResource::collection($wishlist)]);
    }

    public function store(StoreWishlistRequest $request)
    {

        $userId = auth()->id();
        $propertyId = $request->property_id;

        $wishlistItem = $this->wishlistRepository->addToWishlist($userId, $propertyId);

        if (!$wishlistItem) {
            return response()->json(['message' => 'Property already in wishlist'], 200);
        }

        return response()->json(['message' => 'Property added to wishlist', 'data' => new WishlistResource($wishlistItem)], 200);
    }

    public function delete($id)
    {
        $wishlistItem =$this->wishlistRepository->removeFromWishlist($id);
        return response()->json(['message' => 'Item deleted successfully']);
    }
}