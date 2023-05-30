import AddMeetingMemberThumnail from '@components/meeting/AddMeetingMemberThumnail';
import CommonTop from '@layouts/common/CommonTop';
import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';

const AddMeetingMember = () => {
  const { meetingno } = useParams();
  const [meeting, setMeeting] = useState();
  const navigate = useNavigate();
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    axios
      .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`)
      .then((response) => {
        console.log(response.data);
        setMeeting(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [meetingno]);

  const onClickAddMember = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const data = {
          meetingNo: meeting?.meetingNo,
          userNo: myData.userNo,
        };

        console.log(data);

        const response = await axios.post(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`, data);

        navigate(`/`);
      } catch (error) {
        console.error(error);
      }
    },
    [meeting, navigate]
  );

  console.log(myData);
  console.log(meeting);
  if (!meeting){return <>로딩중</>}
  return (
    <>
      <CommonTop />
      <Box sx={{ marginTop: '64px', bgcolor: '#ededed' }}>
        <Stack spacing={1}>
        <AddMeetingMemberThumnail meeting={meeting} />
        <Box sx={{ bgcolor: 'white' }}>
          <h4>결제금액</h4>
        </Box>
        <Box sx={{ bgcolor: 'white' }}>
        <Button onClick={onClickAddMember}>신청하기</Button>
        </Box>
        </Stack>
      </Box>
    </>
  );
};

export default AddMeetingMember;