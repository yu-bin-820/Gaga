import React, { useEffect } from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';
const { kakao } = window;



const GetMeetingStaticMap = ({ meeting }) => {
  const { meetingLat, meetingLng} = meeting;
  console.log(meetingLat, meetingLng)
  useEffect(() => {
    // 이미지 지도에서 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(meetingLat, meetingLng);

    // 이미지 지도에 표시할 마커입니다
    // 이미지 지도에 표시할 마커는 Object 형태입니다
    var marker = {
      position: markerPosition,
    };

    var staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
      staticMapOption = {
        center: new kakao.maps.LatLng(meetingLat, meetingLng), // 이미지 지도의 중심좌표
        level: 3, // 이미지 지도의 확대 레벨
        marker: marker, // 이미지 지도에 표시할 마커
      };

      var staticMap = new kakao.maps.StaticMap(
        staticMapContainer,
        staticMapOption
      );
    }, [meetingLat, meetingLng]);


    return (
      <div
      id={'staticMap' }
      style={{ width: '100%', height: '200px', pointerEvents: 'none' }}
    ></div>
      );
};

GetMeetingStaticMap.propTypes = {
  meeting: PropTypes.shape({
    meetingLat: PropTypes.number.isRequired,
    meetingLng: PropTypes.number.isRequired,
  }).isRequired,
};

export default GetMeetingStaticMap;