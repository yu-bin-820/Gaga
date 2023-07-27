import { Box, Stack } from '@mui/system';
import { useCallback } from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import ClubThumbnail from './ClubThumbnail';

import useCommunityStore from '@stores/communication/useCommunityStore';
import useChatMapStore from '@stores/communication/useChatMapStore';

const ListMyClubThumnail = ({ club }) => {
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

  const navigate = useNavigate();

  const onClickListClubMember = useCallback(() => {
    navigate(`/club/member/listmember/clubno/${clubNo}`);
  }, [clubNo, navigate]);

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
    <div>
      <Box
        sx={{
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Stack spacing={0.8} paddingBottom={1}>
          <ClubThumbnail club={club} />
          <Stack direction={'row'} justifyContent="center" spacing={0.5}>
            <Button
              variant="outlined"
              sx={{ width: '180px' }}
              onClick={onClickListClubMember}
            >
              멤버목록
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
    </div>
  );
};

ListMyClubThumnail.propTypes = {
  club: PropTypes.shape({
    clubState: PropTypes.number.isRequired,
    state: PropTypes.number.isRequired,
    clubNo: PropTypes.number.isRequired,
    clubLeaderNo: PropTypes.number.isRequired,
  }).isRequired,
};

export default ListMyClubThumnail;
