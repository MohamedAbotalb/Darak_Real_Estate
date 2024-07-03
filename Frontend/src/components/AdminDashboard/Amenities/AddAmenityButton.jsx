import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { addAmenity, fetchAmenities } from 'store/amenitiesSlice';
import AmenityModal from 'components/AdminDashboard/Amenities/AmenityModal';

function AddAmenityButton() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data) => {
    try {
      await dispatch(addAmenity(data));
      await dispatch(fetchAmenities());
      handleClose();
    } catch (error) {
      toast.error('Failed to add amenity.');
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          borderColor: '#2196f3',
          color: '#2196f3',
          mt: 2,
          mb: 2,
          '&:hover': {
            backgroundColor: '#e3f2fd',
            borderColor: '#2196f3',
          },
        }}
      >
        Add New Type
      </Button>
      <AmenityModal
        isOpen={isOpen}
        handleClose={handleClose}
        mode="add"
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default AddAmenityButton;
