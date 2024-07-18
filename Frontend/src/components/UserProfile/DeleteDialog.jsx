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
import { useTranslation } from 'react-i18next';

function DeleteDialog({ isOpen, onClose, onDelete }) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {t('Confirm Account Deletion')}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('Are you sure you want to delete your account?')}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={onClose} color="primary">
          {t('Cancel')}
        </Button>
        <Button onClick={onDelete} color="error" variant="contained">
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
};

export default DeleteDialog;
