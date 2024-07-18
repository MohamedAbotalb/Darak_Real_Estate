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

function AvatarDialog({ isOpen, onClose, onChange }) {
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
        {t('Edit Avatar')}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t('Upload a new avatar image.')}</DialogContentText>
        <Button variant="contained" component="label" sx={{ mt: 1 }}>
          {t('Choose File')}
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            style={{ display: 'none' }}
          />
        </Button>
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
          {t('Cancel')}
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
          {t('Apply')}
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
