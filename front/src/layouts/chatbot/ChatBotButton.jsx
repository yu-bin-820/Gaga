import { useCallback } from 'react';

import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
const ChatBotButton = () => {
  return (
    <Fab
      color="primary"
      sx={{ position: 'fixed', bottom: '4.5rem', right: '2rem' }}
    >
      <SmartToyOutlinedIcon />
    </Fab>
  );
};

export default ChatBotButton;
