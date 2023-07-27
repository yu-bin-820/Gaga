import { TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';
import React from 'react';

const UpdateMeetingName = () => {
    

    const {
        meetingName,
        onChangeField
      } = useUpdateMeetingFormStore();

    return (
        <Box sx={{margin: '5px'}}>
            <h5>모임의 제목을 수정해주세요!</h5>
            <Stack
            sx={{marginLeft: '15px',
            marginRight:'20px'}}>
            <TextField
            fullWidth
            name="meetingName"
            onChange={(e)=>onChangeField('meetingName',e)}
            variant="standard"
            required
            value={meetingName}
            />
            </Stack>
        </Box>
    );
};

export default UpdateMeetingName;