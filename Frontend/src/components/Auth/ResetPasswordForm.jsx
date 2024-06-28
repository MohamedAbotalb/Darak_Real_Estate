import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { clearState } from 'store/Auth/authSlice';
import { resetPassword } from 'store/Auth/authActions';
import useToggle from 'hooks/useToggle';
import ResetPasswordSchema from 'components/Auth/Validation/ResetPasswordSchema';

function ResetPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const { isLoading, error, user, successMessage } = useSelector(
    (state) => state.auth
  );

  const [showPassword, toggleShowPassword] = useToggle(false);
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false);

  useEffect(() => {
    if (user) navigate('/');
    if (error) toast.error(error, { position: 'top-right' });
    if (successMessage) {
      toast.success(successMessage, { position: 'top-right' });
      navigate('/login');
    }
    return () => {
      dispatch(clearState());
    };
  }, [error, successMessage, user, navigate, dispatch]);

  const onSubmit = (data) => {
    const formData = {
      token,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    };
    dispatch(resetPassword(formData));
  };

  return (
    <Container sx={{ my: 10 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }} gutterBottom>
        Reset Your Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <TextField
            label="Password"
            {...register('password')}
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
        <Box mb={2}>
          <TextField
            label="Confirm Password"
            {...register('passwordConfirmation')}
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default ResetPasswordForm;
