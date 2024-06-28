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
} from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import { clearState } from 'store/Auth/authSlice';
import { forgetPassword } from 'store/Auth/authActions';
import ForgetPasswordSchema from 'components/Auth/Validation/ForgetPasswordSchema';

function ForgetPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register: forgetPasswordForm,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
  });

  const { isLoading, error, successMessage, user } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    dispatch(forgetPassword(data));
  };

  useEffect(() => {
    if (user) navigate('/');
    if (error) {
      toast.error(error, { position: 'top-right' });
    }

    if (successMessage) {
      toast.success(successMessage, { position: 'top-right' });
      navigate('/login');
    }

    return () => {
      dispatch(clearState());
    };
  }, [error, successMessage, user, navigate, dispatch]);

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant="h4" sx={{ my: 4, textAlign: 'center' }} gutterBottom>
        Forget Your Password?
      </Typography>
      <Typography
        variant="p"
        component="p"
        sx={{ my: 4, textAlign: 'center' }}
        gutterBottom
      >
        Enter you email address we will send you a link to reset you password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <TextField
            label="Email"
            {...forgetPasswordForm('email')}
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
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Remembered your password?{' '}
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 'bold',
            }}
          >
            Login here
          </Link>
        </Typography>
      </form>
    </Container>
  );
}

export default ForgetPasswordForm;
