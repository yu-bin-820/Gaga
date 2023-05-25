import * as React from 'react';
import { Box, Stack, ThemeProvider, createTheme } from '@mui/system';
import { Avatar, AvatarGroup, Chip, ImageListItem, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledAvatarGroup = styled(AvatarGroup)({
  '& .MuiAvatar-root': {
    width: 24,
    height: 24,
    fontSize: 12,
  },
});

const GroupThumbnail = () => {
  return (
    <Box
      sx={{
        margin: 1,
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        padding: 1.3,
      }}
    >
      <Stack direction="row" spacing={2}>
        <ImageListItem
          sx={{
            maxWidth: '100px',
            maxHeight: '100px',
            minWidth: '100px',
            minHeight: '100px',
          }}
        >
          <img
            src={`http://${
              import.meta.env.VITE_SPRING_HOST
            }/upload_images/meeting/meeting2.jpg?fit=crop&auto=format`}
            style={{ borderRadius: '7px' }}
          />
        </ImageListItem>
        <Box>
          <Chip label="축구" size="small" />
          <Box
            sx={{ color: 'text.primary', fontSize: 16, fontWeight: 'medium' }}
          >
            모임 제목입니다
          </Box>

          <Box
            sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}
          >
            서울시 강남구 강남대로
          </Box>
          <Stack direction="row" spacing={2}>
            <StyledAvatarGroup max={6}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
            </StyledAvatarGroup>
            <Box
              sx={{
                color: 'text.secondary',
                display: 'inline',
                fontSize: 14,
              }}
            >
              17/20
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default GroupThumbnail;
