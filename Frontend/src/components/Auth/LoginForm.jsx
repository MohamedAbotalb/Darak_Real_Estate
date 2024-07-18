import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next'; // Import useTranslation

function LoginForm() {
  const { t } = useTranslation(); // Initialize useTranslation hook
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

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
    if (error) {
      toast.error(error, { position: 'top-right' });
    }

    if (successMessage) {
      toast.success(successMessage, { position: 'top-right' });
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }

    return () => {
      dispatch(clearState());
    };
  }, [error, successMessage, user, navigate, dispatch]);

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
              color: '#1976d2',
              fontWeight: 'bold',
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
          sx={{ height: 40 }}
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
              color: '#1976d2',
              fontWeight: 'bold',
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
