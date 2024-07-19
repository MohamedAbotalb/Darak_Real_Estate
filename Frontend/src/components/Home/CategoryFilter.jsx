import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, ButtonBase, Container } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import { fetchCategories } from 'store/home/categoriesSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import StudioIcon from '@mui/icons-material/Business';
import OfficeIcon from '@mui/icons-material/Work';
import TownhouseIcon from '@mui/icons-material/Home';
import CommercialIcon from '@mui/icons-material/Domain';
import { useTranslation } from 'react-i18next';

const iconMapping = {
  Apartment: <ApartmentIcon style={{ fontSize: 80 }} />,
  Villa: <VillaIcon style={{ fontSize: 80 }} />,
  Studio: <StudioIcon style={{ fontSize: 80 }} />,
  Office: <OfficeIcon style={{ fontSize: 80 }} />,
  House: <TownhouseIcon style={{ fontSize: 80 }} />,
  Commercial: <CommercialIcon style={{ fontSize: 80 }} />,
};

const StyledButton = styled(ButtonBase)(({ theme, active }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: active ? '#ed2128' : '#f7f7f7',
  color: active ? '#fff' : '#000',
  padding: theme.spacing(0.5),
  margin: theme.spacing(1),
  transition: 'background-color 0.3s, color 0.3s',
  width: '200px',
  height: '200px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#ed2128',
    color: '#fff',
  },
  textAlign: 'center',
  boxSizing: 'border-box',
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  width: '100%',
  '.slick-slide': {
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '0 10px',
  },
  '.slick-list': {
    margin: '0 -10px',
    overflow: 'hidden',
  },
  '& .slick-prev, & .slick-next': {
    zIndex: 1,
    backgroundColor: 'transparent',
    borderRadius: '10px',
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .slick-prev:before, & .slick-next:before': {
    color: '#ed2128',
    fontSize: '35px',
  },
}));

const ArrowWrapper = styled(Box)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  '&.prev': {
    left: '-5px',
    zIndex: 1,
  },
  '&.next': {
    right: '-5px',
    zIndex: 1,
  },
});

const ViewAllLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: '#000000',
  fontSize: '18px',
  fontWeight: 'bold',
  '&:hover': {
    color: '#000000',
  },
  '&::after': {
    content: '""',
    display: 'block',
    width: '0',
    height: '2px',
    background: '#ed2128',
    transition: 'width 0.3s',
  },
  '&:hover::after': {
    width: '100%',
  },
}));

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <ArrowWrapper className="next" onClick={onClick}>
      <div className="slick-next" />
    </ArrowWrapper>
  );
}

SampleNextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <ArrowWrapper className="prev" onClick={onClick}>
      <div className="slick-prev" />
    </ArrowWrapper>
  );
}

SamplePrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function CategoryFilter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.list);
  const status = useSelector((state) => state.categories.status);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleCategoryClick = (categoryType) => {
    setActiveCategory(categoryType);
    navigate(`/properties?pt=${categoryType}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: categories.length < 5 ? categories.length : 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: categories.length < 3 ? categories.length : 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: categories.length < 2 ? categories.length : 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
        mt={6}
      >
        <Typography
          sx={{ fontSize: '16px', fontWeight: 'bold' }}
          color="#ed2128"
        >
          {t('PROPERTY TYPE')}
        </Typography>
      </Box>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">{t('Try Searching For')}</Typography>
        <ViewAllLink href="/all-services">
          {t('View All Services')} →
        </ViewAllLink>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <StyledSlider {...settings}>
          {categories.map((category) => (
            <div key={category.id}>
              <StyledButton
                onClick={() => handleCategoryClick(category.id)}
                active={activeCategory === category.name ? 1 : 0}
              >
                {iconMapping[category.name] || <ApartmentIcon />}
                <Typography variant="h6">{category.name}</Typography>
                <Typography variant="body2">
                  {category.properties.length} {t('Properties')}
                </Typography>
              </StyledButton>
            </div>
          ))}
        </StyledSlider>
      </Box>
    </Container>
  );
}

export default CategoryFilter;
