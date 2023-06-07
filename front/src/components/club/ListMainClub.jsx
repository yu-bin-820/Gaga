import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';
import ClubThumbnail from './ClubThumbnail';
import {
  SportsSoccer,
  Palette,
  Fastfood,
  SportsEsports,
  Flight,
  School,
} from '@mui/icons-material';
import fetcher from '@utils/fetcher';

const NumberButton = ({ number, handleClick, renderButton }) => (
  <Stack alignItems='center' justifyContent='center' sx={{ width: '33%' }}>
    <Button
      key={number}
      onClick={() => handleClick(number)}
      startIcon={renderButton(number)}
    ></Button>
  </Stack>
);

const ListMainClub = () => {
  const [clubList, setClubList] = useState([]);
  const navigate = useNavigate();

  const [mainCategoryNo, setMainCategoryNo] = useState(1);

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/club/list/nonuser/${mainCategoryNo}`
      )
      .then((response) => {
        console.log(response.data);
        setClubList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mainCategoryNo]);

  const onClickClub = useCallback((event) => {
    const { id } = event.target;
    navigate(`/club/no/${id}`);
  }, []);

  const handleClick = (number) => {
    setMainCategoryNo(number);
  };

  const renderButton = (number) => {
    let icon, label;
    switch (number) {
      case 1:
        icon = <SportsSoccer style={{ width: '30px', height: '30px' }} />;
        label = '운동, 액티비티';
        break;
      case 2:
        icon = <Palette style={{ width: '30px', height: '30px' }} />;
        label = '문화, 예술';
        break;
      case 3:
        icon = <Fastfood style={{ width: '30px', height: '30px' }} />;
        label = '푸드, 디저트';
        break;
      case 4:
        icon = <SportsEsports style={{ width: '30px', height: '30px' }} />;
        label = '취미';
        break;
      case 5:
        icon = <Flight style={{ width: '30px', height: '30px' }} />;
        label = '여행, 동행';
        break;
      case 6:
        icon = <School style={{ width: '30px', height: '30px' }} />;
        label = '자기개발';
        break;
      default:
        icon = null;
        label = null;
        break;
    }

    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {icon}
        {label}
      </Box>
    );
  };

  return (
    <>
      <Stack sx={{ marginTop: '100px' }}>
        <Stack>
          <Stack>
            <Stack direction='row' alignItems='center'>
              {[1, 2, 3].map((number) => (
                <NumberButton
                  key={number}
                  number={number}
                  handleClick={handleClick}
                  renderButton={renderButton}
                />
              ))}
            </Stack>
            <Stack direction='row' alignItems='center'>
              {[4, 5, 6].map((number) => (
                <NumberButton
                  key={number}
                  number={number}
                  handleClick={handleClick}
                  renderButton={renderButton}
                />
              ))}
            </Stack>
          </Stack>
          {clubList?.map((club, i) => (
            <Stack key={i}>
              <h3>
                {i + 1}. {club.clubNo}번 클럽정보입니다.
              </h3>
              <ClubThumbnail club={club} />
              <Button id={club.clubNo} onClick={onClickClub}>
                클럽정보
              </Button>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default ListMainClub;
