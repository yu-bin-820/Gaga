import useInput from '@hooks/common/useInput';
import useSWR from 'swr';
import React, { useCallback } from 'react';
import fetcher from '@utils/fetcher';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';

const UpdateMeetingSuccess = () => {
    const { meetingno } = useParams();
    const [meeting, onChangeMeeting, setMeeting] = useInput({
        meetingNo: '',
        accountNo: '',
        bankName: ''
      });
    
    
      const navigate = useNavigate();
      const onClickMeetingSuccess = useCallback(async () => {
        event.preventDefault();
    
        try {
          const data = {
            meetingNo: meetingno,
            accountNo: meeting.accountNo,
            bankName: meeting.bankName
          };
    
          const response = await axios.patch(
            `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/meetingsuccess`,
            data
    
          );
    
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }, [meeting]);

    return (
        <Box sx={{ marginTop: '64px' }}>
        <TextField
          fulWidth
          label="accountNo"
          name="accountNo"
          onChange={onChangeMeeting}
          required
          value={meeting.accountNo}
        />
        <TextField
          fulWidth
          label="bankName"
          name="bankName"
          onChange={onChangeMeeting}
          required
          value={meeting.bankName}
        />
        <Button onClick={onClickMeetingSuccess}>하기 </Button>

        </Box>
    );
};

export default UpdateMeetingSuccess;