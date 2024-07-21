import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { errorToast, successToast } from 'utils/toast';
import { clearState } from 'store/Auth/authSlice';
import { login } from 'store/Auth/authActions';
import useToggle from 'hooks/useToggle';
import LoginSchema from 'components/Auth/Validation/LoginSchema';

function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
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
    navigate('/admin-login');
  }, [dispatch, navigate]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        handleUnauthorizedAccess();
      } else {
        successToast(successMessage);
        navigate(location?.state?.prevUrl ?? '/');
      }
    }
    if (error) errorToast(error);

    return () => {
      dispatch(clearState());
    };
  }, [
    error,
    successMessage,
    user,
    navigate,
    dispatch,
    location,
    handleUnauthorizedAccess,
  ]);

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant="h4" sx={{ my: 4 }} gutterBottom>
        {t('Log in')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <TextField
            label={t('Email')}
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
            label={t('Password')}
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
        <Typography variant="body2" sx={{ my: 3, fontSize: 15 }}>
          <Link
            to="/forget-password"
            style={{
              textDecoration: 'none',
              color: '#000',
              fontWeight: 'bold',
            }}
            sx={{
              '&:hover': {
                color: 'var(--primary-color)',
              },
            }}
          >
            {t('Forgot Password?')}
          </Link>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            height: 40,
            backgroundColor: '#000',
            '&:hover': {
              backgroundColor: 'var(--primary-color)',
            },
          }}
          disabled={isLoading}
        >
          {t('login')}
        </Button>
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          {t("Don't have an account?")}{' '}
          <Link
            to="/register"
            style={{
              textDecoration: 'none',
              color: '#000',
              fontWeight: 'bold',
            }}
            sx={{
              '&:hover': {
                color: 'var(--primary-color)',
              },
            }}
          >
            {t('Register here')}
          </Link>
        </Typography>
      </form>
    </Container>
  );
}

export default LoginForm;
