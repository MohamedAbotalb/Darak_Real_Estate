import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Box display="flex" alignItems="center">
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon
          key={`full-star-${fullStars - index}`}
          style={{ color: '#FFD700' }}
        />
      ))}
      {hasHalfStar && (
        <StarHalfIcon key="half-star" style={{ color: '#FFD700' }} />
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <StarBorderIcon
          key={`empty-star-${emptyStars - index}`}
          style={{ color: '#FFD700' }}
        />
      ))}
    </Box>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
