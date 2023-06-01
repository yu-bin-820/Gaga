import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import MeetingThumbnail from '../MeetingThumnail';

const EventMarkerContainer= ({ meetingLat, meetingLng, meeting }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const content = (
      <CustomOverlayMap
        position={{ lat: meetingLat, lng: meetingLng }}
        zIndex={1000}
        yAnchor={1.1}
      >
        <Box sx={{ backgroundColor: "#ffffff" }}>
          <Box sx={{ backgroundColor: "#ffffff", zIndex: "tooltip" }}>
            <Button onClick={() => setIsOpen(false)}>닫기</Button>
            <Stack direction="row" spacing={2}>
              <MeetingThumbnail meeting={meeting} />
            </Stack>
          </Box>
        </Box>
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
  
  export default EventMarkerContainer;