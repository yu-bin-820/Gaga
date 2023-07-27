import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';
import { Button, TextField, ToggleButton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import useUpdateClubFormStore from '@stores/club/useUpdateClubFormStore';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import PropTypes from 'prop-types';

const UpdateClubState = ({ setSettingsUpdateClubOpen }) => {
  const { clubNo } = useParams();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const navigate = useNavigate();

  const {
    clubName,
    clubIntro,
    filterGender,
    filterMinAge,
    filterMaxAge,
    clubMaxMemberNo,
    clubState,
    clubImg,
    file,
    setField,
  } = useUpdateClubFormStore();

  const [alignment, setAlignment] = useState(clubState.toString());

  const { mutate: mutateClub } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/club/no/${clubNo}`,
    fetcher
  );

  const onClickClubState = (value) => {
    setField('clubState', value);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      try {
        const formData = new FormData();
        if (file) {
          formData.append('file', file);
        } else {
          formData.append('clubImg', clubImg);
        }
        formData.append('clubName', clubName);
        formData.append('clubIntro', clubIntro);
        formData.append('filterGender', filterGender);
        formData.append('filterMinAge', filterMinAge);
        formData.append('filterMaxAge', filterMaxAge);
        formData.append('clubMaxMemberNo', clubMaxMemberNo);
        formData.append('clubState', clubState);
        formData.append('clubNo', clubNo);

        console.log(formData);

        axios
          .patch(`${import.meta.env.VITE_SPRING_HOST}/rest/club`, formData)
          .then(mutateClub());

        setSettingsUpdateClubOpen(false);
      } catch (error) {
        console.error(error);
      }
    },
    [
      clubNo,
      clubImg,
      file,
      filterGender,
      filterMaxAge,
      filterMinAge,
      clubIntro,
      clubMaxMemberNo,
      clubName,
      clubState,
      setSettingsUpdateClubOpen,
      mutateClub,
    ]
  );

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
          <ToggleButton value="2" onClick={() => onClickClubState(2)}>
            모집완료
          </ToggleButton>
          <ToggleButton value="1" onClick={() => onClickClubState(1)}>
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

UpdateClubState.propTypes = {
  setSettingsUpdateClubOpen: PropTypes.func,
};

export default UpdateClubState;
