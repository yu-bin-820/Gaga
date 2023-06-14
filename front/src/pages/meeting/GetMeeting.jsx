import ListMeetingReview from '@components/meeting/ListMeetingReview';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import PeopleIcon from '@mui/icons-material/People';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GetMeetingStaticMap from '@components/meeting/map/GetMeetingStaticMap';
import { Stack } from '@mui/system';
import MeetingMember from '@components/meeting/MeetingMember';
import GetMeetingTop from '@layouts/meeting/GetMeetingTop';
import CommonTop from '@layouts/common/CommonTop';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SmallChip from '@components/meeting/SmallChip';
import IsMeetingMemberDialog from '@components/meeting/IsMeetingMemberDialog';
import GetMeetingStaticMapDrawer from '@components/meeting/map/GetMeetingStaticMapDrawer';
import PaymentIcon from '@mui/icons-material/Payment';
import AddMeetingMemberDrawer from '@components/meeting/AddMeetingMemberDrawer';

const GetMeeting = () => {
  
  const { meetingno } = useParams();
  const [isMeetingMemberOpen, setIsMeetingMemberOpen] = useState(false);
  const [settingsAddMemberOpen, setSettingsAddMemberOpen] = useState(false);

  const {data : meeting } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`,
    fetcher
);

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

  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { data: leaderData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/userno/${
      meeting?.meetingLeaderNo
    }`,
    fetcher
  );

  const {data : confirmedMemberList } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/list/grouptype/2/no/${meetingno}/state/2`,
    fetcher
);

const {data : pendingMemberList } = useSWR(
  `${import.meta.env.VITE_SPRING_HOST}/rest/user/list/grouptype/2/no/${meetingno}/state/2`,
  fetcher
);

  const onClickAddMember = useCallback(
    () => {
      const isUserInConfirmedMembers = confirmedMemberList?.some(
        (confirmedMember) => confirmedMember.userNo === myData?.userNo
      );

      const isUserInPendingMembers = pendingMemberList?.some(
        (pendingMember) => pendingMember.userNo === myData?.userNo
      );

      if (!isUserInConfirmedMembers && !isUserInPendingMembers) {

        setSettingsAddMemberOpen(true);

      } else {
        setIsMeetingMemberOpen(true);
      }
    },
    [confirmedMemberList, myData?.userNo, pendingMemberList]
  );

  const toggleSettingsAddMember = useCallback(
    (state) => () => {
        setSettingsAddMemberOpen(state);
    },
    []
  );

  const [setImageLoadingError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageLoadingError(true);
  }, [setImageLoadingError]);

  const isUserLeader = meeting?.meetingLeaderNo === myData?.userNo;
  const isMeetingSuccessful = meeting?.meetingSuccess === 2;

  if (!leaderData) {
    return (
      <Skeleton variant="rectangular" width={'100vw'} height={'100vh'} />

    );
  }
  return (
    <>
      {isUserLeader && !isMeetingSuccessful ? <GetMeetingTop /> : <CommonTop />}
      <Box
        sx={{
          marginTop: '64px',
          marginBottom: '64px',
          marginLeft: '10px',
          marginRight: '10px',
        }}
      >
        {meeting?.meetingImg ? (
          <img
            src={`${import.meta.env.VITE_CDN_HOST}/upload_images/meeting/${
              meeting?.meetingImg
            }?type=f_sh&w=400&h=250&faceopt=true&sharp_amt=1.0`}
            alt="noImg"
            loading="lazy"
            onError={handleImageError}
            style={{            
            maxWidth: '100%',
            maxHeight: '250px',
            minWidth: '100%',
            minHeight: '250px'}}
          />
        ) : (
          <img
            src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c`}
            style={{            
              maxWidth: '100%',
              maxHeight: '250px',
              minWidth: '100%',
              minHeight: '250px'}}
          />
        )}

        <Stack spacing={1}>
          <Box>
            <Stack direction={'row'} spacing={1}>
            <SmallChip label={meeting?.filterTag} />
            {meeting.meetingSuccess===2 &&
            <SmallChip
                label={'성사완료'}
              />}
            {meeting.meetingSuccess===1 &&
            <SmallChip
                label={meeting?.meetingState === 1 ? '모집중' : '모집완료'}
                sx={{
                  backgroundColor:
                  meeting?.meetingState === 1 ? '#81BEF7' : '#F78181',
                }}
              />}
            </Stack>
          </Box>
          <Typography variant="h6" component="h2" id="date-selection-error-modal">
            {meeting?.meetingName}
          </Typography>

          <h5>모임 리더</h5>
          <MeetingMember member={leaderData} />

          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <PeopleIcon />
            <Typography sx={{ fontSize: 13 }}>
              {meeting?.count}/{meeting?.meetingMaxMemberNo}
            </Typography>
          </Stack>

          {meeting?.entryFee !== null && meeting?.entryFee !== 0 && (
          <Stack direction="row" spacing={1} alignItems="center">
            <PaymentIcon />
            <Typography sx={{ fontSize: 13 }}>
              {meeting?.entryFee}원
            </Typography>
          </Stack>
          )}

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

          <Typography sx={{ fontSize: 13 }}>
            {meeting?.meetingIntro?.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </Typography>

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
          <Box onClick={onClickSettings}>
            <GetMeetingStaticMap meeting={meeting} />
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
        { meeting.meetingSuccess === 2 &&(
        <>
          <h5>리뷰</h5>
          <ListMeetingReview />
        </>
        )}
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
        setOpen={setIsMeetingMemberOpen}
      />
      <GetMeetingStaticMapDrawer
        meeting={meeting}
        settingsMapOpen={settingsMapOpen}
        toggleSettingsMap={toggleSettingsMap}
        setSettingsMapOpen={setSettingsMapOpen}
      />
      <AddMeetingMemberDrawer
        settingsAddMemberOpen={settingsAddMemberOpen}
        setSettingsAddMemberOpen={setSettingsAddMemberOpen}
        toggleSettingsAddMember={toggleSettingsAddMember} 
        meetingNo={meetingno}
        />      
    </>
  );
};

export default GetMeeting;
