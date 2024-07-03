import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { editPropertyType, fetchPropertyTypes } from 'store/propertyTypesSlice';
import PropertyTypeModal from 'components/AdminDashboard/PropertyTypeComponent/PropertyTypeModal';

function EditPropertyTypeButton({ type }) {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data) => {
    dispatch(editPropertyType({ slug: type.slug, data }));
    dispatch(fetchPropertyTypes());
    handleClose();
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
        isOpen={isOpen}
        handleClose={handleClose}
        type={type}
        mode="edit"
        handleSubmit={handleSubmit}
      />
    </>
  );
}

EditPropertyTypeButton.propTypes = {
  type: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditPropertyTypeButton;
