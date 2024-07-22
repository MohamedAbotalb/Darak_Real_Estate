import React, { lazy } from 'react';

const Wishlist = lazy(() => import('components/Home/Wishlist'));

function WishlistPage() {
  return <Wishlist />;
}

export default WishlistPage;
