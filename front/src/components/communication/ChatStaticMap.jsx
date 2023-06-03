import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';

const { kakao } = window;

const ChatStaticMap = ({ lat, lng, messageNo }) => {
  useEffect(() => {
    // 이미지 지도에서 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(lat, lng);

    // 이미지 지도에 표시할 마커입니다
    // 이미지 지도에 표시할 마커는 Object 형태입니다
    var marker = {
      position: markerPosition,
    };

    var staticMapContainer = document.getElementById('staticMap' + messageNo), // 이미지 지도를 표시할 div
      staticMapOption = {
        center: new kakao.maps.LatLng(lat, lng), // 이미지 지도의 중심좌표
        level: 3, // 이미지 지도의 확대 레벨
        marker: marker, // 이미지 지도에 표시할 마커
      };

    var staticMap = new kakao.maps.StaticMap(
      staticMapContainer,
      staticMapOption
    );
  }, [lat, lng, messageNo]);
  return (
    <div
      id={'staticMap' + messageNo}
      style={{ width: '200px', height: '200px', pointerEvents: 'none' }}
    ></div>
  );
};
ChatStaticMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  messageNo: PropTypes.number,
};
export default ChatStaticMap;
