import { FC } from 'react';

import { Alert, Avatar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { DateTime } from 'luxon';

const Chat = ({ data }) => {
  const { data: myData } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  // console.log('!!!', myData);
  // console.log('!!!', data.data);

  const isMe = myData?.userNo === data.sender_no;
  const messageColor = isMe ? 'white' : 'gray';
  const messageBackColor = isMe ? '#036645' : 'lightgray';
  const sendTime = DateTime.fromISO(data.created_at).toLocaleString(
    DateTime.TIME_SIMPLE
  );
  console.log(data);

  return (
    <Stack
      direction={'row'}
      justifyContent={isMe ? 'flex-end' : 'flex-start'}
      spacing={1.5}
      sx={{ marginBottom: '10px' }}
    >
      {!isMe && (
        <Avatar
          src={`http://${import.meta.env.VITE_SPRING_HOST}/upload_images/user/${
            data?.Sender.profile_img
          }`}
          alt="Remy Sharp"
          sx={{ marginLeft: '10px' }}
        />
      )}
      <Stack>
        {!isMe && data.Sender.nick_name}

        <Stack direction={'row'} sx={{ maxWidth: '300px' }}>
          {isMe && (
            <Stack marginTop="auto">
              <Typography
                sx={{
                  fontSize: 12,
                  marginLeft: 'auto',
                  minWidth: '58px',
                  color: 'gray',
                }}
              >
                {sendTime}
              </Typography>
              {data?.readCount != 0 && (
                <Typography
                  color={'primary'}
                  sx={{ fontSize: 12, marginLeft: 'auto', fontWeight: 700 }}
                >
                  {data.readCount}
                </Typography>
              )}
            </Stack>
          )}

          {data.content_type_no == 1 && (
            <Typography
              component="div"
              sx={{
                backgroundColor: `${messageBackColor}`,
                color: `${messageColor}`,
                padding: '0.5em',
                borderRadius: '0.3em',
                width: 'fit-content',
                maxWidth: '100%',
                marginRight: isMe ? '10px' : '3px',
                marginLeft: isMe ? '3px' : '0px',
              }}
            >
              {data.content.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </Typography>
          )}
          {data.content_type_no == 2 && (
            <img
              src={`http://${import.meta.env.VITE_EXPRESS_HOST}/uploads/${
                data.content
              }`}
              alt="error"
              loading="lazy"
              style={{
                maxHeight: '200px',
                maxWidth: '200px',
                marginLeft: isMe ? '3px' : '0px',
                marginRight: isMe ? '10px' : '3px',
              }}
            />
          )}
          {!isMe && (
            <Stack marginTop="auto">
              <Typography sx={{ fontSize: 12, color: 'grey' }}>
                {sendTime}
              </Typography>
              {!isMe && data?.readCount != 0 && (
                <Typography
                  color={'primary'}
                  sx={{ fontSize: 12, fontWeight: 700 }}
                >
                  {data.readCount}
                </Typography>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
Chat.propTypes = {
  data: PropTypes.object,
};
export default Chat;
