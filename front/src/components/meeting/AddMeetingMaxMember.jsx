import { Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';

const AddMeetingMaxMember = () => {
    const {
        meetingMaxMemberNo,
        setField
      } = useMeetingFormStore();


    const isDecreaseDisabled = meetingMaxMemberNo === 3;
    const isIncreaseDisabled = meetingMaxMemberNo === 99;


      const handleDecrease = () => {
        if (meetingMaxMemberNo > 3) {
            setField('meetingMaxMemberNo', meetingMaxMemberNo - 1);
        }
      };
    
      const handleIncrease = () => {
        if (meetingMaxMemberNo < 99) {
            setField('meetingMaxMemberNo', meetingMaxMemberNo + 1);
        }
      };

      useEffect(() => {
        if (meetingMaxMemberNo === null) {
          setField('meetingMaxMemberNo', 3);
        }
      }, [meetingMaxMemberNo, setField]);
    
    
      return (
        <Box sx={{ margin: '10px' }}>
          <h4>몇 명과 함께 할까요?</h4>
          <h5 style={{ color: 'gray' }}>
            본인을 포함한 총 참여 인원 수를 알려주세요.
            </h5>
          <Stack 
          direction="row" 
          alignItems="center" 
          spacing={8}
          justifyContent="center"
          margin={7}>
        <RemoveCircleIcon 
        onClick={handleDecrease} 
        sx={{ color: isDecreaseDisabled ? 'lightgray' : 'inherit' }} />
        <Typography variant="inherit" sx={{ fontSize: 16 }}>
            {meetingMaxMemberNo}
            </Typography>
        <AddCircleIcon 
        onClick={handleIncrease} 
        sx={{ color: isIncreaseDisabled ? 'lightgray' : 'inherit' }} />
      </Stack>
      <Paper variant="outlined" sx={{margin: '5px', padding: '10px'}}>
        <Typography style={{ color: 'gray' }} sx={{ fontSize: 13}}>
        모임 인원 안내
        </Typography>
        <Typography style={{ color: 'gray' }} sx={{ fontSize: 13 }}>
        3~100 명
        </Typography>
      </Paper>

        </Box>
      );
    };
    
    export default AddMeetingMaxMember;