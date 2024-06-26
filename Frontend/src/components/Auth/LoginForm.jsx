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
import { login, clearState } from 'store/authSlice';
import useToggle from 'hooks/useToggle';
import LoginSchema from 'components/Auth/Validation/LoginSchema';
import SocialButtons from 'components/Auth/SocialButtons';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register: loginForm,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const { isLoading, error, successMessage, token, isAdmin, user } =
    useSelector((state) => state.auth);

  const [showPassword, toggleShowPassword] = useToggle(false);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (token) navigate('/');
    if (error) {
      toast.error(error, { position: 'top-right' });
    }

    if (successMessage) {
      toast.success(successMessage, { position: 'top-right' });
    }

    return () => {
      dispatch(clearState());
    };
  }, [error, successMessage, isAdmin, token, user, navigate, dispatch]);

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant="h4" sx={{ my: 4 }} gutterBottom>
        Log in
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
        <Typography variant="body2" sx={{ my: 3, fontSize: 15 }}>
          <Link
            to="/forget-password"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 'bold',
            }}
          >
            Forgot Password?
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
          Login
        </Button>
        <Typography sx={{ my: 3, textAlign: 'center', color: 'gray' }}>
          OR
        </Typography>
        <SocialButtons />
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 'bold',
            }}
          >
            Register here
          </Link>
        </Typography>
      </form>
    </Container>
  );
}

export default LoginForm;
