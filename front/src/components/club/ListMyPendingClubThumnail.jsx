import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import { Box, Stack } from '@mui/system';
import { Button } from '@mui/material';
import DeleteMemberDialog from './DeleteClubMemberDialog';
import ClubThumbnail from './ClubThumbnail';
import useCommunityStore from '@stores/communication/useCommunityStore';
import useChatMapStore from '@stores/communication/useChatMapStore';

const ListMyPendingClubThumnail = ({ club }) => {
  const {
    setField: setCommunityField,
    prevChatRoomEntryNo,
    prevGetDirectChatPath,
    prevChatType,
    prevChatRoomLeader,
  } = useCommunityStore();
  const { setField: setChatField } = useChatMapStore();
  const location = useLocation();

  const [deleteMemberDialogOpen, setDeleteMemberDialogOpen] = useState(false);

  const navigate = useNavigate();

  const onClickDeleteMember = useCallback(() => {
    setDeleteMemberDialogOpen(true);
  }, []);

  const onClickDirectChat = useCallback(() => {
    const isArray = Array.isArray(prevChatRoomEntryNo);
    const isPrevPathArray = Array.isArray(prevGetDirectChatPath);

    console.log('isArray', isArray);
    console.log('isPrevPathArray', isPrevPathArray);
    console.log('prevChatRoomEntryNo', prevChatRoomEntryNo);
    console.log('prevChatType', prevChatType);
    console.log('prevChatRoomLeader', prevChatRoomLeader);

    setChatField('shouldScroll', true);
    setChatField('isInfiniteScroll', false);

    setCommunityField('chatRoomEntryNo', club?.clubLeaderNo);

    setCommunityField(
      'prevChatRoomEntryNo',
      isArray
        ? [...prevChatRoomEntryNo, club?.clubLeaderNo]
        : [club?.clubLeaderNo]
    );
    setCommunityField('prevChatType', isArray ? [...prevChatType, 3] : [3]);
    setCommunityField(
      'prevChatRoomLeader',
      isArray
        ? [...prevChatRoomLeader, club?.clubLeaderNo]
        : [club?.clubLeaderNo]
    );
    setCommunityField(
      'prevGetDirectChatPath',
      isPrevPathArray
        ? [...prevGetDirectChatPath, location.pathname]
        : [location.pathname]
    );
    console.log('------------------------------------------');
    console.log('isArray', isArray);
    console.log('isPrevPathArray', isPrevPathArray);
    console.log('prevChatRoomEntryNo', prevChatRoomEntryNo);
    console.log('prevChatType', prevChatType);
    console.log('prevChatRoomLeader', prevChatRoomLeader);

    navigate('/chat/direct/message/list');
  }, [
    navigate,
    setCommunityField,
    location,
    club,
    setChatField,
    prevChatRoomEntryNo,
    prevChatType,
    prevChatRoomLeader,
    prevGetDirectChatPath,
  ]);

  return (
    <div>
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
              onClick={onClickDirectChat}
            >
              리더에게 문의
            </Button>
          </Stack>
        </Stack>
      </Box>
      <DeleteMemberDialog
        open={deleteMemberDialogOpen}
        setOpen={setDeleteMemberDialogOpen}
        club={club}
      />
    </div>
  );
};

ListMyPendingClubThumnail.propTypes = {
  club: PropTypes.object.isRequired,
};

export default ListMyPendingClubThumnail;
