import React from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Grid,
  InputAdornment,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';
import './Footer.css';

function Footer() {
  const handleSubscribe = () => {
    // Add subscribe logic here
    console.log('Subscribing...');
  };

  return (
    <Box className="footer">
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Real Estate
            </Typography>
            <Typography variant="body2" gutterBottom textAlign="left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nisi
              excepturi aliquam sint quod corrupti id obcaecati, consequuntur
              natus nulla impedit tempore sapiente ut eos dolore veritatis
              quaerat beatae animi.
            </Typography>
            <Box display="flex" justifyContent="left" marginBottom={2}>
              <IconButton color="inherit" href="#">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box alignItems="center" justifyContent="center">
            <Typography variant="body2" gutterBottom>
              Register now to get updates on promotions.
            </Typography>
            <TextField
              label="Enter Email Address"
              variant="outlined"
              size="small"
              className="subscription-input"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      aria-label="subscribe"
                      onClick={handleSubscribe}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Typography
        variant="body2"
        className="footer-note"
        align="center"
        style={{ marginTop: '20px' }}
      >
        All Rights Reserved © 2024 Real Estate
      </Typography>
    </Box>
  );
}

export default Footer;
