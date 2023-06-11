import ListMeetingParentClubNo from '@components/meeting/ListMeetingParentClubNo';
import styled from '@emotion/styled';
import CommonTop from '@layouts/common/CommonTop';
import { Avatar, Box, Button, Typography, Stack } from '@mui/material';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import ClubMember from '@components/club/ClubMember';
import GetClubTop from '@layouts/club/GetClubTop';
import ClubSmallChip from '@components/club/ClubSmallChip';

const GetClub = () => {
  const { clubNo } = useParams();
  const [clubLeader, setClubLeader] = useState();
  const [club, setClub] = useState();
  const [pendingMemberList, setPendingMemberList] = useState();
  const [confirmedMemberList, setConfirMemberList] = useState();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const isClubLeader = club?.clubLeaderNo === myData?.userNo;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/club/no/${clubNo}`)
      .then((response) => {
        console.log('클럽데이터 받아오지?', response.data);
        setClub(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!club) {
      return;
    }

    const fetchClubLeader = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SPRING_HOST}/rest/user/userno/${
            club.clubLeaderNo
          }`
        );
        console.log(response.data);
        setClubLeader(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClubLeader();
  }, [club]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/user/list/grouptype/1/no/${clubNo}/state/2`
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
        }/rest/user/list/grouptype/1/no/${clubNo}/state/1`
      )
      .then((response) => {
        console.log(response.data);
        setPendingMemberList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickProfileImg = useCallback(
    (e) => {
      navigate(`/community/profile/userno/${club?.clubLeaderNo}`);
    },
    [navigate, club]
  );

  const onClickAddMember = useCallback((event) => {
    navigate(`/club/member/addmember/${clubNo}`);
  }, []);

  const [imageLoadingError, setImageLoadingError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageLoadingError(true);
  }, []);

  const onClickUpdate = useCallback((MouseEvent) => {
    navigate(`/club/updateclub/${clubNo}`);
  }, []);
  const onClickDelete = useCallback(async (event) => {
    event.preventDefault();

    try {
      const data = {
        clubNo: club?.clubNo,
      };

      console.log(data);

      const response = await axios.delete(
        `${import.meta.env.VITE_SPRING_HOST}/rest/club`,
        {
          data: data,
        }
      );

      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {isClubLeader ? <GetClubTop /> : <CommonTop />}
      <Box
        sx={{
          marginTop: '64px',
          marginBottom: '64px',
          marginLeft: '10px',
          marginRight: '10px',
        }}
      >
        {club?.clubImg ? (
          <img
            src={`${import.meta.env.VITE_SPRING_HOST}/upload_images/club/${
              club?.clubImg
            }`}
            alt='noImg'
            loading='lazy'
            onError={handleImageError}
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
            }}
          />
        ) : (
          <img
            src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c`}
            alt='noImg'
            loading='lazy'
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
            }}
          />
        )}
        <Stack spacing={1}>
          <Stack direction='row' margin={1} spacing={2}>
            <Stack
              direction={'row'}
              spacing={10}
              alignItems={'center'}
              onClick={onClickProfileImg}
              data-value={myData?.userNo}
            >
              <Box>
                <Avatar
                  alt={club?.nickName}
                  src={`${
                    import.meta.env.VITE_SPRING_HOST
                  }/upload_images/user/${clubLeader?.profileImg}`}
                  sx={{ width: 60, height: 60 }}
                />
              </Box>
            </Stack>
            <Stack>
              <Stack margin={1}>
                <Typography variant='h3' sx={{ fontSize: 16 }}>
                  {club?.clubName}
                </Typography>
              </Stack>
              <Stack margin={1}>
                <Typography variant='h3' sx={{ fontSize: 16 }}>
                  {clubLeader?.nickName}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={5}>
            <Box direction='row' spacing={0} alignItems='left'>
              <ClubSmallChip label={club?.filterTag} />
            </Box>

            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <PeopleIcon />
              <Typography sx={{ fontSize: 13 }}>
                {club?.memberCount}/{club?.clubMaxMemberNo}
              </Typography>
            </Stack>

            <Box direction='row' spacing={0} alignItems='left'>
              <ClubSmallChip
                label={club?.clubState === 2 ? '모집완료' : '모집중'}
                sx={{
                  backgroundColor:
                    club?.clubState === 2 ? '#F78181' : '#81BEF7',
                }}
              />
            </Box>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <LocationOnIcon />
              <Typography sx={{ fontSize: 13 }}>{club?.clubRegion}</Typography>
            </Stack>
          </Stack>
          <Typography sx={{ fontSize: 16 }}>클럽 소개</Typography>
          <Typography sx={{ fontSize: 13 }}>
            {club?.clubIntro?.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </Typography>
        </Stack>
        <h5>확정 멤버</h5>
        {confirmedMemberList?.map((confirmedMember, i) => (
          <ClubMember key={i} member={confirmedMember} />
        ))}
        <h5>신청 멤버</h5>
        {pendingMemberList?.map((pendingMember, i) => (
          <ClubMember key={i} member={pendingMember} />
        ))}

        <h5>클럽 내 생성 모임 목록</h5>
        <ListMeetingParentClubNo />
        <Button
          variant='contained'
          sx={{ width: '85vw', borderRadius: '50px' }}
          onClick={onClickAddMember}
        >
          참여하기
        </Button>
      </Box>
    </>
  );
};

export default GetClub;
