import { Button } from '@mui/material';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router';
import useSWR from 'swr';

const ListMeeting = () => {
  const [meetingList, setMeetingList] = useState();
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    const data = {
      gender: myData.filterGender,
      maxAge: myData.filterMaxAge,
      minAge: myData.filterMinAge,
      tag: myData.filterTag,
      tag2: myData.filterTag2,
      tag3: myData.filterTag3,
      birthday: myData.birthday,
      age: 21,
      swLat: 0,
      swLng: 0,
      neLat: 1000,
      neLng: 1000,
    };
    axios
      .post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list`,
        data
      )
      .then((response) => {
        console.log(data);
        console.log(response.data);
        setMeetingList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [myData]);

  const onClickMeeting = useCallback(
    (event) => {
      const { id } = event.target;
      navigate(`/meeting/meetingno/${id}`);
    },
    [navigate]
  );

  return (
    <>
      <Box sx={{ marginTop: '100px' }}>
        <Box>
          {meetingList?.map((meeting, i) => (
            <Box key={i}>
              <h5>{meeting.meetingName}</h5>
              <Button id={meeting.meetingNo} onClick={onClickMeeting}>
                미팅정보
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ListMeeting;
