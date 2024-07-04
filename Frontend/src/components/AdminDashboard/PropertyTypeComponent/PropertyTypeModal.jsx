import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define the validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Property type name should be more than 2 characters'),
});

function PropertyTypeModal({ isOpen, handleClose, type, mode, handleSubmit }) {
  const {
    control,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '' },
  });

  useEffect(() => {
    if (type) {
      reset({ name: type.name });
    } else {
      reset({ name: '' });
    }
  }, [type, reset]);

  const onSubmit = (data) => {
    handleSubmit(data);
    reset({ name: '' });
    handleClose();
  };

  const handleModalClose = () => {
    reset({ name: '' });
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleModalClose}>
      <Box
        sx={{
          width: 400,
          p: 4,
          margin: 'auto',
          mt: '10%',
          bgcolor: 'background.paper',
          position: 'relative',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 30,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          {mode === 'edit' ? 'Edit Property Type' : 'Add New Property Type'}
        </Typography>
        <form onSubmit={handleFormSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {mode === 'edit' ? 'Update' : 'Add'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

PropertyTypeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  type: PropTypes.shape({ name: PropTypes.string }),
  mode: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

PropertyTypeModal.defaultProps = {
  type: { name: '' },
};

export default PropertyTypeModal;
