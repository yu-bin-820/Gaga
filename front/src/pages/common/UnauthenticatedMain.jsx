import { Button } from '@mui/material';
import { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const UnauthenticatedMain = () => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const navigate = useNavigate();

  const onClickLogin = useCallback(() => {
    navigate('/user/login');
  }, [navigate]);

  const onClickRegistProfile = useCallback(() => {
    navigate(`/community/profile/${myData?.userNo}`);
  }, [navigate, myData]);

  console.log(myData);

  if (myData?.profileImg) {
    console.log(myData);
    return <Navigate to="/" />;
  }

  return (
    <>
      비회원, 프로필사진 없는 회원용 클럽 리스트 페이지 입니다.
      <br></br> 추후 구현 예정 입니다.
      <br></br>
      {!myData && <Button onClick={onClickLogin}>LogIn</Button>}
      {myData && !myData?.profileImg && (
        <Button onClick={onClickRegistProfile}>profileImg등록</Button>
      )}
    </>
  );
};

export default UnauthenticatedMain;
