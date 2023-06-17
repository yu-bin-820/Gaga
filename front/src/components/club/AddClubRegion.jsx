import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import useClubFormStore from '@hooks/club/useClubFormStore';
import PlaceIcon from '@mui/icons-material/Place';
import PropTypes from 'prop-types';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

const AddClubRegion = ({ setNextButtonDisable }) => {
  const [selectedSido, setSelectedSido] = useState(null);
  const [sigunguCode, setSigungunCode] = useState('');
  const { clubRegion, onChangeField, setField } = useClubFormStore();

  useEffect(() => {
    if (clubRegion) {
      setNextButtonDisable(false);
    } else {
      setNextButtonDisable(true);
    }
  }, [setNextButtonDisable, clubRegion]);

  const { data: sidoData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/club/region/sido`,
    fetcher
  );

  const { data: sigunguData } = useSWR(
    selectedSido
      ? `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/club/region/sigungu/${selectedSido}`
      : null,
    fetcher
  );

  const sidoList =
    sidoData &&
    sidoData.admVOList.admVOList.map((sido) => ({
      value: sido.admCode,
      label: sido.admCodeNm,
    }));

  const sigunguList =
    sigunguData &&
    sigunguData.admVOList.admVOList.map((item) => ({
      value: item.admCode,
      label: item.lowestAdmCodeNm,
    }));

  return (
    <>
      <Box sx={{ margin: '10px' }}>
        <h4>{'지역은 어디인가요?'}</h4>

        <Stack direction='column' display='flex'>
          <Box direction='row' display='flex' fullWidth>
            <PlaceIcon />
            <TextField
              fullWidth
              name='clubRegion'
              onChange={(e) => onChangeField('clubRegion', e)}
              placeholder='예시: 서울특별시 강남구'
              required
              variant='standard'
              value={clubRegion}
            />
          </Box>
          <Stack
            direction='row'
            display='flex'
            sx={{ marginTop: '30px', marginBottom: '2px' }}
            spacing={3}
          >
            <Box width='47%'>
              <FormControl fullWidth>
                <InputLabel id='sido-select-label'>시도 선택</InputLabel>
                <Select
                  labelId='sido-select-label'
                  id='sido_code'
                  value={selectedSido || ''}
                  onChange={(e) => {
                    setSelectedSido(e.target.value);
                    const selectedSidoLabel = sidoList.find(
                      (sido) => sido.value === e.target.value
                    )?.label;
                    setField('clubRegion', selectedSidoLabel);
                  }}
                  label='시도 선택'
                >
                  <MenuItem value=''>시도 선택</MenuItem>
                  {sidoList?.map((sido) => (
                    <MenuItem key={sido.value} value={sido.value}>
                      {sido.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box width='47%'>
              <FormControl fullWidth>
                <InputLabel id='sigungu-select-label'>
                  시군구 선택(미선택시 시도전체)
                </InputLabel>
                <Select
                  labelId='sigungu-select-label'
                  id='sigoon_code'
                  value={sigunguCode || ''}
                  onChange={(e) => {
                    setSigungunCode(e.target.value);
                    const selectedSigunguLabel = sigunguList.find(
                      (sigungu) => sigungu.value === e.target.value
                    )?.label;
                    setField(
                      'clubRegion',
                      `${
                        sidoList.find((sido) => sido.value === selectedSido)
                          ?.label
                      } ${selectedSigunguLabel || ''}`
                    );
                  }}
                  label='시군구 선택(미선택시 시도전체)'
                >
                  <MenuItem value=''>시군구 선택</MenuItem>
                  {sigunguList?.map((sigungu) => (
                    <MenuItem
                      key={sigungu.value}
                      value={sigungu.value}
                      name={sigungu.label}
                    >
                      {sigungu.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>

          <Box></Box>
        </Stack>
      </Box>
    </>
  );
};

AddClubRegion.propTypes = {
  setNextButtonDisable: PropTypes.func,
};

export default AddClubRegion;
