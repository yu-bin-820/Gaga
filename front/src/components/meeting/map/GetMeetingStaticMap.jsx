import React from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';


const GetMeetingStaticMap = ({ meeting }) => {
  const { meetingLat, meetingLng} = meeting;
  console.log(meetingLat, meetingLng)

    return (
        <StaticMap // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: {meetingLat},
            lng: {meetingLng}
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "200px",
          }}
          marker={{
            lat: 33.450701,
            lng: 126.570667
          }}
          level={3} // 지도의 확대 레벨
        />
      );
};

GetMeetingStaticMap.propTypes = {
  meeting: PropTypes.shape({
    meetingLat: PropTypes.number.isRequired,
    meetingLng: PropTypes.number.isRequired,
  }).isRequired,
};

export default GetMeetingStaticMap;