import { useParams, useNavigate } from 'react-router';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import ClubThumbnail from './ClubThumbnail';

const ListMyClub = () => {
  const { userNo } = useParams();
  const [clubList, setClubList] = useState();
  const navigate = useNavigate();

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
    <Box>
      <Box>
        {clubList?.map((club, i) => (
          <Box key={i}>
            <ClubThumbnail club={club} id={club.clubNo} onClick={onClickClub} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ListMyClub;
