import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';

const RootContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '1200px',
  margin: '0 auto',
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
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: '15px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
  marginTop: theme.spacing(2),
  textTransform: 'none',
  fontWeight: 'bold',
  backgroundColor: 'transparent',
  color: '#000',
  boxShadow: 'none', // Ensuring no box shadow
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#000',
    boxShadow: 'none', // Ensuring no box shadow on hover
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '90%',
    height: '2px',
    backgroundColor: '#EE2027', // Setting underline color
    bottom: 0,
    left: 0,
    transform: 'scaleX(0)',
    transformOrigin: 'left', // Start animation from left
    transition: 'transform 0.3s ease',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
  },
}));

const textContent = {
  title: 'Discover What Sets Our Real Estate Expertise Apart',
  subtitle: 'At Homeya, our unwavering commitment lies in crafting unparalleled real estate journeys. Our seasoned professionals, armed with extensive market knowledge, walk alongside you through every phase of your property endeavor. We prioritize understanding your unique aspirations, tailoring our expertise to match your vision.',
  features: [
    'Transparent Partnerships',
    'Customized Solutions',
    'Proven Expertise',
    'Local Area Knowledge',
  ],
  buttonText: 'Contact Us',
};

const cardContent = [
  {
    title: 'Buy A New Home',
    description: 'Explore diverse properties and expert guidance .',
    image: 'buy-home.png',
  },
  {
    title: 'Rent A Home',
    description: 'Explore a diverse variety of listings tailored precisely .',
    image: 'rent-home.png',
  },
  {
    title: 'Sell A Home',
    description: "Showcasing your property's best features for a successful sale.",
    image: 'sell-home.png',
  },
];

const WhyChooseUs = () => {
  return (
    <RootContainer>
      <TextSection>
        <Typography variant="h6" color="#EE2027" gutterBottom>
          WHY CHOOSE US
        </Typography>
        <Typography variant="h4" gutterBottom>
          {textContent.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {textContent.subtitle}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {textContent.features.map((feature, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', flexBasis: '50%' }}>
              <CheckCircleIcon color="success" sx={{ marginRight: '8px' }} />
              <Typography variant="body1">
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>
        <CustomButton variant="contained" color="primary" endIcon={<ArrowForwardIcon/>}>
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
};

export default WhyChooseUs;
