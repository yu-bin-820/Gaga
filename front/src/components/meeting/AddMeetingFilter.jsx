import { Box, Stack } from '@mui/system';
import React, { useCallback } from 'react';
import SelectGender from './SelectGender';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import SelectAge from './SelectAge';
import { Paper, Typography } from '@mui/material';

const AddMeetingFilter = () => {

    const {
        filterGender,
        filterMinAge,
        filterMaxAge,
        setField,

      } = useMeetingFormStore();

    const handleGenderChange = useCallback((gender) => {
        setField('filterGender', gender);
      }, [setField]);

      const handleAgeChange = useCallback((filterMinAge,filterMaxAge) => {
        setField('filterMinAge', filterMinAge);
        setField('filterMaxAge', filterMaxAge);
        console.log(filterMaxAge);
      }, [setField]);

    return (
      <Box sx={{ margin: '10px' }}>
      <h4>어떤 멤버를 만날까요?</h4>
        <Stack
        sx={{margin: '10px'}}
        spacing={2}>
        <SelectGender
            onGenderClick={handleGenderChange}
        />

        <SelectAge
            onAgeSlider={handleAgeChange}
        ></SelectAge>
            
        </Stack>
        <Paper variant="outlined" sx={{margin: '5px', padding: '10px'}}>
        <Typography style={{ color: 'gray' }} sx={{ fontSize: 13}}>
        설정한 조건에 맞는 사람에게만 모임이 노출되어요.
        </Typography>
      </Paper>
        </Box>
    );
};

export default AddMeetingFilter;