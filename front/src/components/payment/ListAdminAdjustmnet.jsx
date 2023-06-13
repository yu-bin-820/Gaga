import AdjustmentThumnail from '@components/payment/AdjustmentThumnail';
import CommonTop from '@layouts/common/CommonTop';
import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import NoPayment from '@components/payment/NoPayment';

const ListAdminAdjustmnet = () => {
  const navigate = useNavigate();

  const { data: adjustment } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/payment/adjustment`,
    fetcher
  );
  const {
    data: unckeckedAdjustmentList,
    mutate: mutateUnckeckedAdjustmentList,
  } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/payment/adjustment/state/1`,
    fetcher
  );
  const { data: ckeckedAdjustmentList, mutate: mutateCkeckedAdjustmentList } =
    useSWR(
      `${import.meta.env.VITE_SPRING_HOST}/rest/payment/adjustment/state/2`,
      fetcher
    );

  const onClickProfile = useCallback(
    (e) => {
      navigate(`/community/profile/userno/${e.currentTarget.dataset.value}`);
    },
    [navigate]
  );

  const onClickUpdateAdjustment = useCallback(async (event) => {
    const { id } = event.currentTarget;
    event.preventDefault();

    console.log('id', id);

    try {
      const data = {
        meetingNo: id,
      };

      console.log(data);

      const response = await axios
        .patch(
          `${import.meta.env.VITE_SPRING_HOST}/rest/payment/adjustment`,
          data
        )
        .then(() => {
          mutateUnckeckedAdjustmentList();
          mutateCkeckedAdjustmentList();
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Box sx={{ marginRight: '10px', marginLeft: '10px' }}>
        <h5>정산 대기</h5>
        {unckeckedAdjustmentList?.filter(
          (meeting) =>
            meeting.meetingSuccess === 2 && meeting.adjustmentState == 1
        ).length === 0 && <NoPayment ment={'정산 대기 내역이 없습니다.'} />}
        {unckeckedAdjustmentList?.map((adjustment, i) => (
          <Box key={i}>
            <Box
              sx={{
                borderRadius: 2,
                backgroundColor: '#ffffff',
                paddingBottom: '2px',
                marginBottom: '5px',
              }}
            >
              <AdjustmentThumnail meeting={adjustment} />
              <Stack
                direction='row'
                justifyContent='center'
                spacing={1.5}
                marginBottom={1}
              >
                <Button
                  data-value={adjustment.meetingLeaderNo}
                  variant='outlined'
                  sx={{ width: '180px' }}
                  onClick={onClickProfile}
                >
                  회원정보
                </Button>
                <Button
                  id={adjustment.meetingNo}
                  variant='outlined'
                  sx={{ width: '180px' }}
                  onClick={onClickUpdateAdjustment}
                >
                  정산하기
                </Button>
              </Stack>
            </Box>
          </Box>
        ))}
        <h5>정산 완료</h5>
        {ckeckedAdjustmentList?.filter(
          (meeting) =>
            meeting.meetingSuccess === 2 && meeting.adjustmentState == 2
        ).length === 0 && <NoPayment ment={'정산 대기 내역이 없습니다.'} />}
        {ckeckedAdjustmentList?.map((adjustment, i) => (
          <Box key={i}>
            <Box
              sx={{
                borderRadius: 2,
                backgroundColor: '#ffffff',
                paddingBottom: '2px',
                marginBottom: '5px',
              }}
            >
              <AdjustmentThumnail key={i} meeting={adjustment} />
              <Stack direction='row' justifyContent='center' marginBottom={1}>
                <Button
                  data-value={adjustment.meetingLeaderNo}
                  variant='outlined'
                  sx={{ width: '180px' }}
                  onClick={onClickProfile}
                >
                  회원정보
                </Button>
              </Stack>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ListAdminAdjustmnet;
