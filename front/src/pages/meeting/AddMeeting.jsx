import useInput from '@hooks/common/useInput';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';

const AddMeeting = () => {
  const [meeting, onChangeMeeting, setMeeting] = useInput({
    mainCategoryNo: '',
    filterTag: '',
    meetingName: '',
    meetingIntro: '',
    meetingImg: '',
    meetingDate: '',
    meetingStartTime: '',
    meetingEndTime: '',
    meetingAddr: '',
    meetingDetailAddr: '',
    meetingLat: '',
    meetingLng: '',
    filterGender: '',
    filterMinAge: '',
    filterMaxAge: '',
    meetingMaxMemberNo: '',
    entryFee: '',
    meetingLeaderNo: '',
  });

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
    );

  const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    event.preventDefault();

    try {
      const data = {
        mainCategoryNo: meeting.mainCategoryNo,
        filterTag: meeting.filterTag,
        meetingName: meeting.meetingName,
        meetingIntro: meeting.meetingIntro,
        meetingImg: meeting.meetingImg,
        meetingDate: meeting.meetingDate,
        meetingStartTime: meeting.meetingStartTime,
        meetingEndTime: meeting.meetingEndTime,
        meetingAddr: meeting.meetingAddr,
        meetingDetailAddr: meeting.meetingDetailAddr,
        meetingLat: meeting.meetingLat,
        meetingLng: meeting.meetingLng,
        filterGender: meeting.filterGender,
        filterMinAge: meeting.filterMinAge,
        filterMaxAge: meeting.filterMaxAge,
        meetingMaxMemberNo: meeting.meetingMaxMemberNo,
        entryFee: meeting.entryFee,
        meetingLeaderNo: myData.userNo,
      };

      const response = await axios.post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting`,
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
        label="mainCategoryNo"
        name="mainCategoryNo"
        onChange={onChangeMeeting}
        required
        value={meeting.mainCategoryNo}
      />
      <TextField
        fulWidth
        label="filterTag"
        name="filterTag"
        onChange={onChangeMeeting}
        required
        value={meeting.filterTag}
      />
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
        label="meetingAddr"
        name="meetingAddr"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingAddr}
      />
      <TextField
        fulWidth
        label="meetingDetailAddr"
        name="meetingDetailAddr"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingDetailAddr}
      />
      <TextField
        fulWidth
        label="meetingLat"
        name="meetingLat"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingLat}
      />
      <TextField
        fulWidth
        label="meetingLng"
        name="meetingLng"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingLng}
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
        label="meetingMaxMemberNo"
        name="meetingMaxMemberNo"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingMaxMemberNo}
      />
      <TextField
        fulWidth
        label="entryFee"
        name="entryFee"
        onChange={onChangeMeeting}
        required
        value={meeting.entryFee}
      />

      <Button onClick={handleSubmit}>생성하기</Button>
    </Box>
  );
};

export default AddMeeting;
