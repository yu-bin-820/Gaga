import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MeetingThumbnail from './MeetingThumnail';
import PropTypes from 'prop-types';
import DeleteMemberDialog from './DeleteMemberDialog';
import useCommunityStore from '@stores/communication/useCommunityStore';
import useChatMapStore from '@stores/communication/useChatMapStore';

const ListMyConfirmMeetingThumnail = ({ meeting }) => {
  const location = useLocation();

  const {
    setField: setCommunityField,
    prevChatRoomEntryNo,
    prevGetGroupChatPath,
    prevChatType,
    prevChatRoomLeader,
  } = useCommunityStore();
  const { setField: setChatField } = useChatMapStore();

  const [deleteMemberDialogOpen, setDeleteMemberDialogOpen] = useState(false);

  const navigate = useNavigate();

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

    setCommunityField('chatRoomEntryNo', meeting?.meetingNo);
    setCommunityField('chatType', 2);
    setCommunityField('chatRoomLeader', meeting?.meetingLeaderNo);

    setCommunityField(
      'prevChatRoomEntryNo',
      isArray
        ? [...prevChatRoomEntryNo, meeting?.meetingNo]
        : [meeting?.meetingNo]
    );
    setCommunityField('prevChatType', isArray ? [...prevChatType, 2] : [2]);
    setCommunityField(
      'prevChatRoomLeader',
      isArray
        ? [...prevChatRoomLeader, meeting?.meetingLeaderNo]
        : [meeting?.meetingLeaderNo]
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
    meeting,
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
              onClick={onClickChatRoom}
            >
              채팅방 입장
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

ListMyConfirmMeetingThumnail.propTypes = {
  meeting: PropTypes.object.isRequired,
};

export default ListMyConfirmMeetingThumnail;
