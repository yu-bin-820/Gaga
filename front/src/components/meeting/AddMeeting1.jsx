import useInput from '@hooks/common/useInput';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';

const AddMeeting1 = () => {

  const {
    mainCategoryNo,
    filterTag,
    meetingName,
    meetingIntro,
    meetingImg,
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
        console.log(useMeetingFormStore.meetingDate)
      const data = {
        mainCategoryNo,
        filterTag,
        meetingName,
        meetingIntro,
        meetingImg,
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
        meetingLeaderNo: myData.userNo,
      };

      const response = await axios.post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting`,
        data

      );

      reset()

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [useMeetingFormStore]);
  return (
    <Box>
      <TextField
        fulWidth
        label="meetingIntro"
        name="meetingIntro"
        onChange={(e)=>onChangeField('meetingIntro',e)}
        required
        value={meetingIntro}
      />
      <TextField
        fulWidth
        label="meetingImg"
        name="meetingImg"
        onChange={(e)=>onChangeField('meetingImg',e)}
        required
        value={meetingImg}
      />
      <TextField
        fulWidth
        label="meetingDate"
        name="meetingDate"
        onChange={(e)=>onChangeField('meetingDate',e)}
        required
        value={meetingDate}
      />
      <TextField
        fulWidth
        label="meetingStartTime"
        name="meetingStartTime"
        onChange={(e)=>onChangeField('meetingStartTime',e)}
        required
        value={meetingStartTime}
      />
      <TextField
        fulWidth
        label="meetingEndTime"
        name="meetingEndTime"
        onChange={(e)=>onChangeField('meetingEndTime',e)}
        required
        value={meetingEndTime}
      />
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
