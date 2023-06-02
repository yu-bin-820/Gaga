import { IconButton, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useCallback } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import useInputOrigin from '@hooks/common/useInputOrigin';
import PropTypes from 'prop-types';
import axios from 'axios';

const UpdateUserIntroTextField = ({ isUpdateIntro, setIsUpdateIntro }) => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const [userIntro, onChangeUserIntro, setUserIntro] = useInputOrigin(
    myData?.userIntro
  );
  const onClickUpdateIntro = useCallback(() => {
    axios
      .patch(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/community/userintro`,
        { userNo: myData?.userNo, userIntro: userIntro },
        { withCredentials: true }
      )
      .then(() => {
        mutateMe();
        setIsUpdateIntro(!isUpdateIntro);
      })
      .catch((error) => {
        console.dir(error);
      });
  }, [isUpdateIntro, myData, userIntro, mutateMe, setIsUpdateIntro]);
  return (
    <Stack
      direction={'row'}
      sx={{
        marginTop: '30px',
        marginBottom: '30px',
        marginLeft: '30px',
        marginRight: '30px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        id="outlined-multiline-static"
        label="내 소개"
        multiline
        rows={3}
        defaultValue={myData?.userIntro}
        sx={{ width: '100%' }}
        value={userIntro}
        onChange={onChangeUserIntro}
        autoFocus
      />

      <IconButton sx={{ marginLeft: 'auto' }} onClick={onClickUpdateIntro}>
        <CheckIcon />
      </IconButton>
    </Stack>
  );
};
UpdateUserIntroTextField.propTypes = {
  isUpdateIntro: PropTypes.bool,
  setIsUpdateIntro: PropTypes.func,
};
export default UpdateUserIntroTextField;
