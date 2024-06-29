import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addToWishlist, removeFromWishlist } from 'store/home/wishlistSlice';

function AddToWishlistButton({ property }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (property) {
      const wishlistItem = wishlist.find(
        (item) => item.property && item.property.id === property.id
      );
      setIsWishlisted(!!wishlistItem);
    }
  }, [wishlist, property]);

  const handleWishlistToggle = async () => {
    if (property) {
      if (isWishlisted) {
        const wishlistItem = wishlist.find(
          (item) => item.property && item.property.id === property.id
        );
        if (wishlistItem) {
           setIsWishlisted(false);
          dispatch(removeFromWishlist(wishlistItem.id));
         
        }
      } else {
        setIsWishlisted(true);
        dispatch(addToWishlist(property));
        
      }
    }
  };

  return (
    <IconButton onClick={handleWishlistToggle} color="error">
      {isWishlisted ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}

AddToWishlistButton.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddToWishlistButton;
