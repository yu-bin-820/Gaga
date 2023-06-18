import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import { Box, Stack } from '@mui/system';
import MeetingThumbnail from './MeetingThumnail';
import { Button } from '@mui/material';
import DeleteMemberDialog from './DeleteMemberDialog';
import useCommunityStore from '@stores/communication/useCommunityStore';
import useChatMapStore from '@stores/communication/useChatMapStore';

const ListMyPendingMeetingThumnail = ({ meeting }) => {
  const location = useLocation();

  const {
    setField: setCommunityField,
    prevChatRoomEntryNo,
    prevGetDirectChatPath,
    prevChatType,
    prevChatRoomLeader,
  } = useCommunityStore();
  const { setField: setChatField } = useChatMapStore();

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

    setCommunityField('chatRoomEntryNo', meeting?.meetingLeaderNo);

    setCommunityField(
      'prevChatRoomEntryNo',
      isArray
        ? [...prevChatRoomEntryNo, meeting?.meetingLeaderNo]
        : [meeting?.meetingLeaderNo]
    );
    setCommunityField('prevChatType', isArray ? [...prevChatType, 3] : [3]);
    setCommunityField(
      'prevChatRoomLeader',
      isArray
        ? [...prevChatRoomLeader, meeting?.meetingLeaderNo]
        : [meeting?.meetingLeaderNo]
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
    meeting,
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
          p: 2,
          minWidth: 295,
          padding: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <Stack spacing={0.8}>
          <MeetingThumbnail meeting={meeting} />
          <Stack direction={'row'} justifyContent="center" spacing={1.5}>
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
        meeting={meeting}
      />
    </div>
  );
};

ListMyPendingMeetingThumnail.propTypes = {
  meeting: PropTypes.object.isRequired,
};

export default ListMyPendingMeetingThumnail;
