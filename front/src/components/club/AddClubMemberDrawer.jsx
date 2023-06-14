import {
  Button,
  Divider,
  Drawer,
  IconButton,
  Modal,
  Skeleton,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import fetcher from '@utils/fetcher';
import PropTypes from 'prop-types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import useSWR from 'swr';
import AddClubMemberThumnail from './AddClubMemberThumnail';

const AddClubMemberDrawer = ({
  settingsAddMemberOpen,
  setSettingsAddMemberOpen,
  toggleSettingsAddMember,
  clubNo,
}) => {
  const [club, setClub] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/club/no/${clubNo}`)
      .then((response) => {
        console.log(response.data);
        setClub(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clubNo]);

  const onClickAddMember = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const data = {
          clubNo: club?.clubNo,
          userNo: myData.userNo,
        };

        console.log(data);

        await axios
          .post(`${import.meta.env.VITE_SPRING_HOST}/rest/club/member`, data)
          .then(setIsModalOpen(true));
      } catch (error) {
        console.error(error);
      }
    },
    [club, myData.userNo]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSettingsAddMemberOpen(false);
  }, [setSettingsAddMemberOpen]);

  if (!club) {
    return (
      <Skeleton
        animation='wave'
        variant='rectangular'
        width={'100vw'}
        height={'100vh'}
      />
    );
  }

  return (
    <Drawer
      anchor='right'
      open={settingsAddMemberOpen}
      onClose={toggleSettingsAddMember(false)}
      onOpen={toggleSettingsAddMember(true)}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={{ height: '55px', minWidth: '100vw' }}
      >
        <IconButton
          onClick={() => {
            setSettingsAddMemberOpen(false);
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Box sx={{ bgcolor: '#ededed' }}>
        <Stack spacing={1}>
          <AddClubMemberThumnail club={club} />

          <Box sx={{ bgcolor: 'white' }}>
            <Typography sx={{ fontSize: 13, margin: '5px', padding: '10px' }}>
              클럽은 만남이 이루어지지 않습니다.
              <br /> 오프라인 만남을 원하시는 경우에는 <br />
              '모임'을 신청해 주세요.
            </Typography>
          </Box>

          <Box sx={{ bgcolor: 'white' }}></Box>
        </Stack>
        <Stack
          spacing={0}
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ position: 'fixed', bottom: 5, left: 0, right: 0 }}
        >
          <Button
            variant='contained'
            sx={{ width: '85vw', borderRadius: '50px' }}
            onClick={onClickAddMember}
          >
            신청하기
          </Button>
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
          <Typography variant='body1' component='div' sx={{ mb: 2 }}>
            참여가 완료되었습니다.
          </Typography>
          <Button variant='contained' onClick={handleCloseModal}>
            확인
          </Button>
        </Box>
      </Modal>
    </Drawer>
  );
};

AddClubMemberDrawer.propTypes = {
  settingsAddMemberOpen: PropTypes.bool.isRequired,
  setSettingsAddMemberOpen: PropTypes.func.isRequired,
  toggleSettingsAddMember: PropTypes.func.isRequired,
  clubNo: PropTypes.number.isRequired,
};

export default AddClubMemberDrawer;
