import { Slider } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import LinearScaleIcon from '@mui/icons-material/LinearScale';


const marks = [
  {
    value: 14,
    label: '14',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 50,
    label: '50+',
  },
];


const SelectAge = ({onAgeSlider, filterMinAge, filterMaxAge}) => {

  const [value, setValue] = React.useState([filterMinAge, filterMaxAge]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const commitAge = (event,commitValue) => {
    onAgeSlider(commitValue[0],commitValue[1]);
  }


    return (
      <Stack
        sx={{marginLeft: 1}}
        spacing={2}>
        <Stack
        direction='row'
        alignItems="center"
        spacing={2}
        sx={{marginLeft: 1, marginRight: 1.5, borderBottom: '1.5px solid #bfbdbd'}}
        >
        <LinearScaleIcon />
            <h4>연령</h4>
        </Stack>
        
        <Stack
        alignItems="center"
        sx={{marginLeft: '3px', marginRight: '3px'}}>
        <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        onChangeCommitted={commitAge}
        valueLabelDisplay="auto"
        min={14}
        max={50}
        marks={marks}
      />
      </Box>
      </Stack>
      </Stack>
    );
};

SelectAge.propTypes = {
  onAgeSlider: PropTypes.object.isRequired,
  filterMinAge: PropTypes.object.isRequired,
  filterMaxAge: PropTypes.object.isRequired,
};

export default SelectAge;