import { Box, Stack } from '@mui/system';
import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import ClubThumbnail from './ClubThumbnail';
import useCommonStore from '@stores/common/useCommonStore';

const ListMyClubThumnail = ({ club }) => {
  const { state, clubState, clubNo, clubLeaderNo } = club;
  const { setField } = useCommonStore();

  const location = useLocation();

  const navigate = useNavigate();

  const onClickListClubMember = useCallback((event) => {
    const { id } = event.target;
    navigate(`/club/member/listmember/clubno/${clubNo}`);
  }, []);

  const onClickChatRoom = useCallback(
    (event) => {
      setField('shouldScroll', true);
      setField('isInfiniteScroll', false);
      setField('chatRoomEntryNo', club.clubNo);
      setField('chatType', 1);
      setField('chatRoomLeader', club.clubLeaderNo);
      setField('prevGetGroupChatPath', location.pathname);
      navigate(`/chat/group/message/list`);
    },
    [club, setField, location, navigate]
  );

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
          <Stack direction={'row'} justifyContent='center' spacing={0.5}>
            <Button
              variant='outlined'
              sx={{ width: '180px' }}
              onClick={onClickListClubMember}
            >
              멤버목록
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
