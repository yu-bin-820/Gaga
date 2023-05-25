import ListMyMeeting from '@components/meeting/ListMyMeeting';

import MainBottomNav from '@layouts/common/MainBottomNav';
import MyProfileTop from '@layouts/communication/MyProfileTop';
import { BottomNavigation } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Profile = () => {
  return (
    <>
      <MyProfileTop />
      <Box sx={{ marginTop: '64px', marginBottom: '64px' }}>
        <ListMyMeeting />
      </Box>
      <MainBottomNav pageName={'profile'} />
    </>
  );
};

export default Profile;
