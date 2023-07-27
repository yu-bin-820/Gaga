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
import useChatMapStore from '@stores/communication/useChatMapStore';

const ListMyConfirmClubThumnail = ({ club }) => {
  const { clubNo } = club;
  const {
    setField: setCommunityField,
    prevChatRoomEntryNo,
    prevGetGroupChatPath,
    prevChatType,
    prevChatRoomLeader,
  } = useCommunityStore();
  const { setField: setChatField } = useChatMapStore();

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

  const onClickChatRoom = useCallback(() => {
    setChatField('shouldScroll', true);
    setChatField('infiniteScroll', false);
    const isArray = Array.isArray(prevChatRoomEntryNo);
    const isPrevPathArray = Array.isArray(prevGetGroupChatPath);

    console.log('isArray', isArray);
    console.log('isPrevPathArray', isPrevPathArray);
    console.log('prevChatRoomEntryNo', prevChatRoomEntryNo);
    console.log('prevChatType', prevChatType);
    console.log('prevChatRoomLeader', prevChatRoomLeader);

    setCommunityField('chatRoomEntryNo', club?.clubNo);
    setCommunityField('chatType', 1);
    setCommunityField('chatRoomLeader', club?.clubLeaderNo);

    setCommunityField(
      'prevChatRoomEntryNo',
      isArray ? [...prevChatRoomEntryNo, club?.clubNo] : [club?.clubNo]
    );
    setCommunityField('prevChatType', isArray ? [...prevChatType, 1] : [1]);
    setCommunityField(
      'prevChatRoomLeader',
      isArray
        ? [...prevChatRoomLeader, club?.clubLeaderNo]
        : [club?.clubLeaderNo]
    );

    setCommunityField(
      'prevGetGroupChatPath',
      isPrevPathArray
        ? [...prevGetGroupChatPath, location.pathname]
        : [location.pathname]
    );

    console.log(prevChatRoomEntryNo, prevChatRoomLeader, prevChatType);
    console.log('----------------------------------------------------');
    console.log('isArray', isArray);
    console.log('isPrevPathArray', isPrevPathArray);
    console.log('prevChatRoomEntryNo', prevChatRoomEntryNo);
    console.log('prevChatType', prevChatType);
    console.log('prevChatRoomLeader', prevChatRoomLeader);

    navigate(`/chat/group/message/list`);
  }, [
    club,
    setChatField,
    setCommunityField,
    location,
    navigate,
    prevChatRoomEntryNo,
    prevChatType,
    prevChatRoomLeader,
    prevGetGroupChatPath,
  ]);

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
          <Stack direction="row" justifyContent="center" spacing={0.5}>
            <Button
              variant="outlined"
              sx={{ width: '180px' }}
              onClick={onClickDeleteMember}
            >
              참여 취소
            </Button>
            <Button
              variant="outlined"
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
