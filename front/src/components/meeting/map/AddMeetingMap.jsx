import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import { Button, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { FixedSizeList } from 'react-window';

const AddMeetingMap = () => {

    const {
        meetingAddr,
        meetingDetailAddr,
        meetingLat,
        meetingLng,
        setField,
        onChangeField,
      } = useMeetingFormStore();

      const [position, setPosition] = useState()


    const [info, setInfo] = useState()
    const [ keyword, setKeyword] = useState()
    const [markers, setMarkers] = useState([])
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
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
        //   setMarkers(markers)
  
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
      }, []);




    return (
        <>
        <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "350px",
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

        {/* {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => {
                setField('meetingLat', marker.position.lat.toString());
                setField('meetingLng', marker.position.lng.toString());
                setField('meetingAddr', marker.meetingAddr.toString());
                setInfo(marker);
            }}
          >
            {info &&info.content === marker.content && (
              <div style={{color:"#000"}}>{marker.content}</div>
            )}
          </MapMarker>
        ))} */}
      </Map>
        <TextField
            fullWidth
            label="keyword"
            name="keyword"
            onChange={handleKeywordChange}
            required
            value={keyword}
          />
        <Button onClick={handleSubmit}>검색</Button>
        <TextField
            fullWidth
            label="meetingAddr"
            name="meetingAddr"
            onChange={(e)=>onChangeField('meetingAddr',e)}
            required
            value={meetingAddr}
          />
        <TextField
            fullWidth
            label="meetingDetailAddr"
            name="meetingDetailAddr"
            onChange={(e)=>onChangeField('meetingDetailAddr',e)}
            required
            value={meetingDetailAddr}
          />
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
        </>
    );
};

export default AddMeetingMap;