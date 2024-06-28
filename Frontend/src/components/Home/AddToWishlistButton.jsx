import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addToWishlist, removeFromWishlist } from 'store/home/wishlistSlice';

function AddToWishlistButton({ property }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (property && property.id) {
      const wishlistItem = wishlist.find(
        (item) => item.property && item.property.id === property.id
      );
      setIsWishlisted(!!wishlistItem);
    }
  }, [wishlist, property]);

  const handleWishlistToggle = async () => {
    if (property && property.id) {
      if (isWishlisted) {
        const wishlistItem = wishlist.find(
          (item) => item.property && item.property.id === property.id
        );
        if (wishlistItem) {
          dispatch(removeFromWishlist(wishlistItem.id));
          setIsWishlisted(false);
        }
      } else {
        dispatch(addToWishlist(property));
        setIsWishlisted(true);
      }
    }
  };

  return (
    <IconButton onClick={handleWishlistToggle} color="error">
      {isWishlisted ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}

export default AddToWishlistButton;
