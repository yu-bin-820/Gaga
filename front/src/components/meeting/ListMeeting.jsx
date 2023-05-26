import { Button, CircularProgress } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router';
import useSWR from 'swr';

const ListMeeting = () => {
  const [latitude, setLatitude] = useState();
  const [longtitude,setLongtitude] = useState();
  const [meetingList, setMeetingList] = useState();
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongtitude(longitude);
        },
        (err) => {
          console.log(err.message);
        }
      );
    } else {
      console.log('geolocation을 사용할 수 없어요..');
    }
  }, []);

  useEffect(() => {
    const data = {
      gender: myData?.filterGender,
      maxAge: myData?.filterMaxAge,
      minAge: myData?.filterMinAge,
      tag: myData?.filterTag,
      tag2: myData?.filterTag2,
      tag3: myData?.filterTag3,
      birthday: myData?.birthday,
      age: 21,
      swLat: 0,
      swLng: 0,
      neLat: 1000,
      neLng: 1000,
    };

    axios
      .post(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list`, data)
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

  const EventMarkerContainer = ({
    meetingLat,
    meetingLng,
    meetingName,
    meetingNo,
  }) => {
    const map = useMap();

    const [isOpen, setIsOpen] = useState(false);

    const content = (
      <CustomOverlayMap
        position={{ lat: meetingLat, lng: meetingLng }}
        zIndex={1000}
        yAnchor={1.1}
      >
            <div className="info">
              <div className="title">
                <div
                  className="close"
                  onClick={() => setIsOpen(false)}
                  title="닫기"
                ></div>
              </div>
              <Box sx={{backgroundColor : 'red', zIndex:'tooltip'}}>
                <Stack direction='row' spacing={2}>
                    <Box>{meetingName}</Box>
                    <Stack>
                        <Box>sldf</Box>
                        <Box>sdf</Box>
                        <Button id={meetingNo} onClick={onClickMeeting}>상세조회</Button>
                    </Stack>
                </Stack>
              </Box>
            </div>
          ;
          </CustomOverlayMap>
    );
      
    return (
      <MapMarker
        position={{ lat: meetingLat, lng: meetingLng }}
        onClick={() => setIsOpen(true)}
      >
        {isOpen && content}
      </MapMarker>
    );
  };
      
      if(!latitude || !longtitude ) {
        return (
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="success" />
          </Stack>
        );
      }
  return (
    <>
    
      <Map
        center={{ lat: latitude, lng: longtitude }} // 초기 중심 좌표 설정
        style={{
          width: '100%',
          height: '450px',
        }}
        level={3}
      >
        {meetingList?.map((meeting, index) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${meeting.meetingNo}`}
            meetingLat={meeting.meetingLat}
            meetingLng={meeting.meetingLng}
            meetingName={meeting.meetingName}
            meetingNo={meeting.meetingNo}
          />
        ))}
      </Map>

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