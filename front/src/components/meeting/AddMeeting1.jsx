import useInput from '@hooks/common/useInput';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';

const AddMeeting1 = () => {

  const {
    mainCategoryNo,
    filterTag,
    meetingName,
    meetingIntro,
    meetingDate,
    meetingStartTime,
    meetingEndTime,
    meetingAddr,
    meetingDetailAddr,
    meetingLat,
    meetingLng,
    filterGender,
    filterMinAge,
    filterMaxAge,
    meetingMaxMemberNo,
    entryFee,
    file,
    onChangeField,
    reset
  } = useMeetingFormStore();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
    );

  const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mainCategoryNo',mainCategoryNo);
      formData.append('filterTag',filterTag);
      formData.append('meetingName',meetingName);
      formData.append('meetingIntro',meetingIntro);
      formData.append('meetingDate',dayjs(meetingDate).format("YYYY-MM-DD"));
      formData.append('meetingStartTime',dayjs(meetingStartTime).format('HH:mm:ss'));
      formData.append('meetingEndTime',dayjs(meetingEndTime).format('HH:mm:ss'));
      formData.append('meetingAddr',meetingAddr);
      formData.append('meetingDetailAddr',meetingDetailAddr);
      formData.append('meetingLat',meetingLat);
      formData.append('meetingLng',meetingLng);
      formData.append('filterGender',filterGender);
      formData.append('filterMinAge',filterMinAge);
      formData.append('filterMaxAge',filterMaxAge);
      formData.append('meetingMaxMemberNo',meetingMaxMemberNo);
      formData.append('entryFee',parseInt(entryFee));
      formData.append('meetingLeaderNo',myData.userNo);

        console.log(dayjs(meetingDate).format("YYYY-MM-DD")+meetingStartTime.format('HH:mm:ss'))

      const response = await axios.post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting`,
        formData
      );

      reset()

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [meetingDate,meetingStartTime,meetingEndTime,filterGender,filterMinAge,filterMaxAge, entryFee]);
  return (
    <Box>
      <TextField
        fulWidth
        label="filterGender"
        name="filterGender"
        onChange={(e)=>onChangeField('filterGender',e)}
        required
        value={filterGender}
      />
      <TextField
        fulWidth
        label="filterMinAge"
        name="filterMinAge"
        onChange={(e)=>onChangeField('filterMinAge',e)}
        required
        value={filterMinAge}
      />
      <TextField
        fulWidth
        label="filterMaxAge"
        name="filterMaxAge"
        onChange={(e)=>onChangeField('filterMaxAge',e)}
        required
        value={filterMaxAge}
      />
      <TextField
        fulWidth
        label="meetingMaxMemberNo"
        name="meetingMaxMemberNo"
        onChange={(e)=>onChangeField('meetingMaxMemberNo',e)}
        required
        value={meetingMaxMemberNo}
      />
      <TextField
        fulWidth
        label="entryFee"
        name="entryFee"
        onChange={(e)=>onChangeField('entryFee',e)}
        required
        value={entryFee}
      />

      <Button onClick={handleSubmit}>생성하기</Button>
    </Box>
  );
};

export default AddMeeting1;
