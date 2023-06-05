import MeetingClubTabs from '@components/common/MeetingClubTabs';
import useSocket from '@hooks/common/useSocket';
import ChatBotButton from '@layouts/chatbot/ChatBotButton';
import MainBottomNav from '@layouts/common/MainBottomNav';
import MainTop from '@layouts/common/MainTop';
import fetcher from '@utils/fetcher';
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import useSWR from 'swr';

const Main = () => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  if (
    myData === undefined ||
    myData?.profileImg === undefined ||
    myData?.profileImg === null
  ) {
    console.log(myData);
    return <Navigate to="/unauthenticatedmain" />;
  }

  return (
    <>
      <MainTop />
      <MeetingClubTabs />
      <ChatBotButton />
      <MainBottomNav pageName="home" />
    </>
  );
};
export default Main;
