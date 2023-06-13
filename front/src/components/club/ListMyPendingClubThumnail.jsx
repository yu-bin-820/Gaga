import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { Box, Stack } from '@mui/system';
import { Button } from '@mui/material';
import useCommonStore from '@stores/common/useCommonStore';
import DeleteMemberDialog from './DeleteClubMemberDialog';
import ClubThumbnail from './ClubThumbnail';

const ListMyPendingClubThumnail = ({ club }) => {
  const { setField } = useCommonStore();

  const [deleteMemberDialogOpen, setDeleteMemberDialogOpen] = useState(false);

  const navigate = useNavigate();

  const onClickDeleteMember = useCallback(() => {
    setDeleteMemberDialogOpen(true);
  }, []);

  const onClickDirectChat = useCallback(
    (e) => {
      setField('chatRoomEntryNo', club.clubLeaderNo);
      navigate('/chat/direct/message/list');
    },
    [navigate, setField]
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
          <Stack direction={'row'} justifyContent='center' spacing={1.5}>
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
