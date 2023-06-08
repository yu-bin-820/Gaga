import { Box, Stack } from '@mui/system';
import React, { useCallback } from 'react';
import { Paper, Typography } from '@mui/material';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';
import SelectGender from '@components/common/SelectGender';
import SelectAge from '@components/common/SelectAge';

const UpdateMeetingFilter = () => {
    const {
        filterGender,
        filterMinAge,
        filterMaxAge,
        setField,
      } =useUpdateMeetingFormStore();

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
              filterGender={filterGender}
          />
  
          <SelectAge
              onAgeSlider={handleAgeChange}
              filterMinAge={filterMinAge}
              filterMaxAge={filterMaxAge}
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

export default UpdateMeetingFilter;