import { Box, Stack } from '@mui/system';
import React from 'react';
import MeetingThumbnail from './MeetingThumnail';
import PropTypes from 'prop-types';


const ListMeetingProfile = ({ meeting }) => {
    return (
        <Box
        sx={{
            borderRadius: 2,
            p: 2,
            minWidth: 295,
            padding: 1,
            backgroundColor: '#ffffff'
        }}
        >
            <Stack
            spacing={3}
            >
            <MeetingThumbnail meeting={meeting}/>
            </Stack>
        </Box>
    );
};

ListMeetingProfile.propTypes = {
    meeting: PropTypes.object.isRequired,
  };

export default ListMeetingProfile;