import { Box, Stack, ThemeProvider, createTheme } from '@mui/system';
import {
  Avatar,
  AvatarGroup,
  Card,
  Chip,
  ImageListItem,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const StyledAvatarGroup = styled(AvatarGroup)({
  '& .MuiAvatar-root': {
    width: 24,
    height: 24,
    fontSize: 12,
  },
});

const AdjustmentThumnail = ({ meeting }) => {
  const navigate = useNavigate();

  const onClickMeeting = useCallback((event) => {
    navigate(`/meeting/meetingno/${meeting.meetingNo}`);
  }, []);

  return (
    <Stack
      sx={{
        margin: 1,
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 2,
        minWidth: 295,
        padding: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
      }}
    >
      <Stack
        sx={{
          width: '33%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ImageListItem
          sx={{
            maxWidth: '150px',
            maxHeight: '150px',
            minWidth: '150px',
            minHeight: '150px',
          }}
        >
          {meeting?.meetingImg ? (
            <img
              src={`${import.meta.env.VITE_SPRING_HOST}/upload_images/meeting/${
                meeting?.meetingImg
              }`}
              alt='noImg'
              loading='lazy'
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
      </Stack>
      <Stack
        sx={{
          width: '33%',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Stack direction='column'>
          <Stack
            sx={{
              color: 'text.primary',
              fontSize: 15,
              fontWeight: 'medium',
              marginBottom: '2px',
            }}
          >
            모임명 {meeting.meetingName}
          </Stack>
          <Stack
            sx={{
              color: 'text.primary',
              display: 'inline',
              fontSize: 12,
              marginBottom: '1px',
            }}
          >
            모임날짜 {meeting.meetingDate}
            <br />
            모임시작시간 {meeting.meetingStartTime}
            <br />
            모임끝시간 {meeting.meetingEndTime}
            <br />
          </Stack>

          <Stack direction='row' spacing={1}>
            <Stack>모 임 명 {meeting.meetingName}</Stack>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Stack>정산금액 {meeting.entryFee * meeting.count}원</Stack>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Stack>은 행 명 {meeting.bankName}</Stack>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Stack>계좌번호 {meeting.accountNo}</Stack>
          </Stack>
        </Stack>
        <Box>
          <Stack sx={{ alignItems: 'flex-end' }} marginBottom={2}>
            {meeting.meetingSuccess === 1 ? (
              '모임성사전'
            ) : meeting.meetingSuccess === 2 ? (
              <>모임 성사</>
            ) : (
              ''
            )}
          </Stack>
          <Stack sx={{ alignItems: 'flex-end' }}>
            {meeting.adjustmentState === 1 ? (
              '정산대기'
            ) : meeting.adjustmentState === 2 ? (
              <>
                정산완료
                <Stack
                  sx={{
                    color: 'text.secondary',
                    display: 'inline',
                    fontSize: 12,
                  }}
                >
                  {new Date(meeting.adjustmentTime).toLocaleString()}
                </Stack>
              </>
            ) : (
              ''
            )}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

AdjustmentThumnail.propTypes = {
  meeting: PropTypes.shape({
    meetingNo: PropTypes.number.isRequired,
    meetingName: PropTypes.string.isRequired,
    entryFee: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    meetingDate: PropTypes.number.isRequired,
    meetingStartTime: PropTypes.number.isRequired,
    meetingEndTime: PropTypes.number.isRequired,
    meetingSuccess: PropTypes.number.isRequired,
    meetingLeaderNo: PropTypes.number.isRequired,
    meetingImg: PropTypes.string.isRequired,
    adjustmentTime: PropTypes.number.isRequired,
    adjustmentState: PropTypes.number.isRequired,
    accountNo: PropTypes.number.isRequired,
    bankName: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdjustmentThumnail;
