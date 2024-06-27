import React from 'react';
import { Grid, Container } from '@mui/material';
import ForgetPasswordForm from 'components/Auth/ForgetPasswordForm';

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
          <ForgetPasswordForm />
        </Grid>
      </Grid>
    </Container>
  );
}
