import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Box,
  Pagination,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { fetchWishlist } from 'store/home/wishlistSlice';
import PropertyCard from 'components/Home/PropertyCard';
import Loader from 'components/Loader';

const ITEMS_PER_PAGE = 6;

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const status = useSelector((state) => state.wishlist.status);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const filteredWishlist = wishlist.filter((item) => {
    if (filter === 'all') return true;
    return item.property.listing_type === filter;
  });

  const paginatedWishlist = filteredWishlist.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <Box
      className="wishlist"
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      mx={{ xs: 2, sm: 4 }}
      mt={4}
      px={{ xs: 2, sm: 4 }}
      py={4}
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mb={4}
      >
        <Typography variant="h5" mb={{ xs: 2, sm: 0 }}>
          Saved Wishlist
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h6" mr={2}>
            Category
          </Typography>
          <FormControl variant="outlined" margin="normal" sx={{ width: 150 }}>
            <Select value={filter} onChange={handleFilterChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="rent">Rent</MenuItem>
              <MenuItem value="buy">Buy</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {filteredWishlist.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          textAlign="center"
        >
          <Typography variant="h4" mb={1} color="text.secondary">
            No Saved Properties
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Click on a heart to save a property and all your favorites will
            appear here.
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {paginatedWishlist.map((wishlistItem) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={wishlistItem.id}>
                <Box display="flex" justifyContent="center">
                  <PropertyCard property={wishlistItem.property} />
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box mt={3} mx="auto">
            <Pagination
              count={Math.ceil(filteredWishlist.length / ITEMS_PER_PAGE)}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default Wishlist;
