import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router";
import useSWR from "swr";

const ListMeeting = () => {
  const [meetingList, setMeetingList] = useState();
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

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

  const EventMarkerContainer = ({ meetingLat, meetingLng, meetingName }) => {
    const map = useMap();
    const [isOpen, setIsOpen] = useState(false);

    const content = (
      <CustomOverlayMap
        position={{ lat: meetingLat, lng: meetingLng }}
        zIndex={1000}
      >
        <div className="wrap">
          <div className="info">
            <div className="title">
              {meetingName}
              <div
                className="close"
                onClick={() => setIsOpen(false)}
                title="닫기"
              ></div>
            </div>
            <Box sx={{ backgroundColor: "red", zIndex: "tooltip" }}>
              <Stack direction="row" spacing={2}>
                <Box>kdkdk</Box>
                <Stack>
                  <Box>sldf</Box>
                  <Box>sdf</Box>
                </Stack>
              </Stack>
            </Box>
            <div className="body">
              <div className="img">
                <img
                  src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005"
                  width="73"
                  height="70"
                  alt="카카오 스페이스닷원"
                />
              </div>
              <div className="desc">
                <div className="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                <div className="jibun ellipsis">
                  (우) 63309 (지번) 영평동 2181
                </div>
                <div>
                  <a
                    href="https://www.kakaocorp.com/main"
                    target="_blank"
                    className="link"
                    rel="noreferrer"
                  >
                    홈페이지
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        ;
      </CustomOverlayMap>
    );

    return (
      <MapMarker
        position={{ lat: meetingLat, lng: meetingLng }} // 마커를 표시할 위치
        // @ts-ignore
        onClick={() => setIsOpen(true)}
      >
        {isOpen && content}
      </MapMarker>
    );
  };

  return (
    <>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 37.123,
          lng: 127.654,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
      >
        {meetingList?.map((meeting, index) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${meeting.meetingNo}`}
            meetingLat={meeting.meetingLat}
            meetingLng={meeting.meetingLng}
            meetingName={meeting.meetingName}
          />
        ))}
      </Map>

      <Box sx={{ marginTop: "100px" }}>
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
