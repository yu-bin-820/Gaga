import useClubFormStore from '@hooks/club/useClubFormStore';
import { TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';

const AddClubName = () => {
  const { clubName, onChangeField } = useClubFormStore();

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

export default AddClubName;
