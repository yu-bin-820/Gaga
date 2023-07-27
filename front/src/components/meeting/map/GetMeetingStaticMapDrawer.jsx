import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider, IconButton, List, ListItem, SwipeableDrawer } from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const GetMeetingStaticMapDrawer = ({ meeting, settingsMapOpen, toggleSettingsMap, setSettingsMapOpen }) => {
    const { meetingLat, meetingLng} = meeting;
    console.log(meetingLat, meetingLng)
    

    return (
        <SwipeableDrawer
            anchor="right"
            open={settingsMapOpen}
            onClose={toggleSettingsMap(false)}
            onOpen={toggleSettingsMap(true)}
        >
            <Box sx={{ minWidth: '100vw' }}>
                <List>
                <ListItem>
              <IconButton
                onClick={() => {
                    setSettingsMapOpen(false);
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <Box
                sx={{
                  minWidth: 'calc(100vw - 108px)',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
              </Box>
            </ListItem>
            <Divider />
            </List>
            </Box>
            <Map 
            center={{
                lat: meetingLat,
                lng: meetingLng,
            }}
            style={{
                width: "100%",
                height: "100vh",
            }}
            level={4} // 지도의 확대 레벨
            >
            <MapMarker 
                position={{
                lat: meetingLat,
                lng: meetingLng,
                }}
            />
    </Map>

        </SwipeableDrawer>
    );
};

GetMeetingStaticMapDrawer.propTypes = {
    meeting: PropTypes.shape({
      meetingLat: PropTypes.number.isRequired,
      meetingLng: PropTypes.number.isRequired,
    }).isRequired,
    settingsMapOpen: PropTypes.object.isRequired,
    toggleSettingsMap: PropTypes.object.isRequired,
    setSettingsMapOpen: PropTypes.object.isRequired,
  };

export default GetMeetingStaticMapDrawer;