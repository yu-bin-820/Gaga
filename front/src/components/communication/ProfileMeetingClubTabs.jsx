import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListMeeting from '@components/meeting/map/ListMeeting';
import ListMyMeeting from '@components/meeting/ListMyMeeting';
import ListMyClub from '@components/club/ListMyClub';
import ListCreateClub from '@components/club/ListCreateClub';

export default function ProfileMeetingClubTabs() {
  const [value, setValue] = React.useState('meeting');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        typography: 'body1',
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='모임' value='meeting' sx={{ minWidth: '50%' }} />
            <Tab label='클럽' value='club' sx={{ minWidth: '50%' }} />
          </TabList>
        </Box>
        <Box
          sx={{
            overflowY: 'auto',
            maxHeight: 'calc(100vh)',
            backgroundColor: '#ededed',
          }}
        >
          <TabPanel value='meeting' sx={{ padding: '10px' }}>
            <ListMyMeeting />
          </TabPanel>
          <TabPanel value='club' sx={{ padding: '10px' }}>
            <ListMyClub />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
