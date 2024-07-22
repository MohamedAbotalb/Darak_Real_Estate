import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Box, Rating, Typography, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import {
  addReviewAsync,
  fetchReviews,
} from 'store/userReviews/userReviewsSlice';
import { fetchAverageRatingAsync } from 'store/userReviews/averageRatingSlice';
import { errorToast, successToast, infoToast } from 'utils/toast';

function ReviewForm({ propertyId, ownerId, onReviewAdded }) {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(i18n.language);
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState('');
  const [rateError, setRateError] = useState('');
  const [contentError, setContentError] = useState('');

  const { user } = useSelector((state) => state.auth);
  const reviews = useSelector((state) => state.reviews.reviews);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchReviews(propertyId));
  }, [dispatch, propertyId]);

  const existingReview = reviews?.find(
    (review) => review.user?.id === user?.id
  );

  const checkUserPresence = () => {
    if (!user) navigate('/login', { state: { prevUrl: location.pathname } });
  };

  const handleSubmit = () => {
    checkUserPresence();

    if (user?.role === 'landlord') {
      if (user?.id === ownerId) {
        errorToast(
          t('Property owners cannot leave reviews for their own properties.')
        );
        return;
      }
    }

    let valid = true;

    if (rate === 0) {
      setRateError(t('Please provide a rating.'));
      errorToast(t('Please provide a rating.'));
      valid = false;
    } else {
      setRateError('');
    }

    if (content.trim() !== '') {
      if (content.trim().length < 4) {
        setContentError(t('Comment must be at least 4 characters long.'));
        valid = false;
      } else if (/^\d/.test(content.trim())) {
        setContentError(t('Comment cannot start with a number.'));
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
          infoToast(t('Review already added. You can edit or delete it.'));
        } else {
          successToast(t('Review added successfully!'));
        }
      })
      .catch((error) => {
        if (error) {
          errorToast(t('Failed to add review. Please try again later.'));
        }
      });
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {!existingReview ? (
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">{t('Leave a Review')}</Typography>
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
            label={t('Review')}
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{ position: 'absolute', right: '0', bottom: '0' }}
                  color="primary"
                  onClick={handleSubmit}
                >
                  <SendIcon sx={{ color: 'var(--primary-color)' }} />
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
          <Typography variant="h6">{t('Thank you for your review')}</Typography>
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
