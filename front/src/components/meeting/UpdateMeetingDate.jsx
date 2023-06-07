import { Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';
import React, { useCallback } from 'react';

const UpdateMeetingDate = () => {
    const {
        meetingDate,
        meetingStartTime,
        meetingEndTime,
        setField,
      } =useUpdateMeetingFormStore();

      const handleMeetingDateChange = useCallback((newValue) => {
        setField('meetingDate', newValue);
      }, [setField]);

      const handleMeetingStartTimeChange = useCallback((newValue) => {
        setField('meetingStartTime', newValue);
      }, [setField]);

      const handleMeetingEndTimeChange = useCallback((newValue) => {
        setField('meetingEndTime', newValue);
      }, [setField]);

    return (
        <Box sx={{ margin: '10px' }}>
        <h4>언제 만날까요?</h4>
        <Box sx={{ margin: '10px' }}>
          <Stack spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem >
                  <MobileDatePicker 
                  label="모임날짜"
                  value={meetingDate} 
                  onChange={handleMeetingDateChange}/>
              </DemoItem>
              </LocalizationProvider>
  
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem >
                  <MobileTimePicker
                  value={meetingStartTime} 
                  label="모임 시작 시간"
                  onChange={handleMeetingStartTimeChange}/>
              </DemoItem>
              </LocalizationProvider>
  
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem >
                  <MobileTimePicker 
                  value={meetingEndTime} 
                  label="모임 끝나는 시간"
                  onChange={handleMeetingEndTimeChange}/>
              </DemoItem>
              </LocalizationProvider>
              </Stack>
  
          </Box>
          <Paper
           variant="outlined" sx={{margin: '5px', padding: '10px'}}>
          <Typography style={{ color: 'gray' }} sx={{ fontSize: 13}}>
          모임 인원이 다 차거나 모임 시작 시간 이후에는
          </Typography>
          <Typography style={{ color: 'gray' }} sx={{ fontSize: 13 }}>
          모집 완료 상태로 자동 변경됩니다.
          </Typography>
        </Paper>
          </Box>
    );
};

export default UpdateMeetingDate;