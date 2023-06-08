import { useParams, useNavigate } from 'react-router';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import ClubThumbnail from './ClubThumbnail';
import ListMyConfirmClubThumnail from './ListMyConfirmClubThumnail';
import ListMyPendingClubThumnail from './ListMyPendingClubThumnail';
import ListMyClubThumnail from './ListMyClubThumnail';
import ListClubProfile from './ListClubProfile';
import ListCreateClub from './ListCreateClub';

const ListMyClub = () => {
  const { userNo } = useParams();
  const [clubList, setClubList] = useState();
  const navigate = useNavigate();
  const isMyProfile = !userNo;

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/club/list/join/${
          myData?.userNo
        }`
      )
      .then((response) => {
        console.log(response.data);
        setClubList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickClub = useCallback((event) => {
    const { id } = event.target;
    navigate(`/club/no/${id}`);
  }, []);

  const onClickListClubMember = useCallback((event) => {
    const { id } = event.target;
    navigate(`/club/member/listmember/clubno/${id}`);
  }, []);

  return (
    <Box sx={{ marginBottom: '170px', backgroundColor: '#ededed' }}>
      <h5 style={{ margin: '1px' }}>참여 확정 클럽</h5>
      {clubList?.map((club, i) => {
        if (club.state === 2) {
          return (
            <Box key={i} sx={{ margin: '3px' }}>
              {!isMyProfile && <ListClubProfile club={club} />}
              {isMyProfile && <ListMyConfirmClubThumnail club={club} />}
            </Box>
          );
        }
      })}
      <h5 style={{ margin: '1px' }}>참여 신청 클럽</h5>
      {clubList?.map((club, i) => {
        if (club.state === 1) {
          return (
            <Box key={i} sx={{ margin: '3px' }}>
              {!isMyProfile && <ListClubProfile club={club} />}
              <ListMyPendingClubThumnail club={club} />
            </Box>
          );
        }
      })}
      <h5 style={{ margin: '1px' }}>주최한 모임</h5>
      {clubList?.map((club, i) => {
        if (club.state === 0) {
          return (
            <Box key={i} sx={{ margin: '3px' }}>
              {!isMyProfile && <ListClubProfile club={club} />}
              {isMyProfile && <ListMyClubThumnail club={club} />}
            </Box>
          );
        }
      })}
    </Box>
  );
};

export default ListMyClub;
