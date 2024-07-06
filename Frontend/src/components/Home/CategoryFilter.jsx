// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Button, ButtonGroup } from '@mui/material';
// import { styled } from '@mui/system';

// const CustomButton = styled(Button)(({ active }) => ({
//   backgroundColor: active ? '#1976d2' : '#fff',
//   color: active ? '#fff' : '#1976d2',
//   borderRadius: '0',
//   textTransform: 'none',
//   '&:hover': {
//     backgroundColor: active ? '#115293' : '#e0e0e0',
//   },
//   flex: 1,
//   margin: '0',
//   padding: '10px 30px',
//   lineHeight: '1.5',
//   zIndex: 1,
//   minWidth: '120px',
// }));

// const CustomButtonGroup = styled(ButtonGroup)({
//   display: 'flex',
//   justifyContent: 'center',
//   marginBottom: '20px',
//   borderRadius: '8px',
//   overflow: 'hidden',
//   border: '1px solid #1976d2',
//   padding: '0',
// });

// const Container = styled('div')({
//   display: 'flex',
//   justifyContent: 'center',
// });

// function CategoryFilter({ categories, setCategory, initialCategory }) {
//   const [activeCategory, setActiveCategory] = useState(1);

//   useEffect(() => {
//     if (initialCategory !== undefined && initialCategory !== null) {
//       setActiveCategory(initialCategory);
//     } else {
//       setActiveCategory(1);
//     }
//   }, [initialCategory]);

//   const handleCategoryClick = (categoryId) => {
//     setActiveCategory(categoryId);
//     setCategory(categoryId);
//   };

//   return (
//     <Container>
//       <CustomButtonGroup
//         variant="contained"
//         aria-label="outlined primary button group"
//       >
//         {categories.map((category) => (
//           <CustomButton
//             key={category.id}
//             onClick={() => handleCategoryClick(category.id)}
//             active={activeCategory === category.id ? 1 : 0}
//           >
//             {category.name}
//           </CustomButton>
//         ))}
//       </CustomButtonGroup>
//     </Container>
//   );
// }

// CategoryFilter.propTypes = {
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   setCategory: PropTypes.func.isRequired,
//   initialCategory: PropTypes.number,
// };

// CategoryFilter.defaultProps = {
//   initialCategory: 1,
// };
// export default CategoryFilter;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ active }) => ({
  backgroundColor: active ? '#1976d2' : '#fff',
  color: active ? '#fff' : '#1976d2',
  borderRadius: '0',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: active ? '#115293' : '#e0e0e0',
  },
  flex: 1,
  margin: '0',
  padding: '10px 30px',
  lineHeight: '1.5',
  zIndex: 1,
  minWidth: '120px',
}));

const CustomButtonGroup = styled(ButtonGroup)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid #1976d2',
  padding: '0',
});

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

function CategoryFilter({ categories, setCategory, initialCategory }) {
  const [activeCategory, setActiveCategory] = useState(1);

  useEffect(() => {
    if (initialCategory !== undefined && initialCategory !== null) {
      setActiveCategory(initialCategory);
    } else {
      setActiveCategory(1);
    }
  }, [initialCategory]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setCategory(categoryId);
  };

  return (
    <Container>
      <CustomButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {categories.map((category) => (
          <CustomButton
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            active={activeCategory === category.id ? 1 : 0}
          >
            {category.name}
          </CustomButton>
        ))}
      </CustomButtonGroup>
    </Container>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCategory: PropTypes.func.isRequired,
  initialCategory: PropTypes.number,
};

CategoryFilter.defaultProps = {
  initialCategory: 1,
};
export default CategoryFilter;
