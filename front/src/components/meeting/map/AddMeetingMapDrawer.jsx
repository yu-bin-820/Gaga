import { Button, Divider, List, ListItem, SwipeableDrawer } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import ListMeetingSearchBar from './ListMeetingSearchBar';

const AddMeetingMapDrawer = ({settingsMenuOpen, toggleSettingsMenu, setSettingsMenuOpen, center, setMap, setPosition, setField, markerAddr, position, keyword, handleKeywordChange, handleSubmit }) => {

    return (
        <SwipeableDrawer
            anchor="right"
            open={settingsMenuOpen}
            onClose={toggleSettingsMenu(false)}
            onOpen={toggleSettingsMenu(true)}
        >
            <Box sx={{ minWidth: '100vw' }}>
                <List>
                    <ListItem>
                        <Button
                        onClick={() => {
                            setSettingsMenuOpen(false);
                        }}>
                            확인
                        </Button>
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
            <Map // 로드뷰를 표시할 Container
                center={center}
                style={{
                    width: "100%",
                    height: "100vh",
                }}
                level={3}
                onCreate={setMap}
                onClick={(_t, mouseEvent) => {
                    const lat = mouseEvent.latLng.getLat();
                    const lng = mouseEvent.latLng.getLng();
                    setPosition({
                        lat: lat,
                        lng: lng,
                    });
                    setField('meetingLat', lat.toString());
                    setField('meetingLng', lng.toString());
                    markerAddr(lat, lng);
                }}
            >
                {position && <MapMarker position={position} />}
            </Map>
            <ListMeetingSearchBar 
                keyword={keyword} 
                handleKeywordChange={handleKeywordChange} 
                handleSubmit={handleSubmit}          
                top= '100px'
            />
        </SwipeableDrawer>
    );
};

AddMeetingMapDrawer.propTypes = {
    settingsMenuOpen: PropTypes.object.isRequired,
    toggleSettingsMenu: PropTypes.object.isRequired,
    setSettingsMenuOpen: PropTypes.object.isRequired,
    center: PropTypes.object.isRequired,
    setMap: PropTypes.object.isRequired,
    setPosition: PropTypes.object.isRequired,
    setField: PropTypes.object.isRequired,
    markerAddr: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired,
    keyword: PropTypes.object.isRequired,
    handleKeywordChange: PropTypes.object.isRequired,
    handleSubmit: PropTypes.object.isRequired,
  };


export default AddMeetingMapDrawer;