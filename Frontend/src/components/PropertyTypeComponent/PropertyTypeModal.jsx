import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

function PropertyTypeModal({ open, handleClose, type, mode, handleSubmit }) {
  const [formData, setFormData] = React.useState({
    name: type ? type.name : '',
    description: type ? type.description : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          p: 4,
          margin: 'auto',
          mt: '10%',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" gutterBottom>
          {mode === 'edit' ? 'Edit Property Type' : 'Add New Property Type'}
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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

export default PropertyTypeModal;
