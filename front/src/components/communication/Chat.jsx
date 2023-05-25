import { FC } from 'react';

import { Alert, Avatar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import PropTypes from 'prop-types';

const Chat = ({ data }) => {
  const { data: myData } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  // console.log('!!!', myData);
  // console.log('!!!', data.data);

  let messageColor = 'gray';
  let messageBackColor = 'lightgray';
  let offset = 0.3;
  if (myData?.userNo === data.sender_no) {
    messageBackColor = '#036635';
    messageColor = 'white';
    offset = 7;
  }
  return (
    <Grid container xsOffset={offset} mdOffset={offset} xs={5} md={5}>
      <Stack direction={'row'} sx={{ maxWidth: '100%', minWidth: '100%' }}>
        <Stack>
          {myData?.userNo !== data.sender_no && <Avatar alt="Remy Sharp" />}
          {myData?.userNo !== data.sender_no && data.Sender.nick_name}
        </Stack>
        {myData?.userNo === data.sender_no && data.readCount}
        <Alert
          sx={{
            margin: 1,
            backgroundColor: `${messageBackColor}`,
            color: `${messageColor}`,
            minWidth: '90%',
            maxWidth: '90%',
            overflowWrap: 'break-word',
          }}
          icon={false}
        >
          {data.content.split('\n').map((line, index) => (
            <Typography key={index} component="div">
              {line}
            </Typography>
          ))}
        </Alert>
        {myData?.userNo !== data.sender_no && data.readCount}
      </Stack>
    </Grid>
  );
};
Chat.propTypes = {
  data: PropTypes.object,
};
export default Chat;
