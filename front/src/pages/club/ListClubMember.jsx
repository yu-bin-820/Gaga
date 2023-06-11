import ClubMember from '@components/club/ClubMember';
import CommonTop from '@layouts/common/CommonTop';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
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
      <Box>
        <h5>신청 멤버</h5>
        {pendingMemberList?.map((pendingMember, i) => (
          <Box key={i}>
            <ClubMember member={pendingMember} />
            <Button id={pendingMember.userNo} onClick={onClickDeleteMember}>
              거절
            </Button>
            <Button id={pendingMember.userNo} onClick={onClickUpdateMember}>
              수락
            </Button>
          </Box>
        ))}
        <h5>확정 멤버</h5>
        {confirmedMemberList?.map((confirmedMember, i) => (
          <Box key={i}>
            <ClubMember key={i} member={confirmedMember} />
            <Button id={confirmedMember.userNo} onClick={onClickDeleteMember}>
              내보내기
            </Button>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ListClubMember;
