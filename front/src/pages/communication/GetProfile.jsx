import ListMyMeeting from '@components/meeting/ListMyMeeting';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MainBottomNav from '@layouts/common/MainBottomNav';
import ProfileTop from '@layouts/communication/ProfileTop';
import {
  Avatar,
  BottomNavigation,
  Chip,
  IconButton,
  ImageList,
  ImageListItem,
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

const GetProfile = () => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
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

  return (
    <>
      <ProfileTop />
      <Box
        sx={{
          marginTop: '64px',
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
          <Stack direction={'row'} spacing={10} alignItems={'center'}>
            <Avatar
              alt={myData?.nickName}
              src={`http://${
                import.meta.env.VITE_SPRING_HOST
              }/upload_images/user/${myData?.profileImg}`}
              sx={{ width: 76, height: 76 }}
            />
            <Stack direction="column" spacing={0} alignItems="center">
              <Typography sx={{ fontSize: 15 }}>
                {myData?.mainTitleNo}
              </Typography>
              <Typography sx={{ fontSize: 20 }}>{myData?.nickName}</Typography>
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
          <Typography>{myData?.userIntro}</Typography>
          <IconButton sx={{ marginLeft: 'auto' }}>
            <EditNoteIcon />
          </IconButton>
        </Stack>
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ImageList sx={{ width: 350, height: 100 }} cols={3} rowHeight={100}>
            <ImageListItem>
              <img
                src={`http://${
                  import.meta.env.VITE_SPRING_HOST
                }/upload_images/user/${myData?.activityImg}`}
                alt={`http://${
                  import.meta.env.VITE_SPRING_HOST
                }/upload_images/common/no_image.jpg`}
                loading="lazy"
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={`http://${
                  import.meta.env.VITE_SPRING_HOST
                }/upload_images/user/${myData?.activityImg2}`}
                alt="noImg"
                loading="lazy"
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={`http://${
                  import.meta.env.VITE_SPRING_HOST
                }/upload_images/user/${myData?.activityImg3}`}
                alt="noImg"
                loading="lazy"
              />
            </ImageListItem>
          </ImageList>
        </Box>
        <ProfileMeetingClubTabs />
      </Box>

      <MainBottomNav pageName={'profile'} />
    </>
  );
};

export default GetProfile;
