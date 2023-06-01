import MeetingMember from "@components/meeting/MeetingMember";
import CommonTop from "@layouts/common/CommonTop";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useSWR from "swr";

const ListMeetingMember = () => {
  const { meetingno } = useParams();
  const navigate = useNavigate();

  const { data: pendingMemberList, mutate: mutatePendingMemberList } = useSWR(
    `http://${
      import.meta.env.VITE_SPRING_HOST
    }/rest/user/list/grouptype/2/no/${meetingno}/state/1`,
    fetcher
  );
  const { data: confirmedMemberList, mutate: mutateConfirmedMemberList } =
    useSWR(
      `http://${
        import.meta.env.VITE_SPRING_HOST
      }/rest/user/list/grouptype/2/no/${meetingno}/state/2`,
      fetcher
    );

  const onClickUpdateMember = useCallback(async (event) => {
    const { id } = event.target;
    event.preventDefault();

    try {
      const data = {
        meetingNo: meetingno,
        userNo: id,
        state: 2,
      };

      console.log(data);

      const response = await axios
        .patch(
          `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
          data
        )
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
        meetingNo: meetingno,
        userNo: id,
      };

      console.log(data);

      const response = await axios
        .delete(
          `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
          {
            data: data,
          }
        )
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
            <MeetingMember member={pendingMember} />
            <Button id={pendingMember.userNo} onClick={onClickDeleteMember}>
              거절{" "}
            </Button>
            <Button id={pendingMember.userNo} onClick={onClickUpdateMember}>
              수락{" "}
            </Button>
          </Box>
        ))}
        <h5>확정 멤버</h5>
        {confirmedMemberList?.map((confirmedMember, i) => (
          <Box key={i}>
            <MeetingMember key={i} member={confirmedMember} />
            <Button id={confirmedMember.userNo} onClick={onClickDeleteMember}>
              내보내기{" "}
            </Button>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ListMeetingMember;
