import useInput from '@hooks/common/useInput';
import useInputOrigin from '@hooks/common/useInputOrigin';
import { PhotoCamera } from '@mui/icons-material';
import {
  Button,
  Divider,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';

const AddReport = () => {
  const navigate = useNavigate();
  const { categoryNo, reportedNo } = useParams();
  const [imageLoadingError, setImageLoadingError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [reportContent, onChangeReportContent, setReportContent] =
    useInputOrigin('');

  const [reportCategry, setReportCategory] = useState([
    '개인 연락처 또는 1:1 만남요구',
    'GAGA 취지에 반하는 모임 운영',
    'GAGA채팅이 아닌 외부 채팅방으로 유도',
    '비매너, 비협조적인 태도 등으로 모임 진행 방해',
    '비방, 폭언, 협박, 위협 등으로 불안감 조성',
    '성적 수치심, 불쾌감을 유발하는 발언',
    '특정 종교의 권유, 포교, 전도 목적 의심',
    '기타',
  ]);

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

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

  const submitReport = useCallback(() => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('file2', selectedFile2);
    formData.append('file3', selectedFile3);
    formData.append('reportCategoryNo', categoryNo);
    formData.append('reportedNo', reportedNo);
    formData.append('reportingNo', myData?.userNo);
    formData.append('reportContent', reportContent);
    axios
      .post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/community/report`,
        formData,
        { withCredentials: true }
      )
      .then(navigate('/'))
      .catch((error) => {
        console.dir(error);
      });
  }, [
    selectedFile,
    selectedFile2,
    selectedFile3,
    categoryNo,
    myData,
    reportedNo,
    reportContent,
  ]);

  return (
    <Box sx={{ marginTop: '64px', marginLeft: '10px', marginRight: '10px' }}>
      <Stack spacing={2.5}>
        <Stack spacing={1}>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
            신고 항목
          </Typography>
          <Typography sx={{ fontSize: 13 }}>
            {reportCategry[categoryNo - 1]}
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
            신고 사유
          </Typography>
          <Typography sx={{ fontSize: 13 }}>
            빠르고 정확한 신고 처리를 위해 <br />
            증빙자료를 꼭 첨부해주세요. <br />
            (증빙자료 예시: 채팅 내용 캡쳐 화면, 현장 사진 등)
          </Typography>
          <TextField
            id="reportReason"
            label="신고 사유"
            multiline
            rows={4}
            value={reportContent}
            onChange={onChangeReportContent}
          />
        </Stack>

        <Stack spacing={0} alignItems={'center'}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ImageList
              sx={{ width: 320, height: 140 }}
              cols={3}
              rowHeight={140}
            >
              <ImageListItem>
                <Stack spacing={0.5}>
                  {selectedImage ? (
                    <img
                      style={{
                        minWidth: '100px',
                        minHeight: '100px',
                        maxWidth: '100px',
                        maxHeight: '100px',
                      }}
                      src={selectedImage}
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
                        minWidth: '100px',
                        minHeight: '100px',
                        maxWidth: '100px',
                        maxHeight: '100px',
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
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{ maxWidth: '100px' }}
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
                </Stack>
              </ImageListItem>
              <ImageListItem>
                <Stack spacing={0.5}>
                  {selectedImage2 ? (
                    <img
                      style={{
                        minWidth: '100px',
                        minHeight: '100px',
                        maxWidth: '100px',
                        maxHeight: '100px',
                      }}
                      src={selectedImage2}
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
                        minWidth: '100px',
                        minHeight: '100px',
                        maxWidth: '100px',
                        maxHeight: '100px',
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
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{ maxWidth: '100px' }}
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
                </Stack>
              </ImageListItem>
              <ImageListItem>
                <Stack spacing={0.5}>
                  {selectedImage3 ? (
                    <img
                      style={{
                        minWidth: '100px',
                        minHeight: '100px',
                        maxWidth: '100px',
                        maxHeight: '100px',
                      }}
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

                        minWidth: '100px',
                        minHeight: '100px',
                        maxWidth: '100px',
                        maxHeight: '100px',
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
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{ maxWidth: '100px' }}
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
              </ImageListItem>
            </ImageList>
          </Box>
        </Stack>
        <Button variant="contained" onClick={submitReport}>
          신고하기
        </Button>
      </Stack>
    </Box>
  );
};

export default AddReport;
