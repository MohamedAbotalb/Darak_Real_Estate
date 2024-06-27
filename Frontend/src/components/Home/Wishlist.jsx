import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from 'store/home/wishlistSlice';
import PropertyCard from './PropretyCard';

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const status = useSelector((state) => state.wishlist.status);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading wishlist...</div>;
  }

  if (wishlist.length === 0) {
    return <div>Your wishlist is empty.</div>;
  }

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      <div className="cards">
        {wishlist.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
