import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ListNoticePost from '@pages/admin/NoticePost/ListNoticePost';
import ListEventPost from '@pages/admin/NoticePost/ListEventPost';
import ListQnaPost from '@pages/admin/NoticePost/ListQnaPost';
import { TabPanel } from '@mui/lab';

function AdminTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <Tab label="Notice Posts" />
        <Tab label="Event Posts" />
        <Tab label="Q&A Posts" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {value === 0 && <ListNoticePost />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <ListEventPost />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {value === 2 && <ListQnaPost />}
      </TabPanel>
    </Box>
  );
}

export default AdminTabs;