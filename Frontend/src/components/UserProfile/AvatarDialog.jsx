import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AvatarDialog({ isOpen, onClose, onChange }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Edit Avatar
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Upload a new avatar image.</DialogContentText>
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          style={{ marginTop: '16px' }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#0185B7',
            borderColor: '#0185B7',
            '&:hover': {
              borderColor: '#0185B7',
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: '#0185B7',
            '&:hover': {
              backgroundColor: '#016a92',
            },
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AvatarDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AvatarDialog;
