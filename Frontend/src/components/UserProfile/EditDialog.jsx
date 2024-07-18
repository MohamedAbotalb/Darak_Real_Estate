import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

function EditDialog({
  isOpen,
  onClose,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  onSave,
  errors,
}) {
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
        {t('Edit name')}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t('First Name')}
          type="text"
          fullWidth
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label={t('Last Name')}
          type="text"
          fullWidth
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={onClose} color="primary">
          {t('Cancel')}
        </Button>
        <Button
          onClick={onSave}
          color="primary"
          variant="contained"
          sx={{ backgroundColor: '#70B5F9' }}
        >
          {t('Apply')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

export default EditDialog;
