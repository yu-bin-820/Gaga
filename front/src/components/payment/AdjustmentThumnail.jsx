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
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const AdjustmentThumnail = ({ meeting }) => {
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const onClickMeeting = useCallback((event) => {
    navigate(`/meeting/meetingno/${meeting.meetingNo}`);
  }, []);

  return (
    <Stack
      direction='column'
      display='flex'
      sx={{
        borderRadius: 2,
        p: 2,
        minWidth: 295,
        padding: 1,
        backgroundColor: '#ffffff',
        marginBottom: '5px',
      }}
    >
      <Stack direction='row' display='flex' marginLeft='15px'>
        <Stack
          sx={{
            width: '20%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ImageListItem
            sx={{
              maxWidth: '100px',
              maxHeight: '100px',
              minWidth: '100px',
              minHeight: '100px',
            }}
          >
            {meeting?.meetingImg ? (
              <img
                src={`${
                  import.meta.env.VITE_SPRING_HOST
                }/upload_images/meeting/${meeting?.meetingImg}`}
                alt='noImg'
                loading='lazy'
                style={{ borderRadius: '5px' }}
                onClick={onClickMeeting}
              />
            ) : (
              <img
                src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
                style={{ borderRadius: '5px' }}
                onClick={onClickMeeting}
              />
            )}
          </ImageListItem>
        </Stack>
        <Stack
          sx={{
            marginLeft: '20px',
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Stack direction='column' display='flex' spacing={0.5}>
            <Stack
              sx={{
                color: 'text.primary',
                display: 'inline',
                fontSize: 12,
                marginBottom: '1px',
              }}
            >
              {meeting.meetingDate} {meeting.meetingStartTime}
            </Stack>
            <Stack direction='row' display='flex' spacing={2}>
              <Stack sx={{ minWidth: '50px' }}>모임명</Stack>
              <Stack> {meeting.meetingName}</Stack>
            </Stack>
            <Stack direction='row' display='flex' spacing={1}>
              <Stack> 정산금액</Stack>
              <Stack>
                {(meeting.entryFee * meeting.count).toLocaleString()}원
              </Stack>
            </Stack>
            <Stack direction='row' display='flex' spacing={2}>
              <Stack>은행명</Stack> <Stack> {meeting.bankName}</Stack>
            </Stack>
            <Stack direction='row' display='flex' spacing={1}>
              <Stack sx={{ minWidth: '70px' }}>계좌번호</Stack>{' '}
              <Stack> {meeting.accountNo}</Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Box>
        <Stack sx={{ alignItems: 'flex-end' }} marginBottom={2}>
          {meeting.meetingSuccess === 1 ? (
            '모임성사전'
          ) : meeting.meetingSuccess === 2 ? (
            <>성사완료</>
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
                  fontSize: 10,
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
  );
};

AdjustmentThumnail.propTypes = {
  meeting: PropTypes.object.isRequired,
};

export default AdjustmentThumnail;
