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
import { useNavigate, useParams } from 'react-router';
import AddUserReviewDialog from '@components/communication/AddUserReviewDialog';
import CustomedImageListItem from '@components/common/CustomedImageListItem';

const TemperatureLinearProgress = styled(LinearProgress)(({ theme }) => ({
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
  const navigate = useNavigate();

  const [imageLoadingError, setImageLoadingError] = useState(false);
  const [addUserReviewDialogOpen, setAddUserReviewDialogOpen] = useState(false);

  const handleImageError = useCallback(() => {
    setImageLoadingError(true);
  }, []);

  const { userNo } = useParams();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { data: userData, mutate: mutateUser } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/userno/${userNo}`,
    fetcher
  );

  const { data: userReviewData, mutate: mutateUserReview } = useSWR(
    `http://${
      import.meta.env.VITE_SPRING_HOST
    }/rest/community/userreview/reviewerno/${
      myData?.userNo
    }/reviewedno/${userNo}`,
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

  const onClickTemperature = useCallback(() => {
    if (userNo === myData?.userNo) {
      () => {};
    } else {
      if (userReviewData) {
        alert('이미 평가한 회원입니다!');
      } else {
        setAddUserReviewDialogOpen(true);
      }
    }
  }, [userReviewData, myData, userNo]);

  if (!userData || !myData) {
    <>로딩중..</>;
  }
  return (
    <>
      <ProfileTop userNo={userNo} />
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
                {userData?.mainTitleName}
              </Typography>
              <Typography sx={{ fontSize: 20 }}>
                {userData?.nickName}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <div onClick={onClickTemperature}>
          <Box
            sx={{
              marginTop: '30px',
              marginBottom: '30px',
              marginLeft: '30px',
              marginRight: '30px',
              justifyContent: 'center',
            }}
          >
            <TemperatureLinearProgress
              variant="determinate"
              value={userData?.temperature * 1.369}
            />
            <Typography>{userData?.temperature}°C</Typography>
          </Box>
        </div>
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
          <ImageList
            sx={{ width: 350, height: 100, ooverflow: 'hidden' }}
            cols={3}
            rowHeight={100}
          >
            <CustomedImageListItem
              src={`http://${
                import.meta.env.VITE_SPRING_HOST
              }/upload_images/user/${userData?.activityImg}`}
            />
            <CustomedImageListItem
              src={`http://${
                import.meta.env.VITE_SPRING_HOST
              }/upload_images/user/${userData?.activityImg2}`}
            />
            <CustomedImageListItem
              src={`http://${
                import.meta.env.VITE_SPRING_HOST
              }/upload_images/user/${userData?.activityImg3}`}
            />
          </ImageList>
        </Box>
        <ProfileMeetingClubTabs />
      </Box>
      {/* --------------------- Dialogs ----------------------------------- */}
      <AddUserReviewDialog
        open={addUserReviewDialogOpen}
        setOpen={setAddUserReviewDialogOpen}
        reviewerNo={myData?.userNo}
        reviewedNo={userNo}
      />
    </>
  );
};

export default GetProfile;
