import { Box, Stack } from '@mui/system';
import React, { useCallback } from 'react';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import { Chip, Paper, Typography } from '@mui/material';
import SelectGender from '@components/common/SelectGender';
import SelectAge from '@components/common/SelectAge';
import PropTypes from 'prop-types';
import useCommonStore from '@stores/common/useCommonStore';

const SettingFilterGenderAge = ({
  filterGender,
  filterMinAge,
  filterMaxAge,
  setFilterGender,
  setFilterMinAge,
  setFilterMaxAge,
  selectedTagComponents,
  submitButton,
}) => {
  const { selectedTags } = useCommonStore();
  const handleGenderChange = useCallback(
    (gender) => {
      setFilterGender(gender);
    },
    [setFilterGender]
  );

  const handleAgeChange = useCallback(
    (filterMinAge, filterMaxAge) => {
      setFilterMinAge(filterMinAge);
      setFilterMaxAge(filterMaxAge);
      console.log(filterMaxAge);
    },
    [setFilterMinAge, setFilterMaxAge]
  );

  return (
    <Box sx={{ margin: '10px' }}>
      <h4>어떤 멤버를 만날까요?</h4>
      <Stack sx={{ margin: '10px' }} spacing={2}>
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
      <Stack>
        <h4 style={{ marginBottom: '5px' }}>관심분야</h4>
        <Stack direction={'row'}>
          {selectedTags?.map((tag, i) => (
            <Chip key={tag} label={tag} sx={{ marginLeft: '10px' }} />
          ))}
        </Stack>
      </Stack>
      <Paper variant="outlined" sx={{ marginTop: '30px', padding: '10px' }}>
        <Typography style={{ color: 'gray' }} sx={{ fontSize: 13 }}>
          설정한 조건에 맞는 모임/클럽을 볼 수 있어요.
        </Typography>
      </Paper>
      {submitButton}
    </Box>
  );
};

SettingFilterGenderAge.propTypes = {
  filterGender: PropTypes.number,
  filterMinAge: PropTypes.number,
  filterMaxAge: PropTypes.number,
  setFilterGender: PropTypes.func,
  setFilterMinAge: PropTypes.func,
  setFilterMaxAge: PropTypes.func,
  selectedTagComponents: PropTypes.func,
  submitButton: PropTypes.func,
};

export default SettingFilterGenderAge;
