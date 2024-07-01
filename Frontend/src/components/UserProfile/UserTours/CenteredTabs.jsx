import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import DeclinedTours from './DeclinedTours';
import PendingTours from './PendingTours';
import ApprovedTours from './ApprovedTours';

function CenteredTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Declined Tours" />
        <Tab label="Pending Tours" />
        <Tab label="Approved Tours" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DeclinedTours />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PendingTours />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ApprovedTours />
      </TabPanel>
    </Box>
  );
}

export default CenteredTabs;
