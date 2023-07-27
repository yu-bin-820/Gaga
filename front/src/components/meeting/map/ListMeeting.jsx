import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import fetcher from "@utils/fetcher";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import useSWR from "swr";
import EventMarkerContainer from "./EventMarkerContainer";
import ListMeetingChip from "./ListMeetingChip";
import ListMeetingSearchBar from "./ListMeetingSearchBar";
const { kakao } = window;


const ListMeeting = () => {
  const mapRef = useRef();

  const [latitude, setLatitude] = useState();
  const [longtitude, setLongtitude] = useState();
  const [meetingList, setMeetingList] = useState();
  const [state, setState] = useState({
    swLat: "",
    swLng: "",
    neLat: "",
    neLng: "",
  });

  const [ keyword, setKeyword] = useState()
  const [map, setMap] = useState()

  const handleKeywordChange = useCallback((e) => {
      setKeyword(e.target.value);
    }, []);

  const handleSubmit = useCallback(async () => {
      
    if (!map || !keyword) return;

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()

        for (var i = 0; i < data.length; i++) {

          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
      //   setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    })
  }, [map, keyword])
  

  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const onClickMeetingSearch = () => {
    const map = mapRef.current;
    setState({
      swLat: map.getBounds().getSouthWest().getLat().toString(),
      swLng: map.getBounds().getSouthWest().getLng().toString(),
      neLat: map.getBounds().getNorthEast().getLat().toString(),
      neLng: map.getBounds().getNorthEast().getLng().toString(),
    });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongtitude(longitude);
          // console.log(latitude,longitude);
          setState({
            swLat: (latitude-0.002),
            swLng: (longitude-0.002),
            neLat: (latitude+0.002),
            neLng: (longitude+0.002),
          });
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
      swLat: state.swLat,
      swLng: state.swLng,
      neLat: state.neLat,
      neLng: state.neLng,
    };

    axios
      .post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list`,
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
      <Skeleton animation="wave" variant="rectangular" width={'100vw'} height={'100vh'} />

    );
  }
  
  return (
    <Box>
      <Map
        center={{ lat: latitude, lng: longtitude }} // 초기 중심 좌표 설정
        style={{
          width: "100%",
          height: "80vh",
        }}
        level={3}
        ref={mapRef}
        onCreate={setMap}
      >
      <ListMeetingChip
        onClick={onClickMeetingSearch}
      />
        {meetingList?.map((meeting) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${meeting.meetingNo}`}
            meetingLat={meeting.meetingLat}
            meetingLng={meeting.meetingLng}
            meeting={meeting}
          />
        ))}
      </Map>

      <ListMeetingSearchBar 
      keyword={keyword} 
      handleKeywordChange={handleKeywordChange} 
      handleSubmit={handleSubmit}          
      top= '130px'
      />
    </Box>
  );
};

export default ListMeeting;
