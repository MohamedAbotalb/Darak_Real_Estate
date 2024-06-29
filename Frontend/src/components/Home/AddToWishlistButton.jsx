import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from 'store/home/wishlistSlice';

function AddToWishlistButton({ property }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const { status } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWishlist());
    }
  }, [status, dispatch]);

  const isInWishlist = wishlist.some(
    (item) => item.property && item.property.id === property.id
  );

  const handleToggleWishlist = async () => {
    if (isInWishlist) {
      const wishlistItem = wishlist.find(
        (item) => item.property && item.property.id === property.id
      );
      dispatch(removeFromWishlist(wishlistItem.id));
      toast.success('Property removed from wishlist successfully', {
        position: 'top-right',
      });
    } else {
      dispatch(addToWishlist(property));
      toast.success('Property added to wishlist successfully', {
        position: 'top-right',
      });
    }
    // Fetch the updated wishlist
    dispatch(fetchWishlist());
  };

  return (
    <IconButton onClick={handleToggleWishlist} color="error">
      {isInWishlist ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}

AddToWishlistButton.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default AddToWishlistButton;
