import { Grid, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack, margin } from '@mui/system';
import React, { useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import useClubFormStore from '@hooks/club/useClubFormStore';

const AddClubMaxMember = () => {
  const { clubMaxMemberNo, setField } = useClubFormStore();

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

  useEffect(() => {
    if (clubMaxMemberNo === null) {
      setField('clubMaxMemberNo', 3);
    }
  }, [clubMaxMemberNo, setField]);

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
          클럽 인원 안내
        </Typography>
        <Typography style={{ color: 'gray' }} sx={{ fontSize: 13 }}>
          3~100 명
        </Typography>
      </Paper>
    </Box>
  );
};

export default AddClubMaxMember;
