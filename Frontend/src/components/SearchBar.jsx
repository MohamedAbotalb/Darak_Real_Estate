import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

function SearchBar() {
  return (
    <div className="search-bar">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <TextField label="Rent, Buy" variant="outlined" fullWidth select>
            {/* Options here */}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Location" variant="outlined" fullWidth select>
            {/* Options here */}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Property Type" variant="outlined" fullWidth select>
            {/* Options here */}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" color="primary" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchBar;
