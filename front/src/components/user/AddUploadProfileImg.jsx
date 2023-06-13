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

export default function AddUploadProfileImg({ open, setOpen, onUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  AddUploadProfileImg.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    onUpload: PropTypes.func, // 이 줄을 추가하세요.
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onChangeProfileImg = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const submitAddUploadProfileImg = useCallback(() => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/community/profileimg/upload`,
        formData,
        { withCredentials: true }
      )
      .then((response) => {
        setOpen(false);
        // 파일 이름을 가져와서 부모 컴포넌트에 전달합니다.
        const filename = response.data.filename;
        onUpload(filename);
      })
      .catch((error) => {
        console.dir(error);
      });
  }, [selectedFile, onUpload, setOpen]);


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
          <Button onClick={submitAddUploadProfileImg}>변경</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddUploadProfileImg.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
