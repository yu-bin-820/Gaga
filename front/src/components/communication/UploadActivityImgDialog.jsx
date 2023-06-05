import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import {
  Avatar,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

export default function UploadActivityImgDialog({ open, setOpen }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [imageLoadingError, setImageLoadingError] = useState(false);

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeActivityImg = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const onChangeActivityImg2 = (event) => {
    const file = event.target.files[0];
    setSelectedFile2(file);
    setSelectedImage2(URL.createObjectURL(file));
  };

  const onChangeActivityImg3 = (event) => {
    const file = event.target.files[0];
    setSelectedFile3(file);
    setSelectedImage3(URL.createObjectURL(file));
  };

  const handleImageError = useCallback(() => {
    setImageLoadingError(true);
  }, []);

  const submitUploadProfileImgDialog = useCallback(() => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('file2', selectedFile2);
    formData.append('file3', selectedFile3);

    axios
      .patch(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/community/activityimg/userno/${myData?.userNo}`,
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
  }, [selectedFile, selectedFile2, selectedFile3, myData, mutateMe, setOpen]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>활동 사진 변경</DialogTitle>
        <DialogContent
          sx={{
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Stack spacing={0} alignItems={'center'}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ImageList
                sx={{ width: 250, height: 80 }}
                cols={3}
                rowHeight={80}
              >
                <ImageListItem>
                  {selectedImage ? (
                    <img src={selectedImage} />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'grey',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1.2rem',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        No Img
                      </Typography>
                    </Box>
                  )}
                </ImageListItem>
                <ImageListItem>
                  {selectedImage2 ? (
                    <img src={selectedImage2} />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'grey',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1.2rem',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        No Img
                      </Typography>
                    </Box>
                  )}
                </ImageListItem>
                <ImageListItem>
                  {selectedImage3 ? (
                    <img
                      src={selectedImage3}
                      alt="noImg"
                      loading="lazy"
                      onError={handleImageError}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'grey',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1.2rem',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        No Img
                      </Typography>
                    </Box>
                  )}
                </ImageListItem>
              </ImageList>
            </Box>
            <Stack direction={'row'} spacing={3}>
              <Button
                variant="outlined"
                startIcon={<PhotoCamera />}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                1
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  id="file"
                  name="file"
                  onChange={onChangeActivityImg}
                />
              </Button>

              <Button
                variant="outlined"
                startIcon={<PhotoCamera />}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                2
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  id="file2"
                  name="file2"
                  onChange={onChangeActivityImg2}
                />
              </Button>

              <Button
                variant="outlined"
                startIcon={<PhotoCamera />}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                3
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  id="file3"
                  name="file3"
                  onChange={onChangeActivityImg3}
                />
              </Button>
            </Stack>
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
UploadActivityImgDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
