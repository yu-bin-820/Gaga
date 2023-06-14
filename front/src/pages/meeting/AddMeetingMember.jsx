import AddMeetingMemberThumnail from '@components/meeting/AddMeetingMemberThumnail';
import CommonTop from '@layouts/common/CommonTop';
import { Button, Typography, Modal, Box } from '@mui/material';
import { Stack } from '@mui/system';
import Payment from '@pages/payment/Payment';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';

const AddMeetingMember = () => {
  const { meetingno } = useParams();
  const [meeting, setMeeting] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`)
      .then((response) => {
        console.log(response.data);
        setMeeting(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [meetingno]);

  const onClickAddMember = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const data = {
          meetingNo: meeting?.meetingNo,
          userNo: myData.userNo,
        };

        console.log(data);

        await axios.post(
          `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
          data
        );

        setIsModalOpen(true);
      } catch (error) {
        console.error(error);
      }
    },
    [meeting, myData.userNo]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    navigate('/');
  }, [navigate]);

  console.log(myData);
  console.log(meeting);
  if (!meeting) {
    return <>로딩중</>;
  }
  return (
    <>
      <CommonTop />
      <Box sx={{ marginTop: '64px', bgcolor: '#ededed' }}>
        <Stack spacing={1}>
          <AddMeetingMemberThumnail meeting={meeting} />
          <Box sx={{ bgcolor: 'white' }}>
            <Stack
              direction={'row'}
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginLeft: '10px', marginRight: '10px' }}
            >
              <h4>결제금액</h4>
              <h4 style={{ textAlign: 'right' }}>
                {meeting.entryFee.toLocaleString()}원
              </h4>
            </Stack>
          </Box>
          <Box sx={{ bgcolor: 'white' }}>
            <Typography sx={{ fontSize: 13, margin: '5px', padding: '10px' }}>
              결제 후 30분 경과 전 : 전액 환불
              <br />
              승인 대기 중 신청 취소 : 전액 환불
              <br />
              참여 거절되거나 승인 후 내보내진 경우 : 전액 환불
              <br />
              참여 확정 모임의 진행일 하루 전 : 환불 불가
              <br />
              모임 진행 당일 신청의 경우 : 환불 불가
            </Typography>
          </Box>
          <Box sx={{ bgcolor: 'white' }}></Box>
        </Stack>
        <Stack
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'fixed', bottom: 5, left: 0, right: 0 }}
        >
          {meeting.entryFee === 0 ? (
            <Button
              variant="contained"
              sx={{ width: '85vw', borderRadius: '50px' }}
              onClick={onClickAddMember}
            >
              신청하기
            </Button>
          ) : (
            <Payment meeting={meeting} />
          )}
        </Stack>
      </Box>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="body1" component="div" sx={{ mb: 2 }}>
            참여가 완료되었습니다.
          </Typography>
          <Button variant="contained" onClick={handleCloseModal}>
            확인
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddMeetingMember;