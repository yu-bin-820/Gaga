import ListMyMeeting from '@components/meeting/ListMyMeeting';
import MyMeeting from '@components/meeting/ListMyMeeting';
import { Box } from '@mui/system';
import React from 'react';

const Profile = () => {
    return (
        <Box sx={{marginTop:'64px'}}>
            <ListMyMeeting/>
        </Box>

    );
};

export default Profile;