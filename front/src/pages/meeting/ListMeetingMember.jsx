import MeetingMember from '@components/meeting/MeetingMember';
import NoMeeting from '@components/meeting/NoMeeting';
import CommonTop from '@layouts/common/CommonTop';
import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';

const ListMeetingMember = () => {
  const { meetingno } = useParams();

  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { data: meeting, mutate: mutateMeeting } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`,
    fetcher
  );

  const { data: pendingMemberList, mutate: mutatePendingMemberList } = useSWR(
    `${
      import.meta.env.VITE_SPRING_HOST
    }/rest/user/list/grouptype/2/no/${meetingno}/state/1`,
    fetcher
  );
  const { data: confirmedMemberList, mutate: mutateConfirmedMemberList } =
    useSWR(
      `${
        import.meta.env.VITE_SPRING_HOST
      }/rest/user/list/grouptype/2/no/${meetingno}/state/2`,
      fetcher
    );

  const { mutate: mutateMyMeetingList } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/mymeeting/${
      myData?.userNo
    }`,
    fetcher
  );

  const onClickUpdateMember = useCallback(
    async (event) => {
      const { id } = event.target;
      event.preventDefault();

      try {
        const data = {
          meetingNo: meetingno,
          userNo: id,
          state: 2,
        };

        console.log(data);

        await axios
          .patch(
            `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
            data
          )
          .then(() => {
            mutateConfirmedMemberList();
            mutatePendingMemberList();
            mutateMeeting();
            mutateMyMeetingList();
          });
      } catch (error) {
        console.error(error);
      }
    },
    [
      meetingno,
      mutateConfirmedMemberList,
      mutatePendingMemberList,
      mutateMeeting,
      mutateMyMeetingList,
    ]
  );

  const onClickDeleteMember = useCallback(
    async (event) => {
      const { id } = event.target;
      event.preventDefault();

      try {
        const data = {
          meetingNo: meetingno,
          userNo: id,
        };

        console.log(data);

        await axios
          .delete(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`, {
            data: data,
          })
          .then(() => {
            mutateConfirmedMemberList();
            mutatePendingMemberList();
            mutateMeeting();
            mutateMyMeetingList();
          });

        await axios.patch(
          `${import.meta.env.VITE_SPRING_HOST}/rest/payment/refund/delete`,
          data
        );
      } catch (error) {
        console.error(error);
      }
    },
    [meetingno, mutateConfirmedMemberList, mutatePendingMemberList]
  );

  return (
    <Box sx={{ bgcolor: '#ededed' }}>
      <CommonTop />
      <Box
        sx={{
          marginTop: '64px',
          paddingBottom: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
          bgcolor: 'white',
        }}
      >
        <h5>신청 멤버</h5>
        {pendingMemberList?.length === 0 && (
          <NoMeeting ment={'신청 멤버가 없습니다'} />
        )}
        {pendingMemberList?.map((pendingMember, i) => (
          <Box key={i} sx={{ marginBottom: '10px' }}>
            <MeetingMember member={pendingMember} />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              sx={{ marginBottom: '3px' }}
            >
              <Button
                variant="contained"
                id={pendingMember.userNo}
                onClick={onClickDeleteMember}
                sx={{ height: '33px', width: '100px' }}
              >
                거절
              </Button>
              <Button
                variant="contained"
                id={pendingMember.userNo}
                onClick={onClickUpdateMember}
                sx={{ height: '33px', width: '100px' }}
                disabled={meeting?.count >= meeting?.meetingMaxMemberNo}
              >
                수락
              </Button>
            </Stack>
          </Box>
        ))}
      </Box>
      <Box sx={{ paddingLeft: '10px', paddingRight: '10px', bgcolor: 'white' }}>
        <h5>확정 멤버</h5>
        {confirmedMemberList?.length === 0 && (
          <NoMeeting ment={'확정 멤버가 없습니다'} />
        )}
        {confirmedMemberList?.map((confirmedMember, i) => (
          <Box key={i}>
            <Stack direction={'row'} alignItems={'center'}>
              <MeetingMember key={i} member={confirmedMember} />
              <Button
                variant="contained"
                id={confirmedMember.userNo}
                onClick={onClickDeleteMember}
                sx={{ minWidth: '100px', height: '33px', width: '100px' }}
              >
                내보내기
              </Button>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ListMeetingMember;
