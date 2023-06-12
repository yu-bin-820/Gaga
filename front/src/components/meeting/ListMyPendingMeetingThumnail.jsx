import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { Box, Stack } from '@mui/system';
import MeetingThumbnail from './MeetingThumnail';
import { Button } from '@mui/material';
import DeleteMemberDialog from './DeleteMemberDialog';
import useCommunityStore from '@stores/communication/useCommunityStore';



const ListMyPendingMeetingThumnail = ({ meeting }) => {

    const {setField} = useCommunityStore();

    const [deleteMemberDialogOpen, setDeleteMemberDialogOpen] =
    useState(false);

    const navigate = useNavigate();

        const onClickDeleteMember = useCallback(() => {
            setDeleteMemberDialogOpen(true);
        }, []);

    const onClickDirectChat = useCallback(
        (e) => {
        setField('chatRoomEntryNo', meeting?.meetingLeaderNo);
        navigate('/chat/direct/message/list');
        },
        [navigate, setField, meeting?.meetingLeaderNo]
    );

    return (
        <div>
            <Box
                sx={{
                    borderRadius: 2,
                    p: 2,
                    minWidth: 295,
                    padding: 1,
                    backgroundColor: '#ffffff'
                }}
                >
                    <Stack
                    spacing={0.8}
                    >
                    <MeetingThumbnail meeting={meeting}/>
                    <Stack
                    direction={'row'}
                    justifyContent="center"
                    spacing={1.5}
                    >
                    <Button
                    variant="outlined"
                    sx={{ width: '180px' }}
                    onClick={onClickDeleteMember}>
                        참여 취소
                        </Button>
                    <Button
                    variant="outlined"
                    sx={{ width: '180px' }}
                    onClick={onClickDirectChat}>
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