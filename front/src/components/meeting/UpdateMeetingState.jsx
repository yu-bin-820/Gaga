import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';
import { Button, ToggleButton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';
import axios from 'axios';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';

const UpdateMeetingState = ({ setSettingsUpdateMeetingOpen }) => {
  const { meetingno } = useParams();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const {
    meetingName,
    meetingIntro,
    meetingDate,
    meetingStartTime,
    meetingEndTime,
    filterGender,
    filterMinAge,
    filterMaxAge,
    meetingMaxMemberNo,
    meetingImg,
    meetingState,
    file,
    setField,
  } = useUpdateMeetingFormStore();

  const [alignment, setAlignment] = useState(meetingState.toString());

  const { mutate: mutateMeeting } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`,
    fetcher
  );

  const onClickMeetingState = (value) => {
    setField('meetingState', value);
  };

  const handleSubmit = useCallback(() => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else {
        formData.append('meetingImg', meetingImg);
      }
      formData.append('meetingName', meetingName);
      formData.append('meetingIntro', meetingIntro);
      formData.append('meetingDate', dayjs(meetingDate).format('YYYY-MM-DD'));
      formData.append(
        'meetingStartTime',
        dayjs(meetingStartTime).format('HH:mm:ss')
      );
      formData.append(
        'meetingEndTime',
        dayjs(meetingEndTime).format('HH:mm:ss')
      );
      formData.append('filterGender', filterGender);
      formData.append('filterMinAge', filterMinAge);
      formData.append('filterMaxAge', filterMaxAge);
      formData.append('meetingMaxMemberNo', meetingMaxMemberNo);
      formData.append('meetingState', meetingState);
      formData.append('meetingNo', meetingno);

      console.log(meetingDate);

      console.log(formData);

      axios
        .patch(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting`, formData)
        .then(() => {
          mutateMeeting();
        });

      setSettingsUpdateMeetingOpen(false);
    } catch (error) {
      console.error(error);
    }
  }, [
    meetingno,
    meetingImg,
    file,
    filterGender,
    filterMaxAge,
    filterMinAge,
    meetingDate,
    meetingEndTime,
    meetingIntro,
    meetingMaxMemberNo,
    meetingName,
    meetingStartTime,
    meetingState,
    setSettingsUpdateMeetingOpen,
    mutateMeeting,
  ]);

  return (
    <Box sx={{ margin: '10px' }}>
      <h4>모집을 마치려면 모집상태를 변경해주세요!</h4>
      <Box sx={{ margin: '10px' }}>
        <h5 style={{ color: 'gray' }}>
          모집 완료상태로 변경하더라도 신청은 계속 받을 수 있어요!
        </h5>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={12}
        justifyContent="center"
        margin={2}
      >
        <StyledToggleButtonGroup
          size="large"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="2" onClick={() => onClickMeetingState(2)}>
            모집완료
          </ToggleButton>
          <ToggleButton value="1" onClick={() => onClickMeetingState(1)}>
            모집중
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Stack>
      <Stack
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ position: 'fixed', bottom: 5, left: 0, right: 0 }}
      >
        <Button
          variant="contained"
          sx={{ width: '85vw', borderRadius: '50px' }}
          onClick={handleSubmit}
        >
          수정하기
        </Button>
      </Stack>
    </Box>
  );
};

UpdateMeetingState.propTypes = {
  setSettingsUpdateMeetingOpen: PropTypes.func,
};

export default UpdateMeetingState;
