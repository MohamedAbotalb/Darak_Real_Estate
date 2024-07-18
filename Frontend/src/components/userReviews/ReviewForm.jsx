import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  addReviewAsync,
  fetchReviews,
} from 'store/userReviews/userReviewsSlice';
import { fetchAverageRatingAsync } from 'store/userReviews/averageRatingSlice';
import { TextField, Box, Rating, Typography, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ReviewForm({ propertyId, ownerId, onReviewAdded }) {
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState('');
  const [rateError, setRateError] = useState('');
  const [contentError, setContentError] = useState('');

  const { user } = useSelector((state) => state.auth);
  const reviews = useSelector((state) => state.reviews.reviews);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchReviews(propertyId));
  }, [dispatch, propertyId]);

  const existingReview = reviews?.find(
    (review) => review.user?.id === user?.id
  );

  const handleSubmit = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user?.role === 'landlord') {
      if (user?.id === ownerId) {
        toast.error(
          'Property owners cannot leave reviews for their own properties.'
        );
        return;
      }
    }

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

    const reviewData = {
      property_id: propertyId,
      rate,
    };

    if (content.trim() !== '') {
      reviewData.content = content.trim();
    }

    dispatch(addReviewAsync(reviewData))
      .then(() => {
        setRate(0);
        setContent('');
        dispatch(fetchReviews(propertyId));
        onReviewAdded(); // Fetch updated average rating

        if (existingReview) {
          toast.info('Review already added. You can edit or delete it.');
        } else {
          toast.success('Review added successfully!');
        }
      })
      .catch((error) => {
        if (error) {
          toast.error('Failed to add review. Please try again later.');
        }
      });
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {!existingReview ? (
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Leave a Review</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Rating
              name="rate"
              value={rate}
              onChange={(event, newValue) => setRate(newValue)}
            />
            {rateError && (
              <Typography variant="caption" color="error">
                {rateError}
              </Typography>
            )}
          </Box>
          <TextField
            label="Review"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton color="primary" onClick={handleSubmit}>
                  <SendIcon />
                </IconButton>
              ),
              style: { backgroundColor: '#f8f5f5' },
              disableUnderline: true,
            }}
          />
          {contentError && (
            <Typography variant="caption" color="error">
              {contentError}
            </Typography>
          )}
        </Box>
      ) : (
        <Box>
          <Typography variant="h6">Thank you for your review</Typography>
        </Box>
      )}
    </Box>
  );
}

ReviewForm.propTypes = {
  propertyId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  onReviewAdded: PropTypes.func.isRequired,
};

export default ReviewForm;
