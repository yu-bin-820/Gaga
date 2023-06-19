import CustomedImageListItem from '@components/common/CustomedImageListItem';
import CommonTop from '@layouts/common/CommonTop';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ImageList,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import useCommunityStore from '@stores/communication/useCommunityStore';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';
const GetReport = () => {
  const navigate = useNavigate();
  const { reportNo, reportCategory, prevPath } = useCommunityStore();
  const [deleteReportDialogOpen, setDeleteReportDialogOpen] = useState(false);

  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { data: reportData } = useSWR(
    `${
      import.meta.env.VITE_SPRING_HOST
    }/rest/community/report/reportno/${reportNo}`,
    fetcher
  );

  const { mutate: mutateReportList } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/community/report/list/userno/${
      myData?.userNo
    }/role/${myData?.role}`,
    fetcher
  );

  console.log(reportData);

  const onCloseDeleteReportDialog = useCallback(() => {
    setDeleteReportDialogOpen(false);
  }, []);

  const onClickDeleteReport = useCallback(() => {
    setDeleteReportDialogOpen(true);
  }, []);

  const onClickUpdateReport = useCallback(() => {
    navigate('/community/report/update');
  }, [navigate]);

  const onClickDeleteReportConfirm = useCallback(() => {
    axios
      .delete(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/community/report/reportno/${reportNo}`,
        {
          withCredentials: true,
        }
      )
      .then(() => {
        mutateReportList();
        navigate('/community/report/list');
      });
  }, [reportNo, navigate, mutateReportList]);

  if (!reportData) {
    return <>로딩중</>;
  }

  return (
    <>
      <CommonTop pageName="신고 상세 조회" prevPath={prevPath} />
      <Box sx={{ marginTop: '73px', marginLeft: '15px', marginRight: '15px' }}>
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
              신고자 ID
            </Typography>
            <Typography sx={{ fontSize: 13 }}>
              {reportData?.reportingId}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
              피신고자 ID
            </Typography>
            <Typography sx={{ fontSize: 13 }}>
              {reportData?.reportedId}
            </Typography>
          </Stack>
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
              {reportData?.reportContent}
            </Typography>
          </Stack>
          <Stack spacing={0}>
            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
              신고 사진
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack sx={{ marginTop: '10px' }} spacing={2}>
                {reportData?.reportImg && (
                  <img
                    src={`${
                      import.meta.env.VITE_CDN_ORIGIN_HOST
                    }/upload_images/community/${reportData?.reportImg}`}
                    loading="lazy"
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '30vh',
                    }}
                  />
                )}
                {reportData?.reportImg2 && (
                  <img
                    src={`${
                      import.meta.env.VITE_CDN_ORIGIN_HOST
                    }/upload_images/community/${reportData?.reportImg2}`}
                    loading="lazy"
                    style={{ maxWidth: '80vw', maxHeight: '30vh' }}
                  />
                )}
                {reportData?.reportImg3 && (
                  <img
                    src={`${
                      import.meta.env.VITE_CDN_ORIGIN_HOST
                    }/upload_images/community/${reportData?.reportImg3}`}
                    loading="lazy"
                    style={{ maxWidth: '80vw', maxHeight: '30vh' }}
                  />
                )}
              </Stack>
            </Box>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <Button
              sx={{ flexGrow: 1, backgroundColor: 'grey' }}
              variant="contained"
              onClick={onClickDeleteReport}
            >
              신고 삭제
            </Button>
            <Button
              sx={{ flexGrow: 1 }}
              variant="contained"
              onClick={onClickUpdateReport}
            >
              신고 수정
            </Button>
          </Stack>
        </Stack>
      </Box>
      {/* ---------------------------------- 다이얼로그 ----------------------------------------------- */}
      <Dialog open={deleteReportDialogOpen} onClose={onCloseDeleteReportDialog}>
        <DialogTitle>{'신고 삭제'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            신고를 삭제합니다.
            <br />
            삭제된 신고는 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeleteReportDialog}>취소</Button>
          <Button autoFocus onClick={onClickDeleteReportConfirm}>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GetReport;
