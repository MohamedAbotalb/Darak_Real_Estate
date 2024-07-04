import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

function DeleteConfirmationModal({ item, isOpen, handleClose, handleConfirm }) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {item}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteConfirmationModal.propTypes = {
  item: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
