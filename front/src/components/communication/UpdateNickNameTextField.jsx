import { IconButton, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useCallback } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import useInputOrigin from '@hooks/common/useInputOrigin';
import PropTypes from 'prop-types';
import axios from 'axios';

const UpdateNickNameTextField = ({ isUpdateNickName, setIsUpdateNickName }) => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const [nickName, onChangeNickName, setNickName] = useInputOrigin(
    myData?.nickName
  );
  const onKeyDownUpdateNickName = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (nickName?.trim()) {
          myData.nickName = nickName;

          axios
            .patch(
              `${
                import.meta.env.VITE_SPRING_HOST
              }/rest/community/profile`,
              myData,
              { withCredentials: true }
            )
            .then(() => {
              mutateMe();
              setIsUpdateNickName(!isUpdateNickName);
            })
            .catch((error) => {
              console.dir(error);
            });
        } else {
          alert('닉네임을 입력해 주세요');
        }
      }
    },
    [isUpdateNickName, myData, nickName, mutateMe, setIsUpdateNickName]
  );

  return (
    <TextField
      id="outlined-multiline-static"
      label="닉네임"
      defaultValue={myData?.nickName}
      value={nickName}
      onChange={onChangeNickName}
      autoFocus
      sx={{ marginLeft: 0, width: '150px' }}
      onKeyDown={onKeyDownUpdateNickName}
    />
  );
};
UpdateNickNameTextField.propTypes = {
  isUpdateNickName: PropTypes.bool,
  setIsUpdateNickName: PropTypes.func,
};
export default UpdateNickNameTextField;
