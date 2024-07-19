/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

const RootContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '1200px',
  margin: '40px auto 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

const TextSection = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingRight: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    paddingRight: 0,
    marginBottom: theme.spacing(4),
  },
}));

const CardSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const CustomCard = styled(Card)(({ theme }) => ({
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: '15px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '15px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const CustomCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(0),
  flex: '1 0 auto',
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  hyphens: 'auto',
  [theme.breakpoints.down('md')]: {
    padding: 0,
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  '& img': {
    width: '50px',
  },
  [theme.breakpoints.down('md')]: {
    marginRight: 0,
    marginBottom: theme.spacing(2),
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  padding: '6px',
  textTransform: 'none',
  fontWeight: 'bold',
  backgroundColor: 'transparent',
  color: '#000',
  boxShadow: 'none',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '0',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#000',
    boxShadow: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '2px',
    backgroundColor: '#ed2128',
    bottom: 0,
    left: 0,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
  },
}));

function WhyChooseUs() {
  const { t } = useTranslation();
  const textContent = {
    title: t('Discover What Sets Our Real Estate Expertise Apart'),
    subtitle: t(
      'At Homeya, our unwavering commitment lies in crafting unparalleled real estate journeys. Our seasoned professionals, armed with extensive market knowledge, walk alongside you through every phase of your property endeavor. We prioritize understanding your unique aspirations, tailoring our expertise to match your vision.'
    ),
    features: [
      t('Transparent Partnerships'),
      t('Customized Solutions'),
      t('Proven Expertise'),
      t('Local Area Knowledge'),
    ],
    buttonText: t('Contact Us'),
  };

  const cardContent = [
    {
      title: t('Buy A New Home'),
      description: t('Explore diverse properties and expert guidance .'),
      image: 'buy-home.png',
    },
    {
      title: t('Rent A Home'),
      description: t(
        'Explore a diverse variety of listings tailored precisely .'
      ),
      image: 'rent-home.png',
    },
    {
      title: t('Sell A Home'),
      description: t(
        "Showcasing your property's best features for a successful sale."
      ),
      image: 'sell-home.png',
    },
  ];

  return (
    <RootContainer>
      <TextSection>
        <Typography variant="h6" color="#ed2128" gutterBottom>
          {t('WHY CHOOSE US')}
        </Typography>
        <Typography variant="h4" gutterBottom color="#000">
          {textContent.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {textContent.subtitle}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {textContent.features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexBasis: '50%',
                marginBottom: '20px',
              }}
            >
              <CheckCircleIcon sx={{ marginRight: '8px', color: '#178551' }} />
              <Typography fontWeight="bold" fontSize="12px">
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>
        <CustomButton
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          {textContent.buttonText}
        </CustomButton>
      </TextSection>

      <CardSection>
        {cardContent.map((card, index) => (
          <CustomCard key={index}>
            <IconContainer>
              <img src={card.image} alt={card.title} />
            </IconContainer>
            <CustomCardContent>
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body2" paragraph>
                {card.description}
              </Typography>
            </CustomCardContent>
          </CustomCard>
        ))}
      </CardSection>
    </RootContainer>
  );
}

export default WhyChooseUs;
