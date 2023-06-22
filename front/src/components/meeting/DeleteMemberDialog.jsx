import {
  Button,
  Dialog,
  DialogActions,
  Modal,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import axios from 'axios';

const DeleteMemberDialog = ({ open, setOpen, meeting }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { mutate: mutateMyMeetingList } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/mymeeting/${
      myData?.userNo
    }`,
    fetcher
  );

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
    setOpen(false);
  };

  const onClickDeleteMember = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const data = {
          meetingNo: meeting?.meetingNo,
          userNo: myData?.userNo,
        };

        console.log(data);

        await axios
          .delete(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`, {
            data: data,
          })
          .then(() => {
            setOpen(false);
            mutateMyMeetingList();
          });
      } catch (error) {
        console.error(error);
      }
    },
    [meeting?.meetingNo, myData?.userNo, setOpen, mutateMyMeetingList]
  );

  const onClickDeleteMemberRefund = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const data = {
          meetingNo: meeting?.meetingNo,
          userNo: myData?.userNo,
        };

        console.log(data);

        const postResponseOne = await axios.post(
          `${import.meta.env.VITE_SPRING_HOST}/rest/payment/refund/usermeeting`,
          data
        );

        const merchant_data = { merchant_uid: postResponseOne.data };

        const postResponseTwo = await axios.post(
          `${import.meta.env.VITE_SPRING_HOST}/rest/payment/refund`,
          merchant_data
        );

        if (postResponseTwo.status === 200) {
          setOpenModal(true);

          const deleteResponse = await axios.delete(
            `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
            { data: data } // userData를 delete 요청에 사용
          );
        } else {
          alert('환불 요청이 실패하였습니다.');
        }
      } catch (error) {
        console.error(error);
        alert('환불 요청 중 오류가 발생하였습니다.');
      }
    },
    [meeting?.meetingNo, myData?.userNo, setOpen, mutateMyMeetingList]
  );

  return (
    <Dialog open={open} onClose={handleClose} sx={{ padding: '20px' }}>
      <Typography variant='h6' sx={{ fontSize: '16px', padding: '20px' }}>
        모임 참여를 취소하시겠습니까?
      </Typography>
      <DialogActions>
        <Stack
          direction={'row'}
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <Button
            variant='contained'
            sx={{ width: '100px' }}
            onClick={handleClose}
          >
            아니오
          </Button>
          <Button
            variant='contained'
            sx={{ width: '100px' }}
            onClick={
              meeting.entryFee === 0
                ? onClickDeleteMember
                : onClickDeleteMemberRefund
            }
          >
            예
          </Button>
          <Modal
            open={openModal}
            onClose={closeModal}
            aria-describedby='modal-description'
          >
            <Box
              sx={{
                p: 4,
                backgroundColor: 'white',
                borderRadius: 2,
                mx: 'auto',
                my: '20%',
                width: '50%',
              }}
            >
              <Typography id='modal-description' sx={{ mt: 2 }}>
                환불이 성공적으로 <br />
                처리되었습니다.
              </Typography>
              <Button
                onClick={() => {
                  closeModal();
                  mutateMyMeetingList();
                }}
                style={{ alignSelf: 'flex-end', marginTop: 16 }}
                variant='contained'
              >
                확인
              </Button>
            </Box>
          </Modal>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

DeleteMemberDialog.propTypes = {
  meeting: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
  setOpen: PropTypes.object.isRequired,
};

export default DeleteMemberDialog;
