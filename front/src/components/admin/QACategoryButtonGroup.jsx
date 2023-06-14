import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExtensionIcon from '@mui/icons-material/Extension';
import InfoIcon from '@mui/icons-material/Info';

const QACategoryButtonGroup = ({ onChange }) => {
  const categoryValues = [1, 2, 3, 4, 5, 6];
  const categoryTexts = ['회원', '모임', '클럽', '채팅', '서비스', '기타'];
  const categoryIcons = [<HomeIcon />, <GroupIcon />, <QuestionAnswerIcon />, <ChatIcon />, <ExtensionIcon />, <InfoIcon />];

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: 'center' }} >
        {categoryValues.slice(0, 3).map((value, index) => (
          <Button
            variant="contained"
            color="primary"
            key={value}
            onClick={() => onChange(value)}
            startIcon={categoryIcons[index]}
            sx={{ width: '27%'}}
          >
            {categoryTexts[index]}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" spacing={2} sx={{  justifyContent: 'center'}}>
        {categoryValues.slice(3).map((value, index) => (
          <Button
            variant="contained"
            color="primary"
            key={value}
            onClick={() => onChange(value)}
            startIcon={categoryIcons[index+3]}
            sx={{ width: '27%' }}
          >
            {categoryTexts[index+3]}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default QACategoryButtonGroup;