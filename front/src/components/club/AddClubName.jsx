import useClubFormStore from '@hooks/club/useClubFormStore';
import { TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const AddClubName = ({ setNextButtonDisable }) => {
  const { clubName, clubRegion, onChangeField } = useClubFormStore();

  useEffect(() => {
    if (clubName) {
      setNextButtonDisable(false);
    } else {
      setNextButtonDisable(true);
    }
  }, [setNextButtonDisable, clubName]);

  return (
    <Box sx={{ margin: '10px' }}>
      <h4>클럽의 이름을 정해주세요!</h4>
      <Stack sx={{ marginLeft: '15px', marginRight: '20px' }}>
        <TextField
          fullWidth
          name='clubName'
          onChange={(e) => onChangeField('clubName', e)}
          placeholder='예시: 책 읽고 들려줄 사람들 모여요'
          required
          variant='standard'
          value={clubName}
        />
      </Stack>
    </Box>
  );
};

AddClubName.propTypes = {
  setNextButtonDisable: PropTypes.bool,
};

export default AddClubName;
