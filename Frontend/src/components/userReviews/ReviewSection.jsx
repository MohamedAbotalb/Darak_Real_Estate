import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from '@mui/material';
import { fetchReviews } from 'store/userReviews/userReviewsSlice';
import { fetchAverageRatingAsync } from 'store/userReviews/averageRatingSlice';
import { useTranslation } from 'react-i18next';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import AverageRating from './AverageRating';

function ReviewSection({ propertyId, propertyTitle }) {
  const { property } = useSelector((state) => state.property);
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOpenForm = () => {
    setOpenForm(true);
    dispatch(fetchReviews(propertyId));
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const refreshAverageRating = () => {
    dispatch(fetchAverageRatingAsync(propertyId));
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenForm}
        sx={{
          mr: 2,
          mt: 2,
          height: '40px',
          backgroundColor: '#000',
          '&:hover': {
            backgroundColor: 'var(--primary-color)',
          },
        }}
      >
        {t('Reviews')}
      </Button>
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="md"
        PaperProps={{ style: { padding: '16px' } }}
      >
        <DialogTitle>
          {t('Add Review for')}{' '}
          <Typography component="span" color="primary">
            {propertyTitle}
          </Typography>
          <AverageRating propertyId={propertyId} />
        </DialogTitle>
        <DialogContent
          style={{
            padding: '8px',
            marginBottom: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <ReviewsList propertyId={propertyId} />
        </DialogContent>
        <DialogTitle
          style={{
            borderTop: '1px solid #c5c3c3',
          }}
        >
          <Box
            style={{
              padding: '2px',
            }}
          >
            <ReviewForm
              propertyId={propertyId}
              ownerId={property.user.id}
              onReviewAdded={refreshAverageRating}
            />
          </Box>
        </DialogTitle>
      </Dialog>
    </Box>
  );
}

ReviewSection.propTypes = {
  propertyId: PropTypes.number.isRequired,
  propertyTitle: PropTypes.string.isRequired,
};

export default ReviewSection;
