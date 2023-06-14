import useInputOrigin from '@hooks/common/useInputOrigin';
import useLimitInput from '@hooks/common/useLimitInput';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import fetcher from '@utils/fetcher';
import getByteLength from '@utils/getByteLength';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

const UpdateNickNameDialog = ({ open, setOpen }) => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const [nickName, onChangeNickName, setNickName, nickNameLength] =
    useLimitInput('', 10);

  const onCloseUpdateNickNameDialog = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const submitUpdateNickName = useCallback(() => {
    if (nickName?.trim()) {
      myData.nickName = nickName;

      axios
        .patch(
          `${import.meta.env.VITE_SPRING_HOST}/rest/community/profile`,
          myData,
          { withCredentials: true }
        )
        .then(() => {
          mutateMe();
          onCloseUpdateNickNameDialog();
        })
        .catch((error) => {
          console.dir(error);
        });
    }
  }, [mutateMe, myData, nickName, onCloseUpdateNickNameDialog]);

  const onKeyDownSubmitUpdateNickName = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (nickName?.trim()) {
          submitUpdateNickName();
        }
      }
    },
    [nickName, submitUpdateNickName]
  );

  if (!myData) {
    <div>로딩중</div>;
  }
  return (
    <div>
      <Dialog open={open} onClose={onCloseUpdateNickNameDialog}>
        <DialogTitle>닉네임 변경</DialogTitle>
        <DialogContent>
          <DialogContentText>닉네임을 입력해 주세요.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="10글자 이내"
            fullWidth
            variant="standard"
            value={nickName}
            onChange={onChangeNickName}
            helperText={`${nickNameLength}/30 bytes`}
            sx={{ minWidth: '200px' }}
            onKeyDown={onKeyDownSubmitUpdateNickName}
          />
          {getByteLength(nickName) === 0 && (
            <Typography sx={{ fontSize: 12, color: 'orange' }}>
              닉네임은 한 글자 이상 입력해주세요
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onCloseUpdateNickNameDialog}>취소</Button>
          <Button onClick={submitUpdateNickName}>변경</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

UpdateNickNameDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default UpdateNickNameDialog;
