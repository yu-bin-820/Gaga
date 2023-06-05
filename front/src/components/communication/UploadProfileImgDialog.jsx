import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { Avatar, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { Stack } from '@mui/system';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

export default function UploadProfileImgDialog({ open, setOpen }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeProfileImg = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const submitUploadProfileImgDialog = useCallback(() => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .patch(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/community/profileimg/userno/${myData?.userNo}`,
        formData,
        { withCredentials: true }
      )
      .then(() => {
        setOpen(false);
        mutateMe();
      })
      .catch((error) => {
        console.dir(error);
      });
  }, [selectedFile, myData, mutateMe, setOpen]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>프로필 이미지 변경</DialogTitle>
        <DialogContent
          sx={{
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Stack spacing={2} alignItems={'center'}>
            <Avatar
              sx={{ width: 76, height: 76 }}
              src={selectedImage}
              alt="Selected Image Preview"
            />

            <Button
              variant="outlined"
              startIcon={<PhotoCamera />}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              사진 선택
              <input
                hidden
                accept="image/*"
                type="file"
                id="file"
                name="file"
                onChange={onChangeProfileImg}
              />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={submitUploadProfileImgDialog}>변경</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
UploadProfileImgDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
