import { Button } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useNavigate, useParams } from 'react-router';
import MeetingThumbnail from './MeetingThumnail';

const ListMeetingParentClubNo = () => {
  const { clubNo } = useParams();
  const [meetingList, setMeetingList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/clubno/${clubNo}`
      )
      .then((response) => {
        console.log(response.data);
        setMeetingList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clubNo]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/clubno/${clubNo}`
      )
      .then((response) => {
        console.log(response.data);
        setMeetingList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clubNo]);

  const onClickMeeting = useCallback((event) => {
    const { id } = event.target;
    navigate(`/meeting/meetingno/${id}`);
  }, []);

  return (
    <Box>
      <Box display='flex' flexDirection='column' gap={2}>
        {meetingList?.map((meeting, i) => (
          <Box key={i}>
            <MeetingThumbnail
              meeting={meeting}
              id={meeting.meetingNo}
              onClick={onClickMeeting}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ListMeetingParentClubNo;
