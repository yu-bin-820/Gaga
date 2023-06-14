import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import DeleteClubMemberDialog from './DeleteClubMemberDialog';
import ClubThumbnail from './ClubThumbnail';
import useCommunityStore from '@stores/communication/useCommunityStore';

const ListMyConfirmClubThumnail = ({ club }) => {
  const { clubNo } = club;
  const { setField } = useCommunityStore();

  const location = useLocation();

  const [deleteMemberDialogOpen, setDeleteMemberDialogOpen] = useState(false);

  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const onClickDeleteMember = useCallback(() => {
    setDeleteMemberDialogOpen(true);
  }, []);

  const onClickChatRoom = useCallback(
    (event) => {
      setField('shouldScroll', true);
      setField('isInfiniteScroll', false);
      setField('chatRoomEntryNo', clubNo);
      setField('chatType', 1);
      setField('chatRoomLeader', club.clubLeaderNo);
      setField('prevGetGroupChatPath', location.pathname);
      navigate(`/chat/group/message/list`);
    },
    [clubNo, club, location, setField, navigate]
  );

  return (
    <>
      <Box
        sx={{
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Stack spacing={0.8} paddingBottom={1}>
          <ClubThumbnail club={club} />
          <Stack direction='row' justifyContent='center' spacing={0.5}>
            <Button
              variant='outlined'
              sx={{ width: '180px' }}
              onClick={onClickDeleteMember}
            >
              참여 취소
            </Button>
            <Button
              variant='outlined'
              sx={{ width: '180px' }}
              onClick={onClickChatRoom}
            >
              채팅방 입장
            </Button>
          </Stack>
        </Stack>
      </Box>
      <DeleteClubMemberDialog
        open={deleteMemberDialogOpen}
        setOpen={setDeleteMemberDialogOpen}
        club={club}
      />
    </>
  );
};

ListMyConfirmClubThumnail.propTypes = {
  club: PropTypes.object.isRequired,
};

export default ListMyConfirmClubThumnail;
