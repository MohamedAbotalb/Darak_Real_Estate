import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAverageRatingAsync} from 'store/userReviews/averageRatingSlice';
import { CircularProgress, Box, Typography } from '@mui/material';
import StarRating from './StarRating';

function AverageRating({ propertyId }) {
  const dispatch = useDispatch();
  const { average, status, error } = useSelector(
    (state) => state.averageRating
  );

  useEffect(() => {
    dispatch(fetchAverageRatingAsync(propertyId));
  }, [dispatch, propertyId]);

  if (status === 'loading') {
    return <CircularProgress size={24} />;
  }

  if (status === 'failed') {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }

  const averageRating = parseFloat(average);

  if (!averageRating && average !== 0) {
    return <Typography variant="h6">No average rating available</Typography>;
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h6">
        Average Rating: {averageRating.toFixed(1)}
      </Typography>
      <StarRating rating={averageRating} />
    </Box>
  );
}

AverageRating.propTypes = {
  propertyId: PropTypes.number.isRequired,
};

export default AverageRating;
