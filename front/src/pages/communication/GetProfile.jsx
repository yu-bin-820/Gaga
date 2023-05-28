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
import { useParams } from 'react-router';

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
  const [imageLoadingError, setImageLoadingError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageLoadingError(true);
  }, []);

  const { userNo } = useParams();
  const { data: userData, mutate: mutateUser } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/userno/${userNo}`,
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
  if (!userData) {
    <>로딩중..</>;
  }
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
              alt={userData?.nickName}
              src={`http://${
                import.meta.env.VITE_SPRING_HOST
              }/upload_images/user/${userData?.profileImg}`}
              sx={{ width: 76, height: 76 }}
            />
            <Stack direction="column" spacing={0} alignItems="center">
              <Typography sx={{ fontSize: 15 }}>
                {userData?.mainTitleNo}
              </Typography>
              <Typography sx={{ fontSize: 20 }}>
                {userData?.nickName}
              </Typography>
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
            value={userData?.temperature * 1.369}
          />
          <Typography>{userData?.temperature}°C</Typography>
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
          <Typography>{userData?.userIntro}</Typography>
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
          {userData?.filterTag && <Chip label={userData?.filterTag} />}
          {userData?.filterTag2 && <Chip label={userData?.filterTag2} />}
          {userData?.filterTag3 && <Chip label={userData?.filterTag3} />}
        </Stack>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ImageList sx={{ width: 350, height: 100 }} cols={3} rowHeight={100}>
            <ImageListItem>
              {!imageLoadingError ? (
                <img
                  src={`http://${
                    import.meta.env.VITE_SPRING_HOST
                  }/upload_images/user/${userData?.activityImg}`}
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
            <ImageListItem>
              {!imageLoadingError ? (
                <img
                  src={`http://${
                    import.meta.env.VITE_SPRING_HOST
                  }/upload_images/user/${userData?.activityImg2}`}
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
            <ImageListItem>
              {!imageLoadingError ? (
                <img
                  src={`http://${
                    import.meta.env.VITE_SPRING_HOST
                  }/upload_images/user/${userData?.activityImg3}`}
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
        <ProfileMeetingClubTabs />
      </Box>
    </>
  );
};

export default GetProfile;
