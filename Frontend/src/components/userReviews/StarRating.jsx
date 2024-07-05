import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <Box display="flex" alignItems="center">
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index} color="primary" />
      ))}
      {hasHalfStar && <StarHalfIcon color="primary" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <StarBorderIcon key={index} color="primary" />
      ))}
    </Box>
  );
};

export default StarRating;
