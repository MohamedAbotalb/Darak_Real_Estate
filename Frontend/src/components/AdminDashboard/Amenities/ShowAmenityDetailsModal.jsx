import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAmenities } from 'store/amenitiesSlice';

function ShowAmenityDetailsModal({ amenitySlug, isOpen, handleClose }) {
  const dispatch = useDispatch();
  const amenity = useSelector((state) =>
    state.amenities.amenities.find((a) => a.slug === amenitySlug)
  );

  useEffect(() => {
    if (isOpen && amenitySlug) {
      dispatch(fetchAmenities());
    }
  }, [dispatch, isOpen, amenitySlug]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          width: '50%',
          p: 4,
          margin: 'auto',
          mt: '5%',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Amenity Details
        </Typography>
        {amenity ? (
          <Typography variant="body1" gutterBottom>
            Name: {amenity.name}
          </Typography>
        ) : (
          <Typography variant="body2">Loading...</Typography>
        )}
      </Box>
    </Modal>
  );
}

ShowAmenityDetailsModal.propTypes = {
  amenitySlug: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ShowAmenityDetailsModal;
