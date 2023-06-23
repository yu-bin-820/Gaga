import { LocalizationProvider, MobileDatePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useCallback, useEffect, useState } from 'react';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import { Box, Stack } from '@mui/system';
import { Alert, Button, Modal, Paper, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';


const AddMeetingDate = ({setNextButtonDisable}) => {
  const {
    meetingDate,
    meetingStartTime,
    meetingEndTime,
    setField
  } = useMeetingFormStore();

  useEffect(() => {
    if (meetingDate && meetingStartTime && meetingStartTime<meetingEndTime) {
      setNextButtonDisable(false);
    } else {
      setNextButtonDisable(true)
    }
  }, [setNextButtonDisable, meetingDate, meetingStartTime, meetingEndTime]);


  const [showModal, setShowModal] = useState(false);
  const [selectedMeetingDate, setSelectedMeetingDate] = useState(meetingDate);

  useEffect(() => {
    setSelectedMeetingDate(meetingDate);
  }, [meetingDate]);

  const handleMeetingDateChange = useCallback((newValue) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    if (newValue >= today) {
      setSelectedMeetingDate(newValue);
      setField('meetingDate', newValue);
    } else {
      setShowModal(true);
    }
  }, [setField]);

  const handleMeetingStartTimeChange = useCallback((newValue) => {
    setField('meetingStartTime', newValue);
  }, [setField]);

  const handleMeetingEndTimeChange = useCallback((newValue) => {
    setField('meetingEndTime', newValue);
  }, [setField]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box sx={{ margin: '10px' }}>
      <h4>언제 만날까요?</h4>
      <Box sx={{ margin: '10px' }}>
        <Stack spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
              <MobileDatePicker
                label="모임날짜"
                value={selectedMeetingDate}
                onChange={handleMeetingDateChange}
                renderInput={(params) => <TextField {...params} disabled={showModal} />}
              />
            </DemoItem>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
              <MobileTimePicker
                value={meetingStartTime}
                label="모임 시작 시간"
                onChange={handleMeetingStartTimeChange}
              />
            </DemoItem>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
              <MobileTimePicker
                value={meetingEndTime}
                label="모임 끝나는 시간"
                onChange={handleMeetingEndTimeChange}
              />
            </DemoItem>
          </LocalizationProvider>
          {meetingStartTime > meetingEndTime && (
          <Alert severity="error">모임 끝나는 시간을 모임 시작 시간 이후로 지정해 주세요!</Alert>
          )}
        </Stack>
      </Box>
      <Paper variant="outlined" sx={{ margin: '5px', padding: '10px' }}>
        <Typography style={{ color: 'gray' }} sx={{ fontSize: 13 }}>
          모임 인원이 다 차거나 모임 시작 시간 이후에는
        </Typography>
        <Typography style={{ color: 'gray' }} sx={{ fontSize: 13 }}>
          모집 완료 상태로 자동 변경됩니다.
        </Typography>
      </Paper>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="date-selection-error-modal"
        aria-describedby="date-selection-error-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="date-selection-error-modal-description">
            오늘 날짜 이후의 날짜를 선택해야 합니다. 다시 선택해주세요.
          </Typography>
          <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2 }}>
            확인
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

AddMeetingDate.propTypes = {
  setNextButtonDisable: PropTypes.func,
  };

export default AddMeetingDate;