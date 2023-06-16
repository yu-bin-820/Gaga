import { Box, Typography } from '@mui/material';
import Chat from './Chat';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';
import { Stack } from '@mui/system';
import useChatMapStore from '@stores/communication/useChatMapStore';
import { DateTime } from 'luxon';

const ChatList = ({ chatData, setSize }) => {
  const boxRef = useRef(null);
  const { shouldScroll, isInfiniteScroll, scrollPosition, setField } =
    useChatMapStore();

  const scrollToBottom = useCallback(() => {
    if (boxRef.current) {
      // boxRef.current.scrollTop = boxRef.current.scrollHeight;
      // console.log(
      //   boxRef.current.scrollTop,
      //   boxRef.current.scrollHeight,
      //   boxRef.current.clientHeight
      // );
      if (isInfiniteScroll) {
        boxRef.current.scrollTo({ top: scrollPosition });
        console.log(
          'isInfiniteScroll',
          isInfiniteScroll,
          'scrollPosition',
          scrollPosition
        );

        setField('isInfiniteScroll', !isInfiniteScroll);
      } else {
        boxRef.current.scrollTo({ top: boxRef.current.scrollHeight });
      }
    }
  }, [boxRef, isInfiniteScroll, scrollPosition, setField]);

  const onScroll = useCallback(
    (e) => {
      if (
        e.currentTarget.scrollTop + 500 <
        e.currentTarget.scrollHeight - e.currentTarget.clientHeight
      ) {
        setField('shouldScroll', false);
      } else {
        setField('shouldScroll', true);
      }

      if (e.currentTarget.scrollTop === 0) {
        // console.log('가장 위');
        setField('shouldScroll', false);
        const prevScrollHeight = boxRef.current.scrollHeight;
        const prevScrollTop = boxRef.current.scrollTop;

        setSize((prevSize) => prevSize + 1).then(() => {
          // 스크롤 위치 유지
          setField('isInfiniteScroll', true);
          const newScrollHeight = boxRef.current.scrollHeight;
          const newScrollTop =
            newScrollHeight - prevScrollHeight + prevScrollTop;

          console.log('setScrollPosition', newScrollTop);
          setField('scrollPosition', newScrollTop);
        });
      }

      console.log(shouldScroll);
    },
    [boxRef, setSize, shouldScroll, setField]
  );

  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
    } else {
      if (isInfiniteScroll) {
        console.log('isInfiniteScroll', isInfiniteScroll);
        scrollToBottom();
      }
    }
  }, [scrollToBottom, shouldScroll, chatData, isInfiniteScroll]);

  return (
    <Box
      ref={boxRef}
      style={{
        marginTop: '64px',
        marginBottom: '64px',
        height: '50%',
        maxHeight: 'calc(83.5vh)',
        overflow: 'auto',
      }}
      onScroll={onScroll}
    >
      {Object.entries(chatData)?.map(([date, messages], i) => {
        return (
          <Box key={i}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              marginTop={'20px'}
              marginBottom={'20px'}
            >
              <Stack
                sx={{ minWidth: '95vw' }}
                direction={'row'}
                alignItems={'center'}
              >
                <Box border={1} borderColor="grey.300" flexGrow={1} />
                <Typography
                  marginLeft={'10px'}
                  marginRight={'10px'}
                  fontSize={13}
                  color={'grey'}
                >
                  {date}
                </Typography>
                <Box border={1} borderColor="grey.300" flexGrow={1} />
              </Stack>
            </Box>
            {messages?.map((message, j) => (
              <Chat
                key={j}
                data={message}
                prevMinute={
                  j !== 0
                    ? DateTime.fromFormat(
                        messages[j - 1].created_at,
                        'yyyy-MM-dd HH:mm:ss'
                      ).minute
                    : null
                }
                nextMinute={
                  j !== messages?.length - 1
                    ? DateTime.fromFormat(
                        messages[j + 1].created_at,
                        'yyyy-MM-dd HH:mm:ss'
                      ).minute
                    : null
                }
                prevUserNo={j !== 0 ? messages[j - 1].sender_no : null}
                nextUserNo={
                  j !== messages?.length - 1 ? messages[j + 1].sender_no : null
                }
              />
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

ChatList.propTypes = {
  chatData: PropTypes.object,
  setSize: PropTypes.func,
};

export default ChatList;
