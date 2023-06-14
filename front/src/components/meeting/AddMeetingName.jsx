import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import { TextField, Stack } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


const AddMeetingName = ({setNextButtonDisable}) => {
    const {
        meetingName,
        onChangeField
      } = useMeetingFormStore();

      useEffect(() => {
        if (meetingName) {
          setNextButtonDisable(false);
        } else {
          setNextButtonDisable(true)
        }
      }, [setNextButtonDisable, meetingName]);

    return (
        <Box sx={{margin: '5px'}}>
            <h5>모임의 제목을 정해주세요!</h5>
            <Stack
            sx={{marginLeft: '15px',
            marginRight:'20px'}}>
            <TextField
            fullWidth
            name="meetingName"
            onChange={(e)=>onChangeField('meetingName',e)}
            placeholder="예시: 강남역에서 스터디해요"
            required
            variant="standard"
            value={meetingName}
            />
            </Stack>
        </Box>
    );
};

AddMeetingName.propTypes = {
    setNextButtonDisable: PropTypes.bool,
    };

export default AddMeetingName;