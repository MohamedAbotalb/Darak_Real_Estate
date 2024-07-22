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
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(i18n.language);
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
        fontSize: '18px',
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
                {t('Real Estate')}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t(
                  'Our website offers a comprehensive platform for property listings, providing users with a seamless experience to find their desired homes and properties.'
                )}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  gap: '10px',
                  marginTop: '10px',
                }}
              >
                <IconButton color="inherit" href="#" sx={{ padding: '8px 0' }}>
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
                {t('Register now to get updates or promotions.')}
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
                  label={t('Enter Email Address')}
                  variant="outlined"
                  size="small"
                  className="subscription-input"
                  InputProps={{
                    style: { color: 'white' },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{
                          marginLeft: dir === 'rtl' ? '500%' : '0',
                        }}
                      >
                        <IconButton
                          color="primary"
                          aria-label="subscribe"
                          onClick={handleSubscribe}
                        >
                          <SendIcon sx={{ color: 'var(--primary-color)' }} />
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
          {t('All Rights Reserved © {{year}} Real Estate', {
            year: getCurrentYear(),
          })}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
