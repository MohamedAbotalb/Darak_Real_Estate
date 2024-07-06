import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { successToast } from 'utils/toast';

import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from 'store/home/wishlistSlice';

function AddToWishlistButton({ property }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.list);
  const { status } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWishlist());
    }
  }, [status, dispatch]);

  const isInWishlist = wishlist.some(
    (item) => item.property && item.property.id === property.id
  );

  const handleToggleWishlist = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (property) {
      if (isInWishlist) {
        const wishlistItem = wishlist.find(
          (item) => item.property && item.property.id === property.id
        );
        if (wishlistItem) {
          dispatch(removeFromWishlist(wishlistItem.id));
          successToast('Property removed from wishlist successfully');
        }
      } else {
        dispatch(addToWishlist(property));
        successToast('Property added to wishlist successfully');
      }
      // Fetch the updated wishlist
      dispatch(fetchWishlist());
    }
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
