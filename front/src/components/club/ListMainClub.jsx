import { Button, Divider, Typography } from '@mui/material';
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
        label = '자기계발';
        break;
      default:
        icon = null;
        label = null;
        break;
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '5px',
          paddingRight: '5px',
          minWidth: '100px',
          minHeight: '60px',
          borderRadius: '0.5rem',
          marginTop: '5px',
        }}
      >
        {icon}
        <Typography
          sx={{
            marginTop: '3px',
            fontSize: 13,
            fontWeight: 550,
            color: 'grey',
          }}
        >
          {label}
        </Typography>
      </Box>
    );
  };

  return (
    <div style={{ backgroundColor: '#ededed' }}>
      <Stack>
        <Stack>
          <Stack sx={{ marginTop: '56px', paddingLeft: '15px' }}>
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

          <Divider sx={{ marginTop: '10px', marginRight: '12px' }} />

          <Typography
            sx={{
              marginLeft: '10px',
              marginTop: '10px',
              color: 'grey',
              fontWeight: '600',
            }}
          >
            인기 클럽 둘러보기
          </Typography>

          {clubList?.map((club, i) => (
            <Stack key={i}>
              <Box
                sx={{
                  marginRight: '10px',
                  marginLeft: '10px',
                  paddingBottom: '5px',
                }}
              >
                <ClubThumbnail club={club} />
              </Box>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default ListMainClub;
