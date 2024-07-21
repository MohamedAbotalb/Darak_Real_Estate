import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

function DeleteDialog({ isOpen, onClose, onDelete, clearConfirmationText }) {
  const { t } = useTranslation();
  const [confirmationText, setConfirmationText] = useState('');

  const handleInputChange = (event) => {
    setConfirmationText(event.target.value);
  };

  const isDeleteConfirmed = confirmationText === 'DELETE';

  const handleClose = () => {
    setConfirmationText('');
    clearConfirmationText();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {t('Confirm Account Deletion')}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('Are you sure you want to delete your account?')}
        </DialogContentText>
        <DialogContentText>
          {t('Please type "DELETE" to confirm.')}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          value={confirmationText}
          onChange={handleInputChange}
          label={t('Confirmation')}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="primary">
          {t('Cancel')}
        </Button>
        <Button
          onClick={onDelete}
          color="error"
          variant="contained"
          disabled={!isDeleteConfirmed}
        >
          {t('Delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  clearConfirmationText: PropTypes.func.isRequired,
};

export default DeleteDialog;
