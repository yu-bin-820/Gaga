import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { CircularProgress, Skeleton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios';
import useChatMapStore from '@stores/communication/useChatMapStore';

const { kakao } = window;

const ChatMap = ({ postPath, senderNo, groupNo, mutateGroupMessages }) => {
  const { setField, lat, lng, isPost } = useChatMapStore();
  const [map, setMap] = useState(null);

  const [markerContent, setMarkerContent] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longtitude, setLongtitude] = useState(0);
  const [markerLat, setMarkerLat] = useState(0);
  const [markerLng, setMarkerLng] = useState(0);

  const setMarkerAddr = useCallback(async (lat, lng) => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        if (result.length >= 1) {
          if (
            result[0].road_address != null &&
            result[0].road_address != undefined
          ) {
            setMarkerContent(result[0].address.address_name.toString());
          } else {
            if (result[0].address != null && result[0].address != undefined) {
              setMarkerContent(result[0].address.address_name.toString());
            }
          }
        }
      }
      // console.log(address);
    });
  }, []);

  useEffect(() => {
    if (isPost) {
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // console.log(latitude,longitude);

            setLatitude(latitude);
            setLongtitude(longitude);
            setMarkerLat(latitude);
            setMarkerLng(longitude);
            setMarkerAddr(latitude, longitude);
          },
          (err) => {
            console.log(err.message);
          }
        );
      } else {
        setLatitude(33.450701);
        setLongtitude(126.570667);
        setMarkerLat(33.450701);
        setMarkerLng(126.570667);
        console.log('geolocation을 사용할 수 없어요..');
      }
    } else {
      setLatitude(lat);
      setLongtitude(lng);
      setMarkerLat(lat);
      setMarkerLng(lng);
      setMarkerAddr(lat, lng);
    }
  }, [setMarkerAddr, isPost, lat, lng]);

  const onClickLocationSubmit = useCallback(() => {
    console.log('!!');
    if (isPost) {
      axios
        .post(
          postPath,
          {
            senderNo: senderNo,
            groupNo: groupNo,
            content: markerContent,
            contentTypeNo: 3,
            lat: markerLat,
            lng: markerLng,
          },
          { withCredentials: true }
        )
        .then(() => {
          mutateGroupMessages();
          setField('shouldScroll', true);
          setField('locationDrawerOpen', false);
        });
    }
  }, [
    senderNo,
    groupNo,
    markerContent,
    postPath,
    setField,
    markerLat,
    markerLng,
    isPost,
    mutateGroupMessages,
  ]);

  const onClickMap = useCallback(
    (_t, mouseEvent) => {
      console.log();
      setMarkerLat(mouseEvent.latLng.getLat());
      setMarkerLng(mouseEvent.latLng.getLng());
      setMarkerAddr(markerLat, markerLng);
    },
    [markerLat, markerLng, setMarkerAddr]
  );

  if (!latitude || !longtitude) {
    return (
      <Skeleton
        sx={{ width: '100vw', height: '100vh' }}
        animation="wave"
        variant="rectangular"
      />
    );
  }

  return (
    <Map
      center={{ lat: latitude, lng: longtitude }} // 초기 중심 좌표 설정
      style={{
        width: '100vw',
        height: '100vh',
      }}
      level={3}
      onClick={isPost ? onClickMap : () => {}}
      onCreate={setMap}
    >
      <MapMarker position={{ lat: markerLat, lng: markerLng }} />

      <CustomOverlayMap
        clickable
        position={{ lat: markerLat, lng: markerLng }}
        yAnchor={2.2}
        xAnchor={0.6}
      >
        <Box
          onClick={onClickLocationSubmit}
          sx={{
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid #ededed',
            borderRadius: '10px',
          }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Stack>
              <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                위치정보 {isPost ? '보내기' : ''}
              </Typography>

              <Typography sx={{ fontSize: 12 }}>{markerContent}</Typography>
            </Stack>
            {isPost && <NavigateNextIcon sx={{ marginRight: '-10px' }} />}
          </Stack>
        </Box>
      </CustomOverlayMap>
    </Map>
  );
};

ChatMap.propTypes = {
  postPath: PropTypes.string,
  senderNo: PropTypes.number,
  groupNo: PropTypes.number,
  mutateGroupMessages: PropTypes.func,
};

export default ChatMap;
