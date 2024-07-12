import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { updateAmenity } from 'store/amenitiesSlice';
import { successToast } from 'utils/toast';
import AmenityModal from 'components/AdminDashboard/Amenities/AmenityModal';

function EditAmenityButton({ amenity }) {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data) => {
    dispatch(updateAmenity({ slug: amenity.slug, data }));
    handleClose();
    successToast('Amenity updated successfully');
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
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditAmenityButton;
