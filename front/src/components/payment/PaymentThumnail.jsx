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

const PaymentThumnail = ({ payment }) => {
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${
          payment?.meetingNo
        }`
      )
      .then((response) => {
        setMeeting(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [payment?.meetingNo]);

  const onClickMeeting = useCallback((event) => {
    navigate(`/meeting/meetingno/${payment?.meetingNo}`);
  }, []);

  const onClickPayment = useCallback(() => {
    navigate(`/payment/details/${payment?.payNo}`);
  });

  return (
    <Stack
      direction='row'
      sx={{
        borderRadius: 2,
        p: 2,
        minWidth: 295,
        padding: 1,
        backgroundColor: '#ffffff',
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
            src={`${import.meta.env.VITE_CDN_HOST}/upload_images/meeting/${
              meeting?.meetingImg
            }?type=f_sh&w=400&h=250&faceopt=true&sharp_amt=1.0`}
            alt='noImg'
            loading='lazy'
            onClick={onClickMeeting}
            style={{
              borderRadius: '5px',
              maxWidth: '100px',
              maxHeight: '100px',
              minWidth: '100px',
              minHeight: '100px',
            }}
          />
        ) : (
          <img
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
            style={{
              borderRadius: '5px',
              maxWidth: '100px',
              maxHeight: '100px',
              minWidth: '100px',
              minHeight: '100px',
            }}
            onClick={onClickMeeting}
          />
        )}
      </ImageListItem>

      <Stack
        onClick={onClickPayment}
        sx={{
          marginLeft: '10px',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Stack direction='column'>
          <Stack direction='row' display='flex' spacing={1}>
            <Stack sx={{ minWidth: '50px' }}>모임명 </Stack>
            <Stack>{meeting?.meetingName}</Stack>
          </Stack>
          <Stack direction='row' display='flex' spacing={1}>
            <Stack>참가비</Stack>
            <Stack> {meeting?.entryFee?.toLocaleString()}원</Stack>
          </Stack>
        </Stack>
        <Stack sx={{ alignItems: 'flex-end', minWidth: '70px' }}>
          {payment?.payState === 1
            ? '결제완료'
            : payment?.payState === 2
            ? '환불완료'
            : payment?.payState === 3
            ? '환불요청'
            : ''}
        </Stack>
      </Stack>
    </Stack>
  );
};

PaymentThumnail.propTypes = {
  payment: PropTypes.object.isRequired,
};

export default PaymentThumnail;
