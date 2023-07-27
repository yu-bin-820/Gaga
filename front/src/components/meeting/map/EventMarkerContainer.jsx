import { Box, Stack } from '@mui/system';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CustomOverlayMap, MapMarker, useMap } from 'react-kakao-maps-sdk';
import CancelIcon from '@mui/icons-material/Cancel';
import MeetingThumbnail from '../MeetingThumnail';

const EventMarkerContainer = ({ meetingLat, meetingLng, meeting }) => {
  const [isOpen, setIsOpen] = useState(false);
  const map = useMap();
  const markerRef = useRef(null);

  const content = (
    <CustomOverlayMap
      position={{ lat: meetingLat, lng: meetingLng }}
      zIndex={1000}
      yAnchor={1.1}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          width: "300px",
          padding: "16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <CancelIcon
          fontSize="small"
          onClick={() => setIsOpen(false)}
          sx={{
            alignSelf: "flex-end",
            marginTop: "-8px",
            marginRight: "-8px",
            cursor: "pointer",
          }}
        />
        <Stack direction="row" spacing={2}>
          <MeetingThumbnail meeting={meeting} />
        </Stack>
      </Box>
    </CustomOverlayMap>
  );

  const handleMarkerClick = () => {
    setIsOpen(true);
    if (map && markerRef.current) {
      map.panTo(markerRef.current.getPosition());
    }
  };

  return (
    <>
      <MapMarker
        ref={markerRef}
        position={{ lat: meetingLat, lng: meetingLng }}
        onClick={handleMarkerClick}
      />
      {isOpen && content}
    </>
  );
};

EventMarkerContainer.propTypes = {
  meetingLat: PropTypes.number,
  meetingLng: PropTypes.number,
  meeting : PropTypes.object.isRequired,
};

export default EventMarkerContainer;