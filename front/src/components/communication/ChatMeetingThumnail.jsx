import { Box, Stack } from '@mui/system';
import { ImageListItem, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import { useLocation, useNavigate } from 'react-router';
import SmallChip from '@components/meeting/SmallChip';
import useMeetingPathStore from '@stores/meeting/useMeetingPathStore';

const ChatMeetingThumnail = ({ meeting }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { prevMeetingPath, setField } = useMeetingPathStore();
  const onClickMeeting = useCallback(() => {
    const isArray = Array.isArray(prevMeetingPath);
    setField(
      'prevMeetingPath',
      isArray ? [...prevMeetingPath, location.pathname] : [location.pathname]
    );
    navigate(`/meeting/meetingno/${meeting?.meetingNo}`);
  }, [meeting?.meetingNo, navigate, prevMeetingPath, location, setField]);

  const truncatedName =
    meeting?.meetingName?.length > 20
      ? `${meeting?.meetingName.slice(0, 20)}...`
      : meeting?.meetingName;

  return (
    <Stack direction="column" spacing={2}>
      <ImageListItem
        sx={{
          maxWidth: '100px',
          maxHeight: '100px',
          minWidth: '177px',
          minHeight: '100px',
        }}
      >
        {meeting?.meetingImg ? (
          <img
            src={`${import.meta.env.VITE_CDN_HOST}/upload_images/meeting/${
              meeting?.meetingImg
            }?type=f&w=177&h=100`}
            alt="noImg"
            loading="lazy"
            style={{ borderRadius: '7px' }}
            onClick={onClickMeeting}
          />
        ) : (
          <img
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
            style={{ borderRadius: '7px' }}
            onClick={onClickMeeting}
          />
        )}
      </ImageListItem>
      <Box>
        <Stack direction={'row'} spacing={1}>
          <SmallChip label={meeting?.filterTag} />
          {meeting?.meetingSuccess === 2 && <SmallChip label={'성사완료'} />}
          {meeting?.meetingSuccess === 1 && (
            <SmallChip
              label={meeting?.meetingState === 1 ? '모집중' : '모집완료'}
              sx={{
                backgroundColor:
                  meeting?.meetingState === 1 ? '#81BEF7' : '#F78181',
              }}
            />
          )}
        </Stack>
        <Box sx={{ color: 'text.primary', fontSize: 15, fontWeight: 'medium' }}>
          {truncatedName}
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
          {meeting?.meetingAddr}
        </Box>
        <Stack direction="row" spacing={1}>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <PeopleIcon />
            <Typography sx={{ fontSize: 13 }}>
              {meeting?.count}/{meeting?.meetingMaxMemberNo}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

ChatMeetingThumnail.propTypes = {
  meeting: PropTypes.object.isRequired,
};

export default ChatMeetingThumnail;
