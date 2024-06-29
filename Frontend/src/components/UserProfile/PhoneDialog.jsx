import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  DialogContentText,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function PhoneDialog({ isOpen, onClose, phone, setPhone, onSave }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Edit phone number
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Edit your phone number below.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Phone number"
          type="text"
          fullWidth
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={onSave}
          color="primary"
          variant="contained"
          sx={{ backgroundColor: '#70B5F9' }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PhoneDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  setPhone: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PhoneDialog;
