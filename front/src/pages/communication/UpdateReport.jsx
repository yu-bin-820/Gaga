import useInput from '@hooks/common/useInput';
import useInputOrigin from '@hooks/common/useInputOrigin';
import CommonTop from '@layouts/common/CommonTop';
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
import useCommunityStore from '@stores/communication/useCommunityStore';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';

const UpdateReport = () => {
  const navigate = useNavigate();
  const { reportNo, reportCategory } = useCommunityStore();

  const { data: reportData, mutate: mutateReport } = useSWR(
    `${
      import.meta.env.VITE_SPRING_HOST
    }/rest/community/report/reportno/${reportNo}`,
    fetcher
  );

  const [selectedImage, setSelectedImage] = useState(
    reportData?.reportImg
      ? `${import.meta.env.VITE_CDN_ORIGIN_HOST}/upload_images/community/${
          reportData?.reportImg
        }`
      : null
  );
  const [selectedImage2, setSelectedImage2] = useState(
    reportData?.reportImg2
      ? `${import.meta.env.VITE_CDN_ORIGIN_HOST}/upload_images/community/${
          reportData?.reportImg2
        }`
      : null
  );
  const [selectedImage3, setSelectedImage3] = useState(
    reportData?.reportImg3
      ? `${import.meta.env.VITE_CDN_ORIGIN_HOST}/upload_images/community/${
          reportData?.reportImg3
        }`
      : null
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);

  const [reportContent, onChangeReportContent, setReportContent] =
    useInputOrigin(reportData?.reportContent);

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

  const submitUpdateReport = useCallback(() => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('file2', selectedFile2);
    formData.append('file3', selectedFile3);
    formData.append('reportCategoryNo', reportData?.reportCategoryNo);
    formData.append('reportedNo', reportData?.reportedNo);
    formData.append('reportingNo', reportData?.reportingNo);
    formData.append('reportContent', reportContent);
    formData.append('reportNo', reportData?.reportNo);
    formData.append('reportDate', reportData?.reportDate);

    if (!selectedFile && reportData?.reportImg) {
      formData.append('reportImg', reportData?.reportImg);
    }

    if (!selectedFile2 && reportData?.reportImg2) {
      formData.append('reportImg2', reportData?.reportImg2);
    }

    if (!selectedFile3 && reportData?.reportImg3) {
      formData.append('reportImg3', reportData?.reportImg3);
    }

    axios
      .patch(
        `${import.meta.env.VITE_SPRING_HOST}/rest/community/report`,
        formData,
        { withCredentials: true }
      )
      .then(() => {
        mutateReport();
        navigate('/community/report');
      })
      .catch((error) => {
        console.log('error', reportData);
        console.dir(error);
      });
  }, [
    selectedFile,
    selectedFile2,
    selectedFile3,
    reportContent,
    reportData,
    navigate,
    mutateReport,
  ]);

  console.log(reportData);

  if (!reportData) {
    return <>로딩중</>;
  }
  return (
    <div>
      <CommonTop />
      <Box sx={{ marginTop: '10px', marginLeft: '10px', marginRight: '10px' }}>
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
              신고 항목
            </Typography>
            <Typography sx={{ fontSize: 13 }}>
              {reportCategory[reportData?.reportCategoryNo - 1]}
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
              autoFocus
              rows={4}
              defaultValue={reportData?.reportContent}
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
                sx={{ width: 320, height: 145 }}
                cols={3}
                rowHeight={145}
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
          <Button variant="contained" onClick={submitUpdateReport}>
            신고 수정
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default UpdateReport;
