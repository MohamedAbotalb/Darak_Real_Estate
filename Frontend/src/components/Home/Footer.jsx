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

function Footer() {
  const handleSubscribe = () => {
    console.log('Subscribing...');
  };

  return (
    <Box
      className="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#2b3d4f',
        color: '#cdd0d8',
        '& .footer-content': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#cdd0d8',
        },
        '& .footer-links': {
          display: 'flex',
          gap: '10px',
          marginBottom: '10px',
          justifyContent: 'center',
          color: '#cdd0d8',
        },
        '& .subscription': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
        },
        '& .subscription-input': {
          flex: '1',
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#bdbdbd',
          },
        },
        '& .subscribe-button': {
          height: '40px',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1976d2',
          },
        },
        '& .footer-note': {
          marginTop: '20px',
          textAlign: 'center',
          color: '#fff',
        },
      }}
    >
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Box className="footer-content">
            <Typography variant="h6" gutterBottom>
              Real Estate
            </Typography>
            <Typography variant="body2" gutterBottom textAlign="left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nisi
              excepturi aliquam sint quod corrupti id obcaecati, consequuntur
              natus nulla impedit tempore sapiente ut eos dolore veritatis
              quaerat beatae animi.
            </Typography>
            <Box className="footer-links">
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
          <Box className="subscription">
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
      <Typography variant="body2" className="footer-note">
        All Rights Reserved © 2024 Real Estate
      </Typography>
    </Box>
  );
}

export default Footer;
