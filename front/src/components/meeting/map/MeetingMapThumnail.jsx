import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';

const MeetingMapThumnail = () => {
    return (

        <Box sx={{backgroundColor : 'red', zIndex:'tooltip'}}>
          <Stack direction='row' spacing={2}>
              <Box>{meetingName}</Box>
              <Stack>
                  <Box>sldf</Box>
                  <Box>sdf</Box>
                  <Button id={meetingNo} onClick={onClickMeeting}>상세조회</Button>
              </Stack>
          </Stack>
        </Box>
    );
};

export default MeetingMapThumnail;