import { Box } from '@mui/material';
import Chat from './Chat';
import PropTypes from 'prop-types';

const ChatList = ({ chatData }) => {
  return (
    <Box
      sx={{
        marginTop: '64px',
        marginBottom: '64px',
        height: '50%',
        maxHeight: 'calc(100vh - 200px)', // 채팅 입력바와 네비게이션바의 높이를 고려하여 설정
        overflow: 'auto', // 콘텐츠가 넘치는 경우 스크롤링 가능
      }}
    >
      {chatData.map((meetingMessage, i) => (
        <Chat key={i} data={meetingMessage} />
      ))}
    </Box>
  );
};

ChatList.propTypes = {
  chatData: PropTypes.array,
};

export default ChatList;
