import { CircularProgress, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router";
import useSWR from "swr";
import EventMarkerContainer from "./map/EventMarkerContainer";

const ListMeeting = () => {
  const [latitude, setLatitude] = useState();
  const [longtitude, setLongtitude] = useState();
  const [meetingList, setMeetingList] = useState();
  const [mapInstance, setMapInstance] = useState(null);
  const [state, setState] = useState({
    swLat: "",
    swLng: "",
    neLat: "",
    neLng: "",
  });

  useEffect(() => {
    const handleBoundsChanged = () => {
      if (mapInstance) {
        const bounds = mapInstance.getBounds();
        setState({
          swLat: bounds.getSouthWest().getLat().toString(),
          swLng: bounds.getSouthWest().getLng().toString(),
          neLat: bounds.getNorthEast().getLat().toString(),
          neLng: bounds.getNorthEast().getLng().toString(),
        });
      }
    };

    if (mapInstance) {
      kakao.maps.event.addListener(mapInstance, "bounds_changed", handleBoundsChanged);
    }

    return () => {
      if (mapInstance) {
        kakao.maps.event.removeListener(mapInstance, "bounds_changed", handleBoundsChanged);
      }
    };
  }, [mapInstance]);
  
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
      console.log("geolocation을 사용할 수 없어요..");
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
      swLat: state.swLat,
      swLng: state.swLng,
      neLat: state.neLat,
      neLng: state.neLng,
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
  }, [myData, state.swLat, state.swLng, state.neLat, state.neLng]);

  if (!latitude || !longtitude) {
    return (
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="success" />
      </Stack>
    );
  }

  
  return (
    <>
      <Map
        center={{ lat: latitude, lng: longtitude }} // 초기 중심 좌표 설정
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3}
        onBoundsChanged={map => {
          setMapInstance(map);
          setState({
          swLat: ((map.getBounds().getSouthWest()).getLat()).toString(),
          swLng: ((map.getBounds().getSouthWest()).getLng()).toString(),
          neLat: ((map.getBounds().getNorthEast()).getLat()).toString(),
          neLng: ((map.getBounds().getNorthEast()).getLng()).toString(),
        });
      }}
      >
        {meetingList?.map((meeting, index) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${meeting.meetingNo}`}
            meetingLat={meeting.meetingLat}
            meetingLng={meeting.meetingLng}
            meeting={meeting}
          />
        ))}
      </Map>

      {!!state && (
          <>
            <p>
              {'영역좌표는 남서쪽 위도, 경도는  ' + state.swLat +','+state.swLng+ ' 이고'}<br/>
              {'북동쪽 위도, 경도는  ' + state.neLat+','+state.neLng + '입니다'}
            </p>
          </>
        )}
    </>
  );
};

export default ListMeeting;
