import ClubMember from '@components/club/ClubMember';
import CommonTop from '@layouts/common/CommonTop';
import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';

const ListClubMember = () => {
  const { clubNo } = useParams();
  const navigate = useNavigate();

  const { data: pendingMemberList, mutate: mutatePendingMemberList } = useSWR(
    `${
      import.meta.env.VITE_SPRING_HOST
    }/rest/user/list/grouptype/1/no/${clubNo}/state/1`,
    fetcher
  );
  const { data: confirmedMemberList, mutate: mutateConfirmedMemberList } =
    useSWR(
      `${
        import.meta.env.VITE_SPRING_HOST
      }/rest/user/list/grouptype/1/no/${clubNo}/state/2`,
      fetcher
    );

  const onClickUpdateMember = useCallback(async (event) => {
    const { id } = event.target;
    event.preventDefault();

    try {
      const data = {
        clubNo: clubNo,
        userNo: id,
        state: 2,
      };

      console.log(data);

      const response = await axios
        .patch(`${import.meta.env.VITE_SPRING_HOST}/rest/club/member`, data)
        .then(() => {
          mutateConfirmedMemberList();
          mutatePendingMemberList();
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onClickDeleteMember = useCallback(async (event) => {
    const { id } = event.target;
    event.preventDefault();

    try {
      const data = {
        clubNo: clubNo,
        userNo: id,
      };

      console.log(data);

      const response = await axios
        .delete(`${import.meta.env.VITE_SPRING_HOST}/rest/club/member`, {
          data: data,
        })
        .then(() => {
          mutateConfirmedMemberList();
          mutatePendingMemberList();
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <CommonTop />
      <Box marginTop='64px' marginLeft='10px'>
        <h5>신청 멤버</h5>
        {pendingMemberList?.map((pendingMember, i) => (
          <Box key={i}>
            <ClubMember member={pendingMember} />
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              spacing={3}
              sx={{ marginBottom: '3px' }}
            >
              <Button
                variant='outlined'
                id={pendingMember.userNo}
                onClick={onClickDeleteMember}
                sx={{ height: '33px', width: '100px' }}
              >
                거절
              </Button>
              <Button
                variant='contained'
                id={pendingMember.userNo}
                onClick={onClickUpdateMember}
                sx={{ height: '33px', width: '100px' }}
              >
                수락
              </Button>
            </Stack>
          </Box>
        ))}
        <h5>확정 멤버</h5>
        {confirmedMemberList?.map((confirmedMember, i) => (
          <Box key={i}>
            <ClubMember key={i} member={confirmedMember} />
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              sx={{ marginBottom: '3px' }}
            >
              <Button
                variant='outlined'
                id={confirmedMember.userNo}
                onClick={onClickDeleteMember}
                sx={{ height: '33px', width: '100px' }}
              >
                내보내기
              </Button>
            </Stack>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ListClubMember;
