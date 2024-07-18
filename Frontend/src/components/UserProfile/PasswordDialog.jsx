import React, { useState } from 'react';
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
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';

function PasswordDialog({
  isOpen,
  onClose,
  currentPassword,
  newPassword,
  confirmPassword,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  onSave,
  errors,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {t('Change password')}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t('Current password')}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={Boolean(errors.currentPassword)}
          helperText={errors.currentPassword}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="dense"
          label={t('New password')}
          type={showNewPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={Boolean(errors.newPassword)}
          helperText={errors.newPassword}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <DialogContentText sx={{ mb: 2 }}>
          {t('At least 8 characters')} <br />
          {t('Mix of letters and numbers')} <br />
          {t('Contains a special character')} <br />
          {t('Mix of uppercase and lowercase letters')}
        </DialogContentText>
        <TextField
          margin="dense"
          label={t('Confirm password')}
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          sx={{ backgroundColor: '#1E88E5' }}
        >
          {t('Apply')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PasswordDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setCurrentPassword: PropTypes.func.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    currentPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
  }).isRequired,
};

export default PasswordDialog;
