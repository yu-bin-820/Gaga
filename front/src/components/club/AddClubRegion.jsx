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
import { Box, Stack, minWidth } from '@mui/system';
import axios from 'axios';
import useClubFormStore from '@hooks/club/useClubFormStore';
import PlaceIcon from '@mui/icons-material/Place';
import PropTypes from 'prop-types';

const AddClubRegion = ({ setNextButtonDisable }) => {
  const [sidoOptions, setSidoOptions] = useState([]);
  const [sigoonOptions, setSigoonOptions] = useState([]);
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigoon, setSelectedSigoon] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const { clubRegion, onChangeField, setClubRegion } = useClubFormStore();

  useEffect(() => {
    if (clubRegion) {
      setNextButtonDisable(false);
    } else {
      setNextButtonDisable(true);
    }
  }, [setNextButtonDisable, clubRegion]);
  const hasValuesBeenSet = useRef(false);

  useEffect(() => {
    if (
      !hasValuesBeenSet.current ||
      (typeof finalValue !== 'undefined' && finalValue !== clubRegion)
    ) {
      setClubRegion(finalValue);
      hasValuesBeenSet.current = true;
    }
  }, [finalValue, clubRegion, setClubRegion]);

  useEffect(() => {
    if (typeof finalValue !== 'undefined' && finalValue !== clubRegion) {
      setClubRegion(finalValue);
    }
  }, [finalValue, clubRegion, setClubRegion]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/club/region/sigu`)
      .then((response) => {
        let options = [{ value: '', label: '시도선택' }];
        response.data.response.result.featureCollection.features.forEach(
          (f) => {
            console.log('f:', f);
            let 행정구역코드 = f.properties.ctprvn_cd;
            let 행정구역명 = f.properties.ctp_kor_nm;
            options.push({
              value: 행정구역코드,
              label: 행정구역명,
            });
          }
        );
        setSidoOptions(options);
      })
      .catch((error) => {
        console.error('error:', error);
      });
  }, []);

  useEffect(() => {
    if (!selectedSido) return;

    axios
      .get(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/club/region/sigungu/${selectedSido}`
      )
      .then((response) => {
        let options = [{ value: '', label: '시군구선택' }];
        response.data.response.result.featureCollection.features.forEach(
          (f) => {
            let 행정구역코드 = f.properties.sig_cd;
            let 행정구역명 = f.properties.sig_kor_nm;
            options.push({
              value: 행정구역코드,
              label: 행정구역명,
            });
          }
        );
        setSigoonOptions(options);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedSido]);

  const handleSidoChange = (event) => {
    let thisVal = event.target.value;
    setSelectedSido(thisVal);
  };

  const handleSigoonChange = (event) => {
    let thisVal = event.target.value;
    setSelectedSigoon(thisVal);
  };

  const handleChooseClick = () => {
    let selectedTextOne = '';
    let selectedTextTwo = '';

    if (selectedSido) {
      selectedTextOne =
        sidoOptions.find((option) => option.value === selectedSido)?.label ||
        '';
    }

    if (selectedSigoon) {
      selectedTextTwo =
        sigoonOptions.find((option) => option.value === selectedSigoon)
          ?.label || '';
    }

    let finalValue = `${selectedTextOne} ${selectedTextTwo}`;
    console.log(finalValue);
    setFinalValue(finalValue);
  };

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
              value={finalValue}
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
                  value={selectedSido}
                  onChange={handleSidoChange}
                  label='시도 선택'
                >
                  {sidoOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box width='47%'>
              <FormControl fullWidth>
                <InputLabel id='sigoon-select-label'>
                  시군구 선택(미선택시 시도전체)
                </InputLabel>
                <Select
                  labelId='sigoon-select-label'
                  value={selectedSigoon}
                  onChange={handleSigoonChange}
                  label='시군구 선택(미선택시 시도전체)'
                >
                  {sigoonOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>

          <Box>
            <Button
              onClick={handleChooseClick}
              variant='contained'
              sx={{ marginTop: '10px', marginLeft: '38%', minWidth: '100px' }}
            >
              선택
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

AddClubRegion.propTypes = {
  setNextButtonDisable: PropTypes.bool,
};

export default AddClubRegion;
