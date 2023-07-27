import { useNavigate, useParams } from 'react-router';
import CommonTop from '@layouts/common/CommonTop';
import { Box, Stack } from '@mui/system';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { ImageListItem } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import axios, { isCancel } from 'axios';
import Refund from '@components/payment/Refund';
import PropTypes from 'prop-types';

const GetPayment = () => {
  const { payNo } = useParams();
  const [meeting, setMeeting] = useState();
  const [userNo, setUserNo] = useState();
  const [meetingNo, setMeetingNo] = useState();

  const navigate = useNavigate();

  const { data: payData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/payment/no/${payNo}`,
    fetcher
  );

  const isRefund = payData?.payState === 2;
  const isCancled = payData?.payState === 3;

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${
          payData?.meetingNo
        }`
      )
      .then((response) => {
        console.log(response.data);
        setMeeting(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [payData]);

  const onClickMeeting = useCallback((event) => {
    navigate(`/meeting/meetingno/${meeting?.meetingNo}`);
  }, []);

  const onClickRefund = useCallback(
    (event) => {
      setUserNo(payData?.userNo);
      setMeetingNo(payData?.meetingNo);
    },
    [payData]
  );

  if (!payData) return <>로딩중</>;

  return (
    <>
      <CommonTop pageName='결제 상세정보' />
      <Stack sx={{ backgroundColor: '#ededed' }}>
        <Stack marginTop='64px' marginLeft='10px' marginRight='10px'>
          <Box
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '7px',
              padding: '5px',
            }}
          >
            <Stack
              sx={{
                color: 'text.primary',
                fontSize: 15,
                fontWeight: 'medium',
                marginBottom: '2px',
              }}
            >
              결제번호 {payNo}
            </Stack>
            <Stack
              sx={{
                color: 'text.secondary',
                display: 'inline',
                fontSize: 12,
                marginBottom: '1px',
              }}
            >
              {new Date(payData.payTime).toLocaleString()}
            </Stack>
          </Box>
          <Box
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '7px',
              padding: '5px',
              marginTop: '10px',
            }}
          >
            <Stack direction='row' justifyItems='flex' alignItems='center'>
              <ImageListItem
                sx={{
                  borderRadius: '5px',
                  maxWidth: '100px',
                  maxHeight: '100px',
                  minWidth: '100px',
                  minHeight: '100px',
                  marginRight: '5px',
                }}
              >
                {meeting?.meetingImg ? (
                  <img
                    src={`${
                      import.meta.env.VITE_CDN_HOST
                    }/upload_images/meeting/${
                      meeting?.meetingImg
                    }?type=f_sh&w=400&h=250&faceopt=true&sharp_amt=1.0`}
                    alt='noImg'
                    loading='lazy'
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
              <Stack>
                <Stack direction='row' display='flex' spacing={3}>
                  <Stack sx={{ minWidth: '50px' }}>모임명 </Stack>
                  <Stack>{meeting?.meetingName}</Stack>
                </Stack>
                <Stack direction='row' display='flex' spacing={3}>
                  <Stack>참가비</Stack>
                  <Stack> {meeting?.entryFee?.toLocaleString()}원</Stack>
                </Stack>
                <Stack direction='row' display='flex' spacing={1}>
                  <Stack sx={{ minWidth: '70px' }}>모임날짜 </Stack>
                  <Stack>{meeting?.meetingDate}</Stack>
                </Stack>
                <Stack direction='row' display='flex' spacing={1}>
                  <Stack sx={{ minWidth: '70px' }}>모임장소 </Stack>
                  <Stack>{meeting?.meetingAddr}</Stack>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Box
            display='flex'
            justifyContent='flex-end'
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '7px',
              padding: '5px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <Stack sx={{ alignItems: 'flex-end' }}>
              {payData.payState === 1 ? (
                '결제완료'
              ) : payData.payState === 2 ? (
                <>
                  환불완료
                  <Stack
                    sx={{
                      color: 'text.secondary',
                      display: 'inline',
                      fontSize: 15,
                      marginBottom: '1px',
                    }}
                  >
                    {new Date(payData.refundTime).toLocaleString()}
                  </Stack>
                </>
              ) : payData.payState === 3 ? (
                '환불요청'
              ) : (
                ''
              )}
            </Stack>
          </Box>
          {isCancled ? (
            <Refund userNo={payData.userNo} meetingNo={payData.meetingNo} />
          ) : (
            ''
          )}
        </Stack>
      </Stack>
    </>
  );
};

GetPayment.propTypes = {
  payData: PropTypes.object.isRequired,
};

export default GetPayment;
