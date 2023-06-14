import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import { TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import AddMeetingMapDrawer from './AddMeetingMapDrawer';
import MapIcon from '@mui/icons-material/Map';
const { kakao } = window;
import PropTypes from 'prop-types';


const AddMeetingMap = ({setNextButtonDisable}) => {

    const {
        meetingAddr,
        meetingDetailAddr,
        meetingLat,
        meetingLng,
        setField,
        onChangeField,
      } = useMeetingFormStore();

      useEffect(() => {
        if (meetingAddr) {
          setNextButtonDisable(false);
        } else {
          setNextButtonDisable(true)
        }
      }, [setNextButtonDisable, meetingAddr, meetingDetailAddr]);

      const [position, setPosition] = useState()

      const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

      const onClickSettings = useCallback(() => {
        // navigate('/settings');
        setSettingsMenuOpen(true);
      }, []);
      const toggleSettingsMenu = useCallback(
        (state) => () => {
          setSettingsMenuOpen(state);
        },
        []
      );

    const [ keyword, setKeyword] = useState()
    const [map, setMap] = useState()

    const handleKeywordChange = useCallback((e) => {
        setKeyword(e.target.value);
      }, []);
  
    const handleSubmit = useCallback(async () => {
        
      if (!map) return
      const ps = new kakao.maps.services.Places()
  
      ps.keywordSearch(keyword, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds()
          let markers = []

          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            })
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
          // setMarkers(markers)
  
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds)
        }
      })
    }, [map, keyword])

    const markerAddr = useCallback(async (lat, lng) => {
        const geocoder = new kakao.maps.services.Geocoder();
      
        geocoder.coord2Address(lng, lat, (result, status) => {
          let address = '';
          if (status === kakao.maps.services.Status.OK) {
            if (result.length >= 1) {
              if (result[0].road_address != null && result[0].road_address != undefined) {
                setField('meetingAddr', result[0].address.address_name.toString());
            } else {
                if (result[0].address != null && result[0].address != undefined) {
                    setField('meetingAddr', result[0].address.address_name.toString());

                  address = result[0].address.address_name;
                }
              }
            }
          }
          console.log(address);
          // address 값을 어디에 저장할지 정해야 합니다.
          // setField('meetingAddr', address);
        });
      },[setField]);




    return (
      <Box sx={{ margin: '10px' }}>
      <h4>어디서 만날까요?</h4>
          <Stack
            sx={{marginLeft: '15px',
            marginRight:'20px'}}>
        <TextField
          fullWidth
          disabled
          name="meetingAddr"
          onChange={(e) => onChangeField('meetingAddr', e)}
          required
          value={meetingAddr}
          variant="standard"
          InputProps={{
            endAdornment: (
              <MapIcon
                onClick={onClickSettings}
                sx={{
                  cursor: 'pointer',
                  color: 'rgba(0, 0, 0, 0.54)',
                }}
              />
            ),
          }}
        />
        <TextField
            fullWidth
            label="상세주소"
            name="meetingDetailAddr"
            onChange={(e)=>onChangeField('meetingDetailAddr',e)}
            required
            value={meetingDetailAddr}
            variant="standard"
          />
          </Stack>
        <input
          hidden
          name="meetingLat"
          onChange={(e)=>onChangeField('meetingLat',e)}
          required
          value={meetingLat}
        />
        <input
          hidden
          name="meetingLng"
          onChange={(e)=>onChangeField('meetingLng',e)}
          required
          value={meetingLng}
        />
            <AddMeetingMapDrawer
                settingsMenuOpen={settingsMenuOpen}
                toggleSettingsMenu={toggleSettingsMenu}
                setSettingsMenuOpen={setSettingsMenuOpen}
                center={{
                    lat: 37.566826,
                    lng: 126.9786567,
                }}
                setMap={setMap}
                setPosition={setPosition}
                setField={setField}
                markerAddr={markerAddr}
                position={position}
                keyword={keyword}
                handleKeywordChange={handleKeywordChange}
                handleSubmit={handleSubmit}
            />
        </Box>
    );
};

AddMeetingMap.propTypes = {
  setNextButtonDisable: PropTypes.bool,
  };

export default AddMeetingMap;