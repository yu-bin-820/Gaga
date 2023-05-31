import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const AddMeetingName = () => {
    const {
        meetingName,
        onChangeField
      } = useMeetingFormStore();

    return (
        <Box>
            <h5>모임의 제목을 정해주세요!</h5>
            <TextField
            fulWidth
            label="meetingName"
            name="meetingName"
            onChange={(e)=>onChangeField('meetingName',e)}
            placeholder="Please enter text"
            required
            value={meetingName}
            />
        </Box>
    );
};

export default AddMeetingName;