import useClubFormStore from '@hooks/club/useClubFormStore';
import useInput from '@hooks/common/useInput';
import { Button, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';

const AddClub1 = () => {
  const [alignment, setAlignment] = useState('left');

  const {
    mainCategoryNo,
    filterTag,
    clubName,
    clubIntro,
    clubRegion,
    filterGender,
    filterMinAge,
    filterMaxAge,
    clubMaxMemberNo,
    file,
    setField,
    onChangeField,
    reset,
  } = useClubFormStore();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('mainCategoryNo', mainCategoryNo);
        formData.append('filterTag', filterTag);
        formData.append('clubName', clubName);
        formData.append('clubIntro', clubIntro);
        formData.append('clubRegion', clubRegion);
        formData.append('filterGender', filterGender);
        formData.append('filterMinAge', filterMinAge);
        formData.append('filterMaxAge', filterMaxAge);
        formData.append('clubMaxMemberNo', clubMaxMemberNo);
        formData.append('clubLeaderNo', myData.userNo);

        console.log(useClubFormStore.clubName);
        console.log(useClubFormStore.clubRegion);
        console.log(useClubFormStore.clubMaxMemberNo);

        const response = await axios.post(
          `${import.meta.env.VITE_SPRING_HOST}/rest/club`,
          formData
        );

        reset();

        navigate('/');

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [filterGender, filterMinAge, filterMaxAge, clubMaxMemberNo]
  );

  return (
    <Box>
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
          생성하기
        </Button>
      </Stack>
    </Box>
  );
};

export default AddClub1;
