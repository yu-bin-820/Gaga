import { Box, Stack } from '@mui/system';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from 'react';
import { Paper, Typography } from '@mui/material';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';
import useUpdateClubFormStore from '@stores/club/useUpdateClubFormStore';

const UpdateClubMaxMember = () => {
  const { clubMaxMemberNo, setField } = useUpdateClubFormStore();

  const isDecreaseDisabled = clubMaxMemberNo === 3;
  const isIncreaseDisabled = clubMaxMemberNo === 99;

  const handleDecrease = () => {
    if (clubMaxMemberNo > 3) {
      setField('clubMaxMemberNo', clubMaxMemberNo - 1);
    }
  };

  const handleIncrease = () => {
    if (clubMaxMemberNo < 99) {
      setField('clubMaxMemberNo', clubMaxMemberNo + 1);
    }
  };

  return (
    <Box sx={{ margin: '10px' }}>
      <h4>몇 명과 함께 할까요?</h4>
      <h5 style={{ color: 'gray' }}>
        본인을 포함한 총 참여 인원 수를 알려주세요.
      </h5>
      <Stack
        direction='row'
        alignItems='center'
        spacing={8}
        justifyContent='center'
        margin={7}
      >
        <RemoveCircleIcon
          onClick={handleDecrease}
          sx={{ color: isDecreaseDisabled ? 'lightgray' : 'inherit' }}
        />
        <Typography variant='inherit' sx={{ fontSize: 16 }}>
          {clubMaxMemberNo}
        </Typography>
        <AddCircleIcon
          onClick={handleIncrease}
          sx={{ color: isIncreaseDisabled ? 'lightgray' : 'inherit' }}
        />
      </Stack>
      <Paper variant='outlined' sx={{ margin: '5px', padding: '10px' }}>
        <Typography style={{ color: 'gray' }} sx={{ fontSize: 13 }}>
          모임 인원 안내
        </Typography>
        <Typography style={{ color: 'gray' }} sx={{ fontSize: 13 }}>
          3~100 명
        </Typography>
      </Paper>
    </Box>
  );
};

export default UpdateClubMaxMember;
