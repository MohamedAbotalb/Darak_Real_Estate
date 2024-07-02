import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { updateAmenity, fetchAmenities } from 'store/amenitiesSlice';
import AmenityModal from 'components/AdminDashboard/Amenities/AmenityModal';

function EditAmenityButton({ amenity }) {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data) => {
    try {
      dispatch(updateAmenity({ id: amenity.id, name: data.name }));
      dispatch(fetchAmenities());
      handleClose();
    } catch (error) {
      toast.error('Failed to update amenity.');
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ backgroundColor: '#1976d2', color: '#fff', mr: 1 }}
      >
        Edit
      </Button>
      <AmenityModal
        isOpen={isOpen}
        handleClose={handleClose}
        amenity={amenity}
        mode="edit"
        handleSubmit={handleSubmit}
      />
    </>
  );
}

EditAmenityButton.propTypes = {
  amenity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditAmenityButton;
