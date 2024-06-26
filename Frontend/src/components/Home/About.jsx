import React from 'react';
import { Typography, Button } from '@mui/material';

function About() {
  return (
    <div className="about-section">
      <Typography variant="h5" gutterBottom>
        About us
      </Typography>
      <Typography variant="body1" paragraph>
        Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam
        cupidatat ullamco ullamco et. Aliqua tempor do consectetur reprehenderit
        Lorem aliqua commodo occaecat deserunt. Do eiusmod incididunt.
      </Typography>
      <Button variant="contained" color="primary">
        Learn more
      </Button>
    </div>
  );
}

export default About;
