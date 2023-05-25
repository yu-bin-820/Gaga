import { Avatar } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';

const UserThumbnail = () => {
  return (
    <Box
      sx={{
        margin: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        padding: 1.3,
      }}
    >
      <Stack direction="row" spacing={1}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Stack spacing={0.1}>
          <Box
            sx={{ color: 'text.primary', fontSize: 14, fontWeight: 'medium' }}
          >
            사람이름
          </Box>

          <Box
            sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}
          >
            내 소개를 하자면 대답해 드리는게 인지 상정
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserThumbnail;
