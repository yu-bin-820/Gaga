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
import NoClub from './NoClub';

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
          userNo ? userNo : myData?.userNo
        }`
      )
      .then((response) => {
        console.log(response.data);
        setClubList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userNo, myData]);

  return (
    <Box sx={{ marginBottom: '170px', backgroundColor: '#ededed' }}>
      <h5 style={{ margin: '1px' }}>참여 확정 클럽</h5>

      {clubList?.filter((club) => club.state === 2).length === 0 && (
        <NoClub ment={'참여가 확정된 클럽이 없습니다'} />
      )}
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

      {clubList?.filter((club) => club.state === 1).length === 0 && (
        <NoClub ment={'참여 신청한 클럽이 없습니다'} />
      )}
      {clubList?.map((club, i) => {
        if (club.state === 1) {
          return (
            <Box key={i} sx={{ margin: '3px' }}>
              {!isMyProfile && <ListClubProfile club={club} />}
              {isMyProfile && <ListMyPendingClubThumnail club={club} />}
            </Box>
          );
        }
      })}
      <h5 style={{ margin: '1px' }}>주최한 클럽</h5>

      {clubList?.filter((club) => club.state === 0).length === 0 && (
        <NoClub ment={'주최한 클럽이 없습니다'} />
      )}
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
