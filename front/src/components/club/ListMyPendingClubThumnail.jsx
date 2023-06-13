import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import { Box, Stack } from '@mui/system';
import { Button } from '@mui/material';
import DeleteMemberDialog from './DeleteClubMemberDialog';
import ClubThumbnail from './ClubThumbnail';
import useCommunityStore from '@stores/communication/useCommunityStore';

const ListMyPendingClubThumnail = ({ club }) => {
  const { setField } = useCommunityStore();
  const location = useLocation();

  const [deleteMemberDialogOpen, setDeleteMemberDialogOpen] = useState(false);

  const navigate = useNavigate();

  const onClickDeleteMember = useCallback(() => {
    setDeleteMemberDialogOpen(true);
  }, []);

  const onClickDirectChat = useCallback(
    (e) => {
      setField('shouldScroll', true);
      setField('chatRoomEntryNo', club.clubLeaderNo);
      setField('prevGetDirectChatPath', location.pathname);
      navigate('/chat/direct/message/list');
    },
    [navigate, setField, location]
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
