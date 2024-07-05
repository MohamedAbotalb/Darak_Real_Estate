
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReviewAsync, fetchReviews } from 'store/userReviews/userReviewsSlice';
import { TextField, Box, Rating, Typography, IconButton } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material'; // Import the icon you want to use
import { toast } from 'react-toastify';
import AverageRating from './AverageRating';

function ReviewForm({ propertyId }) {
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState('');
  const [rateError, setRateError] = useState('');
  const [contentError, setContentError] = useState('');
  const [reviewAdded, setReviewAdded] = useState(false); // State to track review addition
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews(propertyId));
  }, [dispatch, propertyId]);

  // Get reviews from Redux store
  const reviews = useSelector(state => state.userReviews.reviews);

  // Check if there's already a review for the property
  useEffect(() => {
    const existingReview = reviews.find(review => review.property_id === propertyId);
    setReviewAdded(existingReview !== undefined);
  }, [reviews, propertyId]);

  const handleSubmit = () => {
    let valid = true;

    if (rate === 0) {
      setRateError('Please provide a rating.');
      toast.error('Please provide a rating.');
      valid = false;
    } else {
      setRateError('');
    }

    if (content.trim() !== '') {
      if (content.trim().length < 4) {
        setContentError('Comment must be at least 4 characters long.');
        valid = false;
      } else if (/^\d/.test(content.trim())) {
        setContentError('Comment cannot start with a number.');
        valid = false;
      } else {
        setContentError('');
      }
    }

    if (!valid) {
      return;
    }

    // Prepare review data
    const reviewData = {
      property_id: propertyId,
      rate,
    };

    if (content.trim() !== '') {
      reviewData.content = content.trim();
    }

    dispatch(addReviewAsync(reviewData)).then(() => {
      // Reset form fields
      setRate(0);
      setContent('');
      setReviewAdded(true); // Set reviewAdded to true after successful addition
      dispatch(fetchReviews(propertyId));
      toast.success('Review added successfully!');
    });
  };

  if (reviewAdded) {
    return (
      <Typography variant="body1">
        You have already reviewed this property. If you want to delete your review, please do so from your profile.
      </Typography>
    );
  }

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box flex={1} gap={2}>
        {/* <AverageRating propertyId={propertyId} /> */}
        <Rating
          name="rate"
          value={rate}
          onChange={(event, newValue) => setRate(newValue)}
        />
        {rateError && <Typography variant="caption" color="error">{rateError}</Typography>}
        <TextField
          label="Review"
          multiline
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton color="primary" onClick={handleSubmit}>
                <AddCircleOutline />
              </IconButton>
            ),
            style: { backgroundColor: '#eeecec' },
            disableUnderline: true, // Remove the border
          }}
        />
        {contentError && <Typography variant="caption" color="error">{contentError}</Typography>}
      </Box>
    </Box>
  );
}

ReviewForm.propTypes = {
  propertyId: PropTypes.number.isRequired,
};

export default ReviewForm;

