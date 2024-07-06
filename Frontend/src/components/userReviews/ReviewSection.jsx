import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { fetchReviews } from 'store/userReviews/userReviewsSlice';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import AverageRating from './AverageRating';

function ReviewSection({ propertyId, propertyTitle }) {
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();

  const handleOpenForm = () => {
    setOpenForm(true);
    dispatch(fetchReviews(propertyId));
  };

  const handleCloseForm = () => {
    setOpenForm(false);
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
        }}
      >
        Add Review
      </Button>
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="md"
        PaperProps={{ style: { padding: '16px' } }}
      >
        <DialogTitle>
          Add Review for{' '}
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
            <ReviewForm propertyId={propertyId} />
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
