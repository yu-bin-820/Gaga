import { TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import useUpdateClubFormStore from '@stores/club/useUpdateClubFormStore';
import React from 'react';

const UpdateClubName = () => {
  const { clubName, onChangeField } = useUpdateClubFormStore();

  return (
    <Box sx={{ margin: '5px' }}>
      <h5>클럽의 제목을 수정해주세요!</h5>
      <Stack sx={{ marginLeft: '15px', marginRight: '20px' }}>
        <TextField
          fullWidth
          name='clubName'
          onChange={(e) => onChangeField('clubName', e)}
          variant='standard'
          required
          value={clubName}
        />
      </Stack>
    </Box>
  );
};

export default UpdateClubName;
