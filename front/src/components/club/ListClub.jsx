import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';
import ClubThumbnail from './ClubThumbnail';
import Refund from '@components/payment/Refund';
import Payment from '@pages/payment/Payment';

const ListClub = () => {
  const [clubList, setClubList] = useState();
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    const data = {
      gender: myData?.filterGender,
      maxAge: myData?.filterMaxAge,
      minAge: myData?.filterMinAge,
      birthday: myData?.birthday,
      tag: myData?.filterTag,
      tag2: myData?.filterTag2,
      tag3: myData?.filterTag3,
    };
    axios
      .post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/club/list/filter`,
        data
      )
      .then((response) => {
        console.log(data);
        console.log(response.data);
        setClubList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [myData]);

  const onClickClub = useCallback(
    (event) => {
      const { id } = event.target;
      navigate(`/club/no/${id}`);
    },
    [navigate]
  );

  return (
    <>
      <Box sx={{ marginTop: '10px' }}>
        <Box>
          <Box>
            {clubList?.map((club, i) => (
              <Box key={i}>
                <ClubThumbnail club={club} />
                <Button id={club.clubNo} onClick={onClickClub}></Button>
              </Box>
            ))}
            <Payment />
            <Refund />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ListClub;
