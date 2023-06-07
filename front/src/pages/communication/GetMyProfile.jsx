import ListMyMeeting from '@components/meeting/ListMyMeeting';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MainBottomNav from '@layouts/common/MainBottomNav';
import MyProfileTop from '@layouts/communication/MyProfileTop';
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  ImageList,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import ProfileMeetingClubTabs from '@components/communication/ProfileMeetingClubTabs';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import UploadProfileImgDialog from '@components/communication/UploadProfileImgDialog';
import UploadActivityImgDialog from '@components/communication/UploadActivityImgDialog';
import CustomedImageListItem from '@components/common/CustomedImageListItem';
import useInputOrigin from '@hooks/common/useInputOrigin';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import UpdateUserIntroTextField from '@components/communication/UpdateUserIntroTextField';
import UpdateNickNameTextField from '@components/communication/UpdateNickNameTextField';
import TitleListDialog from '@components/communication/TitleListDialog';

const TeperatureLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? 'orange' : '#308fe8',
  },
}));

const GetMyProfile = () => {
  const [uploadProfileImgDialogOpen, setUploadProfileImgDialogOpen] =
    useState(false);
  const [uploadActivityImgDialogOpen, setUploadActivityImgDialogOpen] =
    useState(false);
  const [isUpdateIntro, setIsUpdateIntro] = useState(false);
  const [isUpdateNickName, setIsUpdateNickName] = useState(false);
  const [updateMainTitleOpen, setUpdateMainTitleOpen] = useState(false);
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const boxRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 430) {
        window.scrollTo(0, 430);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onClickProfileImg = useCallback(() => {
    setUploadProfileImgDialogOpen(true);
  }, []);

  const onClickActivityImg = useCallback(() => {
    setUploadActivityImgDialogOpen(true);
  }, []);

  const onClickUpdateIntro = useCallback(() => {
    setIsUpdateIntro(!isUpdateIntro);
  }, [isUpdateIntro]);

  const onClickUpdateNickName = useCallback(() => {
    setIsUpdateNickName(!isUpdateNickName);
  }, [isUpdateNickName]);

  const onClickUpdateMainTitle = useCallback(() => {
    setUpdateMainTitleOpen(true);
  }, []);

  return (
    <>
      <MyProfileTop />
      <Box
        sx={{
          marginTop: '74px',
          marginBottom: '64px',
          overflowY: 'auto',
          maxHeight: '100%',
        }}
        ref={boxRef}
      >
        <Box
          sx={{
            margin: '10px',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Stack
            id={'profileTopContainer'}
            direction={'row'}
            spacing={0}
            alignItems={'center'}
            sx={{ maxWidth: '80vw' }}
          >
            <div onClick={onClickProfileImg}>
              <Avatar
                alt={myData?.nickName}
                src={`${import.meta.env.VITE_SPRING_HOST}/upload_images/user/${
                  myData?.profileImg
                }`}
                sx={{ width: 76, height: 76, marginRight: '100px' }}
              />
            </div>
            <Stack
              direction="column"
              spacing={0}
              alignItems="center"
              sx={{ marginRight: 'auto' }}
            >
              <Button onClick={onClickUpdateMainTitle}>대표 타이틀 변경</Button>
              <Typography sx={{ fontSize: 15 }}>
                {myData?.mainTitleName}
              </Typography>
              {!isUpdateNickName && (
                <div onClick={onClickUpdateNickName}>
                  <Typography sx={{ fontSize: 20 }}>
                    {myData?.nickName}
                  </Typography>
                </div>
              )}

              {isUpdateNickName && (
                <UpdateNickNameTextField
                  isUpdateNickName={isUpdateNickName}
                  setIsUpdateNickName={setIsUpdateNickName}
                />
              )}
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            marginTop: '30px',
            marginBottom: '30px',
            marginLeft: '30px',
            marginRight: '30px',
            justifyContent: 'center',
          }}
        >
          <TeperatureLinearProgress
            variant="determinate"
            value={myData?.temperature * 1.369}
          />
          <Typography>{myData?.temperature}°C</Typography>
        </Box>
        {!isUpdateIntro && (
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
            <Typography>
              {myData?.userIntro?.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </Typography>
            <IconButton
              sx={{ marginLeft: 'auto' }}
              onClick={onClickUpdateIntro}
            >
              <EditNoteIcon />
            </IconButton>
          </Stack>
        )}
        {isUpdateIntro && (
          <UpdateUserIntroTextField
            isUpdateIntro={isUpdateIntro}
            setIsUpdateIntro={setIsUpdateIntro}
          />
        )}
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            marginTop: '30px',

            marginLeft: '30px',
            marginRight: '30px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {myData?.filterTag && <Chip label={myData?.filterTag} />}
          {myData?.filterTag2 && <Chip label={myData?.filterTag2} />}
          {myData?.filterTag3 && <Chip label={myData?.filterTag3} />}
        </Stack>
        <div onClick={onClickActivityImg}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ImageList
              sx={{ width: 350, height: 100, overflow: 'hidden' }}
              cols={3}
              rowHeight={100}
            >
              <CustomedImageListItem
                src={`${import.meta.env.VITE_SPRING_HOST}/upload_images/user/${
                  myData?.activityImg
                }`}
              />
              <CustomedImageListItem
                src={`${import.meta.env.VITE_SPRING_HOST}/upload_images/user/${
                  myData?.activityImg2
                }`}
              />
              <CustomedImageListItem
                src={`${import.meta.env.VITE_SPRING_HOST}/upload_images/user/${
                  myData?.activityImg3
                }`}
              />
            </ImageList>
          </Box>
        </div>
        <ProfileMeetingClubTabs />
      </Box>
      <MainBottomNav pageName={'profile'} />
      {/* ------------------------------ Modals------------------------- */}
      <UploadProfileImgDialog
        open={uploadProfileImgDialogOpen}
        setOpen={setUploadProfileImgDialogOpen}
      />
      <UploadActivityImgDialog
        open={uploadActivityImgDialogOpen}
        setOpen={setUploadActivityImgDialogOpen}
      />
      <TitleListDialog
        open={updateMainTitleOpen}
        setOpen={setUpdateMainTitleOpen}
        myData={myData}
        mutateMe={mutateMe}
      />
    </>
  );
};

export default GetMyProfile;
