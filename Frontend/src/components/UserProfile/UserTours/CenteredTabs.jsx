import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToursByStatus } from 'store/tourSlice';
import { useTranslation } from 'react-i18next';
import TabPanel from './TabPanel';
import DeclinedTours from './DeclinedTours';
import PendingTours from './PendingTours';
import ApprovedTours from './ApprovedTours';

function CenteredTabs() {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { tours, isLoading } = useSelector((state) => state.tours);

  useEffect(() => {
    const statuses = ['declined', 'pending', 'approved'];
    dispatch(fetchToursByStatus(statuses[value]));
  }, [dispatch, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      height="80vh"
      mb={2}
      mt={2}
    >
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label={t('Declined Tours')} />
        <Tab label={t('Pending Tours')} />
        <Tab label={t('Approved Tours')} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DeclinedTours tours={tours} isLoading={isLoading} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PendingTours tours={tours} isLoading={isLoading} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ApprovedTours tours={tours} isLoading={isLoading} />
      </TabPanel>
    </Box>
  );
}

export default CenteredTabs;
