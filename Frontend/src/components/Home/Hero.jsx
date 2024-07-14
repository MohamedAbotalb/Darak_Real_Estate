// import React from 'react';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Box, Typography } from '@mui/material';
// import PropertySearch from 'components/Home/PropertySearch';
// import { Carousel } from 'react-responsive-carousel';

// function Hero() {
//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         height: '75vh',
//         overflow: 'hidden',
//       }}
//     >
//       <Carousel
//         autoPlay
//         infiniteLoop
//         showArrows={false}
//         showThumbs={false}
//         showStatus={false}
//         showIndicators={false}
//         interval={3000}
//         transitionTime={500}
//       >
//         <div>
//           <Box
//             sx={{
//               height: '75vh',
//               backgroundImage:
//                 'url(hero1.jpg)',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           />
//         </div>
//       </Carousel>
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           color: '#fff',
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         }}
//       >
//         {/* <Typography variant="h2" component="h1">
//           Welcome to RentEZ
//         </Typography>
//         <Typography variant="body1" component="p" sx={{ mb: 3 }}>
//           Your ultimate destination for finding rental properties.
//         </Typography> */}
//         <PropertySearch sx={{marginTop:'300px'}}/>
//       </Box>
//     </Box>
//   );
// }

// export default Hero;


import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box } from '@mui/material';
import PropertySearch from 'components/Home/PropertySearch';
import { Carousel } from 'react-responsive-carousel';

function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '75vh',
        overflow: 'hidden',
      }}
    >
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={3000}
        transitionTime={500}
      >
        <div>
          <Box
            sx={{
              height: '75vh',
              width: '100vw',
              backgroundImage: 'url(hero1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div>
          <Box
            sx={{
              height: '75vh',
              width: '100vw',
              backgroundImage: 'url(hero2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div>
          <Box
            sx={{
              height: '75vh',
              width: '100vw',
              backgroundImage: 'url(hero3.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </Carousel>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <PropertySearch sx={{ marginTop: '300px' }} />
      </Box>
    </Box>
  );
}

export default Hero;
