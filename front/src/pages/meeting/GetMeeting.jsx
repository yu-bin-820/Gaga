import ListMeetingReview from '@components/meeting/ListMeetingReview';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PeopleIcon from '@mui/icons-material/People';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GetMeetingStaticMap from '@components/meeting/map/GetMeetingStaticMap';
import { Stack, styled } from '@mui/system';
import MeetingMember from '@components/meeting/MeetingMember';
import GetMeetingTop from '@layouts/meeting/GetMeetingTop';
import CommonTop from '@layouts/common/CommonTop';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SmallChip from '@components/meeting/SmallChip';
import IsMeetingMemberDialog from '@components/meeting/isMeetingMemberDialog';
import GetMeetingStaticMapDrawer from '@components/meeting/map/GetMeetingStaticMapDrawer';

const GetMeeting = () => {
  const { meetingno } = useParams();
  const [meeting, setMeeting] = useState();
  const [pendingMemberList, setPendingMemberList] = useState();
  const [confirmedMemberList, setConfirMemberList] = useState();
  const [isMeetingMemberOpen, setIsMeetingMemberOpen] = useState(false);

  const [settingsMapOpen, setSettingsMapOpen] = useState(false);

  const onClickSettings = useCallback(() => {
    // navigate('/settings');
    setSettingsMapOpen(true);
  }, []);

  const toggleSettingsMap = useCallback(
    (state) => () => {
      setSettingsMapOpen(state);
    },
    []
  );


  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { data: leaderData, mutate: mutateLeader } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/userno/${
      meeting?.meetingLeaderNo
    }`,
    fetcher
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`)
      .then((response) => {
        console.log(response.data);
        setMeeting(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/user/list/grouptype/2/no/${meetingno}/state/2`
      )
      .then((response) => {
        console.log(response.data);
        setConfirMemberList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/user/list/grouptype/2/no/${meetingno}/state/1`
      )
      .then((response) => {
        console.log(response.data);
        setPendingMemberList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickAddMember = useCallback((event) => {
    const isUserInConfirmedMembers = confirmedMemberList.some(
      (confirmedMember) => confirmedMember.userNo === myData?.userNo
    );

    const isUserInPendingMembers = pendingMemberList.some(
      (pendingMember) => pendingMember.userNo === myData?.userNo
    );
    
    if (!isUserInConfirmedMembers && !isUserInPendingMembers ) {
      navigate(`/meeting/member/addmember/${meetingno}`);
    } else {
      setIsMeetingMemberOpen(true);
    }
  }, [confirmedMemberList, myData?.userNo, navigate]);


  const [imageLoadingError, setImageLoadingError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageLoadingError(true);
  }, []);

  const isUserLeader = meeting?.meetingLeaderNo === myData?.userNo;
  const isMeetingSuccessful = meeting?.meetingSuccess === 2;

  if (!leaderData) {
    return <>로딩중</>;
  }
  return (
    <>
      {isUserLeader && !isMeetingSuccessful ? (
        <GetMeetingTop />
      ) : (
        <CommonTop />
      )}
      <Box
        sx={{
          marginTop: '50px',
          marginBottom: '64px',
          marginLeft: '10px',
          marginRight: '10px',
        }}
      >
        {meeting?.meetingImg ? (
          <img
            src={`${import.meta.env.VITE_SPRING_HOST}/upload_images/meeting/${
              meeting?.meetingImg
            }`}
            alt="noImg"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <img
            src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c`}
          />
        )}

        <Stack spacing={1}>
          <Box>
            <SmallChip label={meeting?.filterTag} />
          </Box>
          <Typography variant="h3" sx={{ fontSize: 16 }}>
            {meeting?.meetingName}
          </Typography>

          <MeetingMember member={leaderData} />

          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <PeopleIcon />
            <Typography sx={{ fontSize: 13 }}>
              {meeting?.count}/{meeting?.meetingMaxMemberNo}
            </Typography>
          </Stack>

          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <CalendarMonthIcon />
            <Typography sx={{ fontSize: 13 }}>
              {meeting?.meetingDate}
            </Typography>
          </Stack>

          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <QueryBuilderIcon />
            <Typography sx={{ fontSize: 13 }}>
              {meeting?.meetingStartTime} ~ {meeting?.meetingEndTime}
            </Typography>
          </Stack>

          <Typography sx={{ fontSize: 16 }}>모임 소개</Typography>

          <Typography sx={{ fontSize: 13 }}>{meeting?.meetingIntro}</Typography>

          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <LocationOnIcon />
            <Typography sx={{ fontSize: 13 }}>
              {meeting?.meetingAddr}
            </Typography>
          </Stack>

          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Typography sx={{ marginLeft: '34px', fontSize: 13 }}>
              {meeting?.meetingDetailAddr}
            </Typography>
          </Stack>
        </Stack>
        <br />
        {meeting && (
          <Box
          onClick={onClickSettings}>
            <GetMeetingStaticMap 
            meeting={meeting} />
          </Box>
        )}
        <h5>확정 멤버</h5>
        {confirmedMemberList?.map((confirmedMember, i) => (
          <MeetingMember key={i} member={confirmedMember} />
        ))}
        <h5>신청 멤버</h5>
        {pendingMemberList?.map((pendingMember, i) => (
          <MeetingMember key={i} member={pendingMember} />
        ))}
        <h5>리뷰</h5>
        <ListMeetingReview />
        <Stack
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'fixed', bottom: 5, left: 0, right: 0 }}
        >
        {!isUserLeader && !isMeetingSuccessful && (
          <Button
            variant="contained"
            sx={{ width: '85vw', borderRadius: '50px' }}
            onClick={onClickAddMember}
          >
            참여하기
          </Button>
        )}
        </Stack>
      </Box>
      <IsMeetingMemberDialog
      open={isMeetingMemberOpen}
      setOpen={setIsMeetingMemberOpen}/>
      <GetMeetingStaticMapDrawer
        meeting={meeting}
        settingsMapOpen={settingsMapOpen}
        toggleSettingsMap={toggleSettingsMap}
        setSettingsMapOpen={setSettingsMapOpen} />
    </>
  );
};

export default GetMeeting;
