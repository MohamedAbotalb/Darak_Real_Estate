<?php
namespace App\Repositories;

interface WishlistRepositoryInterface
{
    public function getUserWishlist(int $userId);

    public function addToWishlist(int $userId, int $propertyId);

    public function removeFromWishlist(int $id);
}
