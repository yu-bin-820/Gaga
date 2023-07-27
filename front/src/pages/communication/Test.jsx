import CategoryAccordion from '@components/common/CategoryAccordion';
import GroupThumbnail from '@components/common/GroupThumbnail';
import UserThumbnail from '@components/common/UserThumbnail';
import { Avatar, Button, Fab, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

import React from 'react';

const Test = () => {
  return (
    <>
      {/* <GroupThumbnail />
      <UserThumbnail />

      <CategoryAccordion /> */}

      <Box
        sx={{
          // = style
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid',
          height: '100vh',
          maxWidth: '100vw',
          padding: '10px',
          marginLeft: '10px',
        }}
      >
        <Stack
          spacing={1}
          alignItems={'center'}
          sx={{
            border: '1px solid red',
            margin: '10px',
            padding: '10px',
            width: '100%',
          }}
        >
          세로 스택
          <Avatar />
          <Typography>미지근한 물이야</Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            sx={{ border: '1px solid blue' }}
          >
            <Avatar />
            <Stack
              alignItems={'center'}
              sx={{ border: '1px solid green', margin: '10px' }}
            >
              <Typography>타이틀</Typography>
              <Typography>안맞았잖아</Typography>
            </Stack>
          </Stack>
          <Button variant="outlined">버튼ffffffffffffffffffffffffffffff</Button>
          <Button variant="contained" sx={{ width: '100%' }}>
            버튼 width 100%
          </Button>
          <Button variant="contained" sx={{ maxWidth: '50%' }}>
            <Typography color={'black'}>
              버튼 max width 50% ffffffffffffffffffffffffffffffff
            </Typography>
          </Button>
          <Button variant="contained" sx={{ minWidth: '100vw' }}>
            <Typography color={'black'}>mw 100vw</Typography>
          </Button>
          <Stack direction={'row'} spacing={4}>
            <Button variant="contained">f</Button>
            <Button variant="contained">f</Button>
            <Button variant="contained">f</Button>
            <Button variant="contained">f</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Test;

<Button></Button>;
