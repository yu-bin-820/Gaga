import MeetingClubTabs from '@components/common/MeetingClubTabs';
import useSocket from '@hooks/common/useSocket';
import ChatBotButton from '@layouts/chatbot/ChatBotButton';
import fetcher from '@utils/fetcher';
import { useEffect } from 'react';
import useSWR from 'swr';

const Main = () => {
  return (
    <>
      <MeetingClubTabs />
      <ChatBotButton />
    </>
  );
};
export default Main;
