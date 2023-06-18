import { Button } from '@mui/material';
import { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import ListMainClub from '@components/club/ListMainClub';
import MainTop from '@layouts/common/MainTop';
import axios from 'axios';
import { Box } from '@mui/system';
import Chatbot from '@components/chatbot/ChatBot';

const UnauthenticatedMain = () => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const navigate = useNavigate();

  const onClickLogin = useCallback(() => {
    navigate('/user/login');
  }, [navigate]);

  const onClickRegistProfile = useCallback(() => {
    navigate(`/community/profile/mine`);
  }, [navigate]);

  console.log(myData);

  if (myData?.profileImg) {
    console.log(myData);
    return <Navigate to="/" />;
  }

  return (
    <>
      <MainTop />
      <Box sx={{ backgroundColor: '#ededed', minHeight: '100vh' }}>
        <ListMainClub />
        <Chatbot />
        <Box
          sx={{
            margin: '10px',
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            bottom: '20px',
            left: '48%',
            transform: 'translateX(-50%)',
          }}
        >
          {!myData && (
            <Button
              variant="contained"
              onClick={onClickLogin}
              sx={{ width: '85vw' }}
            >
              로그인 후 가가 서비스 이용하기
            </Button>
          )}
          {myData && !myData?.profileImg && (
            <Button
              variant="contained"
              onClick={onClickRegistProfile}
              sx={{ width: '85vw' }}
            >
              프로필 사진 등록 후 가가 서비스 이용하기
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UnauthenticatedMain;
