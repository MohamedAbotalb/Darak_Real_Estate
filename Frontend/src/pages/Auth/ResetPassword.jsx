import React from 'react';
import { Grid, Container } from '@mui/material';
import ResetPasswordForm from 'components/Auth/ResetPasswordForm';

export default function ForgetPasswordPage() {
  return (
    <Container>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} md={6}>
          <ResetPasswordForm />
        </Grid>
      </Grid>
    </Container>
  );
}
