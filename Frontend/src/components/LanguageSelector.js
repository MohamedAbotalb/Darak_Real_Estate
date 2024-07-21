import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  MenuItem,
  IconButton,
  Box,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import GlobeAltIcon from '@mui/icons-material/Public';
import Flag from 'react-world-flags';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  const flagIconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="language menu"
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{
          margin: '0 10px',
          textTransform: 'none',
          backgroundColor: 'transparent',
        }}
      >
        <GlobeAltIcon sx={{ color: '#000' }} />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleLanguageChange('en')}>
          <ListItemIcon>
            <Flag code="GB" style={flagIconStyle} />
          </ListItemIcon>
          <ListItemText primary="English" />
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('ar')}>
          <ListItemIcon>
            <Flag code="EG" style={flagIconStyle} />
          </ListItemIcon>
          <ListItemText primary="العربية" />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default LanguageSelector;
