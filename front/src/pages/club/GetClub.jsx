import SmallChip from '@components/club/SmallChip';
import ListMeetingParentClubNo from '@components/meeting/ListMeetingParentClubNo';
import styled from '@emotion/styled';
import CommonTop from '@layouts/common/CommonTop';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import ClubMember from '@components/club/ClubMember';

const GetClub = () => {
  const { clubNo } = useParams();
  const [club, setClub] = useState();
  const [pendingMemberList, setPendingMemberList] = useState();
  const [confirmedMemberList, setConfirMemberList] = useState();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/club/no/${clubNo}`)
      .then((response) => {
        console.log(response.data);
        setClub(response.data);
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
      <CommonTop />
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
          <Box>
            <SmallChip label={club?.filterTag} />
          </Box>
          <Typography variant='h3' sx={{ fontSize: 16 }}>
            {club?.clubName}
          </Typography>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <PeopleIcon />
            <Typography sx={{ fontSize: 13 }}>
              {club?.memberCount}/{club?.clubMaxMemberNo}
            </Typography>
          </Stack>

          <Typography sx={{ fontSize: 16 }}>클럽 소개</Typography>

          <Typography sx={{ fontSize: 13 }}>{club?.clubIntro}</Typography>

          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <LocationOnIcon />
            <Typography sx={{ fontSize: 13 }}>{club?.clubRegion}</Typography>
          </Stack>
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

        <Button onClick={onClickUpdate}>수정하기</Button>
        <Button onClick={onClickDelete}>삭제하기</Button>
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
