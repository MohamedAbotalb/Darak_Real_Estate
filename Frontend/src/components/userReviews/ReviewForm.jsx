import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addReviewAsync,
  fetchReviews,
} from 'store/userReviews/userReviewsSlice';
import { TextField, Button, Box, Rating } from '@mui/material';

function ReviewForm({ propertyId }) {
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addReviewAsync({ property_id: propertyId, rate, content }));
    setRate(0);
    setContent('');
    dispatch(fetchReviews(propertyId));
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {/* <Avatar src={user.avatar} alt="User Profile" /> */}
      <Box flex={1} gap={2}>
        <Rating
          name="rate"
          value={rate}
          onChange={(event, newValue) => setRate(newValue)}
        />
        <TextField
          label="Review"
          multiline
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Review
        </Button>
      </Box>
    </Box>
  );
}
ReviewForm.propTypes = {
  propertyId: PropTypes.number.isRequired,
};
export default ReviewForm;
