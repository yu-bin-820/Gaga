import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';
import { Button, TextField, ToggleButton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import useUpdateClubFormStore from '@stores/club/useUpdateClubFormStore';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const UpdateClubState = () => {
  const { clubNo } = useParams();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const navigate = useNavigate();

  const {
    clubName,
    clubIntro,
    clubImg,
    clubRegion,
    filterGender,
    filterMinAge,
    filterMaxAge,
    filterTag,
    clubMaxMemberNo,
    clubState,
    file,
    image,
    setField,
    onChangeField,
  } = useUpdateClubFormStore();

  const [alignment, setAlignment] = useState(clubState.toString());

  const onClickClubState = (value) => {
    setField('clubState', value);
  };

  const handleSubmit = useCallback(() => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('clubName', clubName);
      formData.append('clubIntro', clubIntro);
      formData.append('clubRegion', clubRegion);
      formData.append('filterTag', filterTag);
      formData.append('filterGender', filterGender);
      formData.append('filterMinAge', filterMinAge);
      formData.append('filterMaxAge', filterMaxAge);
      formData.append('clubMaxMemberNo', clubMaxMemberNo);
      formData.append('clubState', clubState);
      formData.append('clubNo', clubNo);

      console.log(clubRegion);

      console.log(formData);

      const response = axios.patch(
        `${import.meta.env.VITE_SPRING_HOST}/rest/club`,
        formData
      );

      navigate(`/club/no/${clubNo}`);
    } catch (error) {
      console.error(error);
    }
  }, [
    clubNo,
    navigate,
    file,
    filterGender,
    filterMaxAge,
    filterMinAge,
    filterTag,
    clubRegion,
    clubIntro,
    clubMaxMemberNo,
    clubName,
    clubState,
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
        direction='row'
        alignItems='center'
        spacing={12}
        justifyContent='center'
        margin={2}
      >
        <StyledToggleButtonGroup
          size='large'
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label='text alignment'
        >
          <ToggleButton value='2' onClick={() => onClickClubState(2)}>
            모집완료
          </ToggleButton>
          <ToggleButton value='1' onClick={() => onClickClubState(1)}>
            모집중
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Stack>
      <Stack
        spacing={0}
        direction='row'
        justifyContent='center'
        alignItems='center'
        sx={{ position: 'fixed', bottom: 5, left: 0, right: 0 }}
      >
        <Button
          variant='contained'
          sx={{ width: '85vw', borderRadius: '50px' }}
          onClick={handleSubmit}
        >
          수정하기
        </Button>
      </Stack>
    </Box>
  );
};

export default UpdateClubState;
