import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box,Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import { fetchReviews } from 'store/userReviews/userReviewsSlice';

const ReviewSection = ({ propertyId, propertyTitle}) => {
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
      {/* <IconButton onClick={handleOpenForm}>
        <AddCircleOutline /> */}
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
      {/* </IconButton> */}
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
        </DialogTitle>
        <DialogContent style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ReviewsList propertyId={propertyId} />
        </DialogContent>
        <DialogTitle style={{ padding: '2px', borderTop: '2px solid #5d5c5c', borderRadius: '2px' }}>
          <ReviewForm propertyId={propertyId}  />
        </DialogTitle>
        <DialogActions>
          {/* Optional: Add actions or buttons for the dialog */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewSection;
