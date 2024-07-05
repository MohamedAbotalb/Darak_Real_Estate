import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAverageRating } from 'store/userReviews/averageRatingSlice';
import { CircularProgress, Box, Typography } from '@mui/material';
import StarRating from './StarRating';

const AverageRating = ({ propertyId }) => {
  const dispatch = useDispatch();
  const { average, status, error } = useSelector((state) => state.averageRating);

  useEffect(() => {
    dispatch(fetchAverageRating(propertyId));
  }, [dispatch, propertyId]);

  if (status === 'loading') {
    return <CircularProgress size={24} />;
  }

  if (status === 'failed') {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  // Handle case where average is initially a string
  if (typeof average === 'string') {
    average = parseFloat(average); // Convert string to float
  }

  // Handle case where average is undefined or null
  if (!average) {
    return <Typography variant="h6">No average rating available</Typography>;
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h6">Average Rating: {average.toFixed(1)}</Typography>
      <StarRating rating={average} />
    </Box>
  );
};

export default AverageRating;
