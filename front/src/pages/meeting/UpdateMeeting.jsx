import useInput from '@hooks/common/useInput';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const UpdateMeeting = () => {
  const { meetingno } = useParams();
  const [meeting, onChangeMeeting, setMeeting] = useInput({
    meetingName: '',
    meetingIntro: '',
    meetingImg: '',
    meetingDate: '',
    meetingStartTime: '',
    meetingEndTime: '',
    filterGender: '',
    filterMinAge: '',
    filterMaxAge: '',
    meetingState: '',
    meetingMaxMemberNo: '',
    meetingNo: '',
  });

  useEffect(() => {
    axios
      .get(
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/meeting/no/${meetingno}`
      )
      .then((response) => {
        console.log(response.data);
        setMeeting(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    event.preventDefault();

    try {
      const data = {
        meetingName: meeting.meetingName,
        meetingIntro: meeting.meetingIntro,
        meetingImg: meeting.meetingImg,
        meetingDate: meeting.meetingDate,
        meetingStartTime: meeting.meetingStartTime,
        meetingEndTime: meeting.meetingEndTime,
        filterGender: meeting.filterGender,
        filterMinAge: meeting.filterMinAge,
        filterMaxAge: meeting.filterMaxAge,
        meetingState: meeting.meetingState,
        meetingMaxMemberNo: meeting.meetingMaxMemberNo,
        meetingNo: meeting.meetingNo,
      };

      console.log(data);

      const response = await axios.patch(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting`,
        data
      );

      navigate(`/meeting/meetingno/${meetingno}`);
    } catch (error) {
      console.error(error);
    }
  }, [meeting, meetingno, navigate]);

  return (
    <Box sx={{ marginTop: '64px' }}>
      <TextField
        fulWidth
        label="meetingName"
        name="meetingName"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingName}
      />
      <TextField
        fulWidth
        label="meetingIntro"
        name="meetingIntro"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingIntro}
      />
      <TextField
        fulWidth
        label="meetingImg"
        name="meetingImg"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingImg}
      />
      <TextField
        fulWidth
        label="filterGender"
        name="filterGender"
        onChange={onChangeMeeting}
        required
        value={meeting.filterGender}
      />
      <TextField
        fulWidth
        label="meetingDate"
        name="meetingDate"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingDate}
      />
      <TextField
        fulWidth
        label="meetingStartTime"
        name="meetingStartTime"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingStartTime}
      />
      <TextField
        fulWidth
        label="meetingEndTime"
        name="meetingEndTime"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingEndTime}
      />
      <TextField
        fulWidth
        label="meetingMaxMemberNo"
        name="meetingMaxMemberNo"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingMaxMemberNo}
      />
      <TextField
        fulWidth
        label="meetingState"
        name="meetingState"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingState}
      />
      <TextField
        fulWidth
        label="filterMinAge"
        name="filterMinAge"
        onChange={onChangeMeeting}
        required
        value={meeting.filterMinAge}
      />
      <TextField
        fulWidth
        label="filterMaxAge"
        name="filterMaxAge"
        onChange={onChangeMeeting}
        required
        value={meeting.filterMaxAge}
      />
      <TextField
        fulWidth
        label="meetingNo"
        name="meetingNo"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingNo}
      />
      <Button onClick={handleSubmit}>수정하기</Button>
    </Box>
  );
};

export default UpdateMeeting;
