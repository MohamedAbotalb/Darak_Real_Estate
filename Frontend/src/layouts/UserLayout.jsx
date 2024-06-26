import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import Header from 'components/Home/Header';
import Footer from 'components/Home/Footer';

export default function UserLayout() {
  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
