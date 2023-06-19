import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';
import useInput from '@hooks/common/useInput';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import {
  Button,
  Modal,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import useMeetingPathStore from '@stores/meeting/useMeetingPathStore';

const AddMeeting1 = ({ setSettingsAddMeetingOpen, setActiveStep }) => {
  const [alignment, setAlignment] = useState(null);
  const [showEntryFee, setShowEntryFee] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setField: setMeetingPathField, prevMeetingPath } =
    useMeetingPathStore();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    setShowEntryFee(newAlignment === 'right');
    if (newAlignment === 'left') {
      setField('entryFee', '0');
    }
    console.log('alignment', alignment);
    console.log('newAlignment', newAlignment);
  };

  const {
    mainCategoryNo,
    filterTag,
    meetingName,
    meetingIntro,
    meetingDate,
    meetingStartTime,
    meetingEndTime,
    meetingAddr,
    meetingDetailAddr,
    meetingLat,
    meetingLng,
    filterGender,
    filterMinAge,
    filterMaxAge,
    meetingMaxMemberNo,
    parentClubNo,
    entryFee,
    file,
    parentMeetingNo,
    setField,
    onChangeField,
    reset,
  } = useMeetingFormStore();

  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = useCallback(async () => {
    event.preventDefault();

    if (alignment === 'right' && entryFee == ('0' || null)) {
      setIsModalOpen(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mainCategoryNo', mainCategoryNo);
      formData.append('filterTag', filterTag);
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
      formData.append('meetingAddr', meetingAddr);
      formData.append('meetingDetailAddr', meetingDetailAddr);
      formData.append('meetingLat', meetingLat);
      formData.append('meetingLng', meetingLng);
      formData.append('filterGender', filterGender);
      formData.append('filterMinAge', filterMinAge);
      formData.append('filterMaxAge', filterMaxAge);
      formData.append('meetingMaxMemberNo', meetingMaxMemberNo);
      formData.append('entryFee', parseInt(entryFee));
      formData.append('meetingLeaderNo', myData.userNo);
      formData.append('parentClubNo', parentClubNo);
      formData.append('parentMeetingNo', parentMeetingNo);
      console.log('!!!!!!', formData);
      await axios
        .post(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting`, formData)
        .then((response) => {
          reset();
          setActiveStep(0);
          setSettingsAddMeetingOpen(false);

          const isArray = Array.isArray(prevMeetingPath);
          console.log('MeetingThumbNailIsArray', isArray);

          setMeetingPathField(
            'prevMeetingPath',
            isArray
              ? [...prevMeetingPath, location.pathname]
              : [location.pathname]
          );

          navigate(`/meeting/meetingno/${response.data}`);
        });
    } catch (error) {
      console.error(error);
    }
  }, [
    alignment,
    filterTag,
    meetingName,
    meetingAddr,
    meetingDate,
    meetingStartTime,
    meetingEndTime,
    filterGender,
    filterMinAge,
    filterMaxAge,
    entryFee,
    file,
    mainCategoryNo,
    meetingDetailAddr,
    meetingIntro,
    meetingLat,
    meetingLng,
    meetingMaxMemberNo,
    myData.userNo,
    navigate,
    parentClubNo,
    parentMeetingNo,
    reset,
    setSettingsAddMeetingOpen,
    setActiveStep,
    setMeetingPathField,
    prevMeetingPath,
    location,
  ]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <Box sx={{ margin: '10px' }}>
      <h4>참가비가 있나요?</h4>
      <Box sx={{ margin: '10px' }}>
        <h5 style={{ color: 'gray' }}>
          개인 거래로 문제가 발생하는 것을 예방하기 위해 필요한 모든 금액을
          참가비로 설정해 주세요.
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
          <ToggleButton value="left">없음</ToggleButton>
          <ToggleButton value="right">있음</ToggleButton>
        </StyledToggleButtonGroup>
      </Stack>
      <Stack sx={{ margin: '30px' }}>
        {showEntryFee && (
          <TextField
            fullWidth
            name="entryFee"
            onChange={(e) => onChangeField('entryFee', e)}
            required
            variant="standard"
            value={entryFee}
          />
        )}
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
          생성하기
        </Button>
      </Stack>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            p: 3,
          }}
        >
          <Typography variant="body1" component="div" sx={{ mb: 2 }}>
            참가비가 있음을 선택할 경우 금액을 입력해 주세요.
          </Typography>
          <Button variant="contained" onClick={handleCloseModal}>
            확인
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
AddMeeting1.propTypes = {
  setSettingsAddMeetingOpen: PropTypes.func,
  setActiveStep: PropTypes.func,
};

export default AddMeeting1;
