import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { successToast, errorToast } from 'utils/toast';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { clearState } from 'store/Auth/authSlice';
import { login } from 'store/Auth/authActions';
import useToggle from 'hooks/useToggle';
import LoginSchema from 'components/Auth/Validation/LoginSchema';

function AdminLoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register: loginForm,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const { isLoading, error, successMessage, user } = useSelector(
    (state) => state.auth
  );

  const [showPassword, toggleShowPassword] = useToggle(false);

  const handleUnauthorizedAccess = useCallback(() => {
    errorToast('Unauthorized access.');
    dispatch(clearState());
    navigate('/403');
  }, [dispatch, navigate]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (user) {
      if (user.role !== 'admin') {
        handleUnauthorizedAccess();
      } else {
        successToast('Welcome back to Admin Dashboard');
        navigate('/admin/overview');
      }
    }
    if (error) {
      errorToast(error);
    }

    return () => {
      dispatch(clearState());
    };
  }, [
    error,
    successMessage,
    user,
    navigate,
    dispatch,
    handleUnauthorizedAccess,
  ]);

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant="h4" sx={{ my: 4 }} gutterBottom>
        Admin Log in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <TextField
            label="Email"
            {...loginForm('email')}
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            {...loginForm('password')}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ height: 40 }}
          disabled={isLoading}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default AdminLoginForm;
