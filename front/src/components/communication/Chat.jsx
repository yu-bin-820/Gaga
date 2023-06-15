import { useCallback } from 'react';

import { Avatar, Stack, Typography } from '@mui/material';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { DateTime } from 'luxon';
import ChatStaticMap from './ChatStaticMap';
import useChatMapStore from '@stores/communication/useChatMapStore';
import MeetingThumbnail from '@components/meeting/MeetingThumnail';
import ChatMeetingThumnail from './ChatMeetingThumnail';

const Chat = ({
  data,
  //prevMinute,
  nextMinute,
  prevUserNo,
  nextUserNo,
}) => {
  const { setField } = useChatMapStore();
  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  // console.log('!!!', myData);
  // console.log('!!!', data.data);
  const minute = DateTime.fromFormat(
    data.created_at,
    'yyyy-MM-dd HH:mm:ss'
  ).minute;
  const isNotice = data.content_type_no === 101;
  const isNewGroupLink = data.content_type_no === 102;
  const isMe = myData?.userNo === data.sender_no;
  const isShowProfile = data.sender_no != prevUserNo;
  const isShowTime = minute !== nextMinute || data.sender_no != nextUserNo;

  const messageColor = isMe ? 'black' : 'gray';
  const messageBackColor = isMe ? 'rgba(3, 102, 69, 0.15)' : '#ededed';
  const sendTime = DateTime.fromFormat(
    data.created_at,
    'yyyy-MM-dd HH:mm:ss'
  ).toLocaleString(DateTime.TIME_SIMPLE);
  // const sendTime = data.created_at;

  const onClickChatMap = useCallback(() => {
    setField('lat', data.lat);
    setField('lng', data.lng);
    setField('isPost', false);
    setField('locationDrawerOpen', true);
  }, [setField, data]);
  return (
    <Box>
      {isNotice && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            sx={{
              backgroundColor: '#ededed',
              padding: '5px',
              margin: '6px',
              borderRadius: '1rem',
              fontSize: 13,
              fontWeight: 500,
              color: 'grey',
            }}
          >
            &nbsp;&nbsp;{data.content}&nbsp;&nbsp;
          </Typography>
        </Box>
      )}
      {!isNotice && (
        <Stack
          direction={'row'}
          justifyContent={isMe ? 'flex-end' : 'flex-start'}
          spacing={1.5}
          sx={{ marginBottom: '10px' }}
        >
          {!isMe && isShowProfile && (
            <Avatar
              src={`${import.meta.env.VITE_CDN_HOST}/upload_images/user/${
                data?.Sender.profile_img
              }?type=f_sh&w=76&h=76&autorotate=false&faceopt=true&sharp_amt=1.0`}
              alt="Remy Sharp"
              sx={{ marginLeft: '10px' }}
            />
          )}

          {!isMe && !isShowProfile && <Box sx={{ minWidth: '50px' }} />}

          <Stack>
            {!isMe && isShowProfile && data.Sender.nick_name}

            <Stack direction={'row'} sx={{ maxWidth: '78vw' }}>
              {isMe && (
                <Stack marginTop="auto">
                  {isShowTime && (
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
                  )}
                  {data?.readCount > 0 && (
                    <Typography
                      color={'primary'}
                      sx={{ fontSize: 12, marginLeft: 'auto', fontWeight: 700 }}
                    >
                      {data.readCount}
                    </Typography>
                  )}
                  {data?.read_state > 0 && (
                    <Typography
                      color={'primary'}
                      sx={{ fontSize: 12, marginLeft: 'auto', fontWeight: 700 }}
                    >
                      {data.read_state}
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
                    wordBreak: 'break-all',
                  }}
                >
                  {data.content.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </Typography>
              )}
              {data.content_type_no == 2 && (
                <img
                  src={`${import.meta.env.VITE_CDN_HOST}/${
                    data.content
                  }?type=w&w=200`}
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
              {data.content_type_no == 3 && (
                <div onClick={onClickChatMap}>
                  <Box
                    sx={{
                      maxHeight: '300px',
                      maxWidth: '300px',
                      marginLeft: isMe ? '3px' : '0px',
                      marginRight: isMe ? '10px' : '3px',
                      padding: '3px',
                      backgroundColor: messageBackColor,
                      borderRadius: '0.3em',
                    }}
                  >
                    <ChatStaticMap
                      lat={data?.lat}
                      lng={data?.lng}
                      messageNo={data?.message_no}
                    />
                    <Typography sx={{ marginTop: '2px', fontSize: 13 }}>
                      {data.content}
                    </Typography>
                  </Box>
                </div>
              )}

              {isNewGroupLink && (
                <Box
                  sx={{
                    backgroundColor: `${messageBackColor}`,
                    borderRadius: '0.5rem',
                    padding: '10px',
                  }}
                >
                  <Typography color={`${messageColor}`}>
                    새로운 모임에 참여해 보세요
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: `white`,
                      borderRadius: '0.5rem',
                      border: `1px solid ${messageBackColor}`,
                      padding: '10px',
                      maxWidth: '200px',
                    }}
                  >
                    <ChatMeetingThumnail meeting={JSON.parse(data?.content)} />
                  </Box>
                </Box>
              )}

              <Stack marginTop="auto">
                {!isMe && isShowTime && (
                  <Typography sx={{ fontSize: 12, color: 'grey' }}>
                    {sendTime}
                  </Typography>
                )}
                {!isMe && data?.readCount != 0 && (
                  <Typography
                    color={'primary'}
                    sx={{ fontSize: 12, fontWeight: 700 }}
                  >
                    {data.readCount}
                  </Typography>
                )}
                {!isMe && data?.read_state != 0 && (
                  <Typography
                    color={'primary'}
                    sx={{ fontSize: 12, fontWeight: 700 }}
                  >
                    {data.read_state}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};
Chat.propTypes = {
  data: PropTypes.object,
  // prevMinute: PropTypes.number,
  nextMinute: PropTypes.number,
  prevUserNo: PropTypes.number,
  nextUserNo: PropTypes.number,
};
export default Chat;
