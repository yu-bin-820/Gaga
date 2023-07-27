import { useCallback } from 'react';

import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import Chatbot from '@components/chatbot/ChatBot';


const ChatBotButton = () => {
    

  return (
    <Chatbot />
  );
};

export default ChatBotButton;
