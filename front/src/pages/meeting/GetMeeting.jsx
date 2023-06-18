import ListMeetingReview from '@components/meeting/ListMeetingReview';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useLocation, useParams } from 'react-router';
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
import GetMeetingStaticMapDrawer from '@components/meeting/map/GetMeetingStaticMapDrawer';
import PaymentIcon from '@mui/icons-material/Payment';
import AddMeetingMemberDrawer from '@components/meeting/AddMeetingMemberDrawer';
import Face3Icon from '@mui/icons-material/Face3';
import Face6Icon from '@mui/icons-material/Face6';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import MemberListTapview from '@components/meeting/MemberListTapview';
import useMeetingPathStore from '@stores/meeting/useMeetingPathStore';
import { differenceInYears } from 'date-fns';
import UnMatchedFilterMeeting from '@components/meeting/UnMatchedFilterMeeting';

const GetMeeting = () => {
  const { prevMeetingPath } = useMeetingPathStore();

  const { meetingno } = useParams();
  const [unMatcheOpen, setUnMatcheOpen] = useState(false);
  const [settingsAddMemberOpen, setSettingsAddMemberOpen] = useState(false);

  const { data: meeting } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`,
    fetcher
  );

  const [settingsMapOpen, setSettingsMapOpen] = useState(false);

  const onClickSettings = useCallback(() => {
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

  const { data: confirmedMemberList } = useSWR(
    `${
      import.meta.env.VITE_SPRING_HOST
    }/rest/user/list/grouptype/2/no/${meetingno}/state/2`,
    fetcher
  );

  const { data: pendingMemberList } = useSWR(
    `${
      import.meta.env.VITE_SPRING_HOST
    }/rest/user/list/grouptype/2/no/${meetingno}/state/1`,
    fetcher
  );

  const myAge = differenceInYears(new Date(), new Date(myData?.birthday));

  const isFilterMatched =
    (meeting?.filterGender === 0 ||
      meeting?.filterGender === myData?.filterGender) &&
    meeting?.filterMinAge <= myAge &&
    myAge <= meeting?.filterMaxAge;

  const onClickAddMember = useCallback(() => {
    if (isFilterMatched) {
      setSettingsAddMemberOpen(true);
    } else {
      setUnMatcheOpen(true);
    }
  }, [isFilterMatched]);

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
    return <Skeleton variant="rectangular" width={'100vw'} height={'100vh'} />;
  }

  const isUserInConfirmedMembers = confirmedMemberList?.some(
    (confirmedMember) => confirmedMember.userNo === myData?.userNo
  );

  const isUserInPendingMembers = pendingMemberList?.some(
    (pendingMember) => pendingMember.userNo === myData?.userNo
  );

  return (
    <Box sx={{ bgcolor: '#ededed' }}>
      {isUserLeader && !isMeetingSuccessful ? (
        <GetMeetingTop prevPath={prevMeetingPath} />
      ) : (
        <CommonTop prevPath={prevMeetingPath} pageType="meeting" />
      )}
      <Box
        sx={{
          marginTop: '64px',
          marginBottom: '64px',
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
              minHeight: '250px',
            }}
          />
        ) : (
          <img
            src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c`}
            style={{
              maxWidth: '100%',
              maxHeight: '250px',
              minWidth: '100%',
              minHeight: '250px',
            }}
          />
        )}
        <Stack spacing={1}>
          <Box
            sx={{
              padding: '10px',
              bgcolor: 'white',
            }}
          >
            <Stack direction={'row'} spacing={1}>
              <SmallChip label={meeting?.filterTag} />
              {meeting.meetingSuccess === 2 && <SmallChip label={'성사완료'} />}
              {meeting.meetingSuccess === 1 && (
                <SmallChip
                  label={meeting?.meetingState === 1 ? '모집중' : '모집완료'}
                  sx={{
                    backgroundColor:
                      meeting?.meetingState === 1 ? '#81BEF7' : '#F78181',
                  }}
                />
              )}
            </Stack>
            <Typography
              variant="h6"
              component="h2"
              id="date-selection-error-modal"
            >
              {meeting?.meetingName}
            </Typography>
          </Box>
          <Box
            sx={{
              paddingLeft: '10px',
              paddeingRight: '10px',
              paddeingBottom: '10px',
              bgcolor: 'white',
            }}
          >
            <h5 style={{ margin: '0' }}>모임 리더</h5>
            <MeetingMember member={leaderData} />
          </Box>
          <Box
            sx={{
              paddingLeft: '10px',
              paddeingRight: '10px',
              bgcolor: 'white',
            }}
          >
            <h5 style={{ margin: '0' }}>참여 조건</h5>
            <Grid
              container
              sx={{
                display: 'flex',
                width: '95vw',
                height: 60,
              }}
            >
              <Grid item xs={6}>
                <item>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '45vw',
                      height: 50,
                    }}
                  >
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      spacing={1}
                    >
                      {(meeting.filterGender === 0 ||
                        meeting.filterGender === 1) && <Face6Icon />}
                      {(meeting.filterGender === 0 ||
                        meeting.filterGender === 2) && <Face3Icon />}
                      <Typography variant="h6" sx={{ fontSize: 15 }}>
                        {meeting.filterGender === 0 && '누구나'}
                        {meeting.filterGender === 1 && '남자만'}
                        {meeting.filterGender === 2 && '여자만'}
                      </Typography>
                    </Stack>
                  </Box>
                </item>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: 'flex',
                    width: '45vw',
                    height: 50,
                  }}
                >
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    spacing={1}
                  >
                    <TuneRoundedIcon />
                    <Typography sx={{ fontSize: 15 }}>
                      {meeting.filterMinAge === 14 &&
                        meeting.filterMaxAge === 50 &&
                        '누구나'}
                      {meeting.filterMinAge !== 14 &&
                        meeting.filterMaxAge === 50 && (
                          <div>{meeting.filterMinAge}이상</div>
                        )}
                      {meeting.filterMinAge !== 14 &&
                        meeting.filterMaxAge !== 50 && (
                          <div>
                            {meeting.filterMinAge}이상 {meeting.filterMaxAge}
                            미만
                          </div>
                        )}
                      {meeting.filterMinAge === 14 &&
                        meeting.filterMaxAge !== 50 && (
                          <div>{meeting.filterMaxAge}미만</div>
                        )}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              paddingLeft: '10px',
              paddeingRight: '10px',
              bgcolor: 'white',
            }}
          >
            <h5 style={{ margin: '0' }}>모임 정보</h5>
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
          </Box>
          <Box
            sx={{
              paddingLeft: '10px',
              paddeingRight: '10px',
              bgcolor: 'white',
            }}
          >
            <h5 style={{ margin: '0' }}>모임 소개</h5>

            <Typography sx={{ fontSize: 13 }}>
              {meeting?.meetingIntro?.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: 'white',
            }}
          >
            <Box
              sx={{
                paddingLeft: '10px',
                paddeingRight: '10px',
              }}
            >
              <h5 style={{ margin: '0' }}>모임 위치</h5>
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <LocationOnIcon />
                <Stack spacing={0.1}>
                  <Typography sx={{ fontSize: 13 }}>
                    {meeting?.meetingAddr}
                  </Typography>
                  <Typography sx={{ marginLeft: '34px', fontSize: 13 }}>
                    {meeting?.meetingDetailAddr}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            {meeting && (
              <Box onClick={onClickSettings}>
                <GetMeetingStaticMap meeting={meeting} />
              </Box>
            )}
            <Box
              sx={{
                paddingBottom: '20px',
                bgcolor: 'white',
              }}
            >
              <MemberListTapview
                confirmedMemberList={confirmedMemberList}
                pendingMemberList={pendingMemberList}
              />
            </Box>
          </Box>
        </Stack>

        <Box
          sx={{
            paddingLeft: '10px',
            paddeingRight: '10px',
            bgcolor: 'white',
          }}
        >
          {meeting.meetingSuccess === 2 && (
            <>
              <h5>리뷰</h5>
              <ListMeetingReview />
            </>
          )}
        </Box>
        <Stack
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'fixed', bottom: 5, left: 0, right: 0 }}
        >
          {!isUserLeader &&
            !isMeetingSuccessful &&
            myData &&
            (isUserInConfirmedMembers || isUserInPendingMembers ? (
              <Button
                variant="contained"
                sx={{ width: '85vw', borderRadius: '50px' }}
                disabled
              >
                참여하기
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ width: '85vw', borderRadius: '50px' }}
                onClick={onClickAddMember}
              >
                참여하기
              </Button>
            ))}
        </Stack>
      </Box>
      <UnMatchedFilterMeeting open={unMatcheOpen} setOpen={setUnMatcheOpen} />
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
    </Box>
  );
};

export default GetMeeting;
