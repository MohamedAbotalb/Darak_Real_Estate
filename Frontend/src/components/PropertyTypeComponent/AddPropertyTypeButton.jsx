import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { fetchPropertyTypes } from 'store/propertyTypesSlice';
import axios from '../../axiosConfig';
import PropertyTypeModal from './PropertyTypeModal';

function AddPropertyTypeButton() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data) => {
    try {
      await axios.post('/property-types', data);
      dispatch(fetchPropertyTypes());
      toast.success('Property type added successfully!');
      handleClose();
    } catch (error) {
      toast.error('Failed to add property type.');
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
      <PropertyTypeModal
        isOpen={isOpen}
        handleClose={handleClose}
        mode="add"
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default AddPropertyTypeButton;
