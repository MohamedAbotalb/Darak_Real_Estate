import React from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Grid,
  InputAdornment,
  Container,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';

function Footer() {
  const handleSubscribe = () => {};

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Box
      className="footer"
      sx={{
        backgroundColor: '#101011',
        color: '#fff',
        fontSize:'18px',
        padding: '20px',
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            textAlign: { xs: 'center', sm: 'initial' },
          }}
        >
          {/* Social Icons Section */}
          <Grid item xs={12} sm={6}>
            <Box className="footer-content">
              <Typography variant="h6" gutterBottom>
                Real Estate
              </Typography>
              <Typography variant="body2" gutterBottom>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                nisi excepturi aliquam sint quod corrupti id obcaecati,
                consequuntur natus nulla impedit tempore sapiente ut eos dolore
                veritatis quaerat beatae animi.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  gap: '10px',
                  marginTop: '10px',
                }}
              >
                <IconButton color="inherit" href="#" sx={{ padding:'8px 0'}}>
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

          {/* Subscription Section */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', sm: 'flex-end' },
              }}
            >
              <Typography variant="body2" gutterBottom>
                Register now to get updates or promotions.
              </Typography>
              <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px',
      }}
    >
      <TextField
        label="Enter Email Address"
        variant="outlined"
        size="small"
        className="subscription-input"
        InputProps={{
          style: { color: 'white' },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                aria-label="subscribe"
                onClick={handleSubscribe}
              >
                <SendIcon sx={{ color: '#ed2128' }} />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'white', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Border color when focused
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white', // Default border color
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white', // Border color on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#000', // Border color when focused
            },
          },
        }}
        InputLabelProps={{
          style: { color: 'white' },
        }}
      />
    </Box>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          sx={{ marginTop: '20px', textAlign: 'center' }}
        >
          All Rights Reserved © {getCurrentYear()} Real Estate
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
