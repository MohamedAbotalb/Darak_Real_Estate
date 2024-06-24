import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from '../../axiosConfig';
import PropertyTypeModal from './PropertyTypeModal';
import { fetchPropertyTypes } from '../../store/propertyTypesSlice';
import 'react-toastify/dist/ReactToastify.css';

function EditPropertyTypeButton({ type }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data) => {
    try {
      await axios.put(`/property-types/${type.slug}`, data);
      dispatch(fetchPropertyTypes());
      toast.success('Property type updated successfully!');
      handleClose();
    } catch (error) {
      toast.error('Failed to update property type.');
      console.error('Failed to update property type:', error);
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
      <PropertyTypeModal
        open={open}
        handleClose={handleClose}
        type={type}
        mode="edit"
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default EditPropertyTypeButton;
