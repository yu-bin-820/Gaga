import { Button, Divider, Drawer, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import ListMeetingSearchBar from './ListMeetingSearchBar';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const AddMeetingMapDrawer = ({settingsMenuOpen, toggleSettingsMenu, setSettingsMenuOpen, setMap, setPosition, setField, markerAddr, position, keyword, handleKeywordChange, handleSubmit }) => {

    const [latitude, setLatitude] = useState(37.56683320648879);
    const [longtitude, setLongtitude] = useState(126.97861829907933);


    const onClickMyLocation = useCallback(() => {
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLatitude(latitude);
              setLongtitude(longitude);
              // console.log(latitude,longitude);
            },
            (err) => {
              console.log(err.message);
            }
          );
        } else {
          console.log("geolocation을 사용할 수 없어요..");
        }
      }, []);

    return (
        <Drawer
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
                center={{ lat: latitude, lng: longtitude }}
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
            <MyLocationIcon 
            onClick ={onClickMyLocation}
                sx={{
                    position: 'fixed',
                    bottom: '1rem',
                    left: '88%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 999,
                    fontSize: 40
                }}
            />
            <ListMeetingSearchBar 
                keyword={keyword} 
                handleKeywordChange={handleKeywordChange} 
                handleSubmit={handleSubmit}          
                top= '100px'
            />
        </Drawer>
    );
};

AddMeetingMapDrawer.propTypes = {
    settingsMenuOpen: PropTypes.bool.isRequired,
    toggleSettingsMenu: PropTypes.func.isRequired,
    setSettingsMenuOpen: PropTypes.func.isRequired,
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