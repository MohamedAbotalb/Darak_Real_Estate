import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from 'store/home/wishlistSlice';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import PropertyCard from './PropertyCard';

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const status = useSelector((state) => state.wishlist.status);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (wishlist.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">Your wishlist is empty.</Typography>
      </Box>
    );
  }

  return (
    <Box
      className="wishlist"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {wishlist.map((wishlistItem) => {
          if (!wishlistItem.property) {
            console.error('Invalid wishlistItem:', wishlistItem);
            return null;
          }
          return (
            <Grid item xs={12} sm={6} md={4} key={wishlistItem.id}>
              <Box display="flex" justifyContent="center">
                <PropertyCard property={wishlistItem.property} />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Wishlist;
