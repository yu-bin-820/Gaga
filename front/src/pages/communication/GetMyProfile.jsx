import ListMyMeeting from '@components/meeting/ListMyMeeting';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditIcon from '@mui/icons-material/Edit';
import MainBottomNav from '@layouts/common/MainBottomNav';
import MyProfileTop from '@layouts/communication/MyProfileTop';
import {
  Avatar,
  Badge,
  Button,
  Chip,
  IconButton,
  ImageList,
  LinearProgress,
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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axios from 'axios';
import UpdateUserIntroTextField from '@components/communication/UpdateUserIntroTextField';
import UpdateNickNameTextField from '@components/communication/UpdateNickNameTextField';
import TitleListDialog from '@components/communication/TitleListDialog';
import UpdateNickNameDialog from '@components/communication/UpdateNickNameDialog';

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
  const [updateNickNameDialogOpen, setUpdateNickNameDialogOpen] =
    useState(false);
  const [updateMainTitleOpen, setUpdateMainTitleOpen] = useState(false);

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { mutate: mutateTitleList } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/community/title/list/userno/${
      myData?.userNo
    }`,
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
    setUpdateNickNameDialogOpen(true);
  }, []);

  const onClickUpdateMainTitle = useCallback(() => {
    axios
      .post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/community/title/userno/${
          myData?.userNo
        }`
      )
      .then(() => {
        mutateTitleList();
      })
      .catch((error) => {
        console.dir(error);
      });
    setUpdateMainTitleOpen(true);
  }, [mutateTitleList, myData]);

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
            spacing={8}
            alignItems={'center'}
            sx={{ maxWidth: '80vw' }}
          >
            <div onClick={onClickProfileImg}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Box
                    sx={{
                      borderRadius: '20rem',
                      padding: '3px',
                      backgroundColor: 'grey',
                    }}
                  >
                    <EditIcon sx={{ color: 'white', fontSize: 15 }} />
                  </Box>
                }
              >
                <Avatar
                  alt={myData?.nickName}
                  src={`${import.meta.env.VITE_CDN_HOST}/upload_images/user/${
                    myData?.profileImg
                  }?type=f_sh&w=76&h=76&autorotate=false&faceopt=true&sharp_amt=1.0`}
                  sx={{ width: 76, height: 76 }}
                />
              </Badge>
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

              <div onClick={onClickUpdateNickName}>
                <Stack direction={'row'}>
                  <Typography sx={{ fontSize: 20 }}>
                    {myData?.nickName}
                  </Typography>
                  <BorderColorIcon
                    sx={{ marginTop: '8px', fontSize: 15, color: 'grey' }}
                  />
                </Stack>
              </div>
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
                src={`${import.meta.env.VITE_CDN_HOST}/upload_images/user/${
                  myData?.activityImg
                }?type=f_sh&w=100&h=100&faceopt=true&sharp_amt=1.0`}
              />
              <CustomedImageListItem
                src={`${import.meta.env.VITE_CDN_HOST}/upload_images/user/${
                  myData?.activityImg2
                }?type=f_sh&w=100&h=100&faceopt=true&sharp_amt=1.0`}
              />
              <CustomedImageListItem
                src={`${import.meta.env.VITE_CDN_HOST}/upload_images/user/${
                  myData?.activityImg3
                }?type=f_sh&w=100&h=100&faceopt=true&sharp_amt=1.0`}
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
      <UpdateNickNameDialog
        open={updateNickNameDialogOpen}
        setOpen={setUpdateNickNameDialogOpen}
      />
    </>
  );
};

export default GetMyProfile;
