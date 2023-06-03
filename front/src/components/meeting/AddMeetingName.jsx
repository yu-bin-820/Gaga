import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import { TextField, Stack } from '@mui/material';
import { Box } from '@mui/system';

const AddMeetingName = () => {
    const {
        meetingName,
        onChangeField
      } = useMeetingFormStore();

    return (
        <Box sx={{margin: '5px'}}>
            <h5>모임의 제목을 정해주세요!</h5>
            <Stack
            sx={{marginLeft: '15px',
            marginRight:'20px'}}>
            <TextField
            fulWidth
            label="meetingName"
            name="meetingName"
            onChange={(e)=>onChangeField('meetingName',e)}
            placeholder="Please enter text"
            required
            fullWidth
            variant="standard"
            value={meetingName}
            />
            </Stack>
        </Box>
    );
};

export default AddMeetingName;