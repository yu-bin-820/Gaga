import { Button, Chip } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import CancelIcon from '@mui/icons-material/Cancel';
import MeetingThumbnail from '../MeetingThumnail';

const EventMarkerContainer= ({ meetingLat, meetingLng, meeting }) => {
    const [isOpen, setIsOpen] = useState(false);
  
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
          <CancelIcon fontSize="small" onClick={() => setIsOpen(false)} sx={{ alignSelf: "flex-end", marginTop: "-8px", marginRight: "-8px", cursor: "pointer" }} />
          <Stack direction="row" spacing={2}>
            <MeetingThumbnail meeting={meeting} />
          </Stack>
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