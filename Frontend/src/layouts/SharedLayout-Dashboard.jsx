import React from 'react';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar-Dashboard';
import Sidebar from './Sidebar';

export default function SharedLayout() {
  return (
    <div className="full-height">
      <NavBar />
      <Grid container spacing={2} className="full-height-grid">
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
}
