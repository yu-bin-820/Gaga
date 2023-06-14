import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MeetingThumbnail from './MeetingThumnail';
import PropTypes from 'prop-types';
import DeleteMemberDialog from './DeleteMemberDialog';
import useCommunityStore from '@stores/communication/useCommunityStore';


const ListMyConfirmMeetingThumnail = ({ meeting }) => {

    const location = useLocation();
    const {setField} = useCommunityStore();

    const [deleteMemberDialogOpen, setDeleteMemberDialogOpen] =
    useState(false);


    const navigate = useNavigate();

    const onClickDeleteMember = useCallback(() => {
        setDeleteMemberDialogOpen(true);
    }, []);

    const onClickChatRoom = useCallback(() => {
		setField('shouldScroll', true);
		setField('isInfiniteScroll', false);
        setField('chatRoomEntryNo', meeting.meetingNo);
        setField('chatType', 2);
        setField('chatRoomLeader', meeting.meetingLeaderNo);
		setField('prevGetGroupChatPath', location.pathname);
    navigate(`/chat/group/message/list`);
  }, [meeting,setField,location, navigate]);

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
                    onClick={onClickDeleteMember}>참여 취소</Button>
                    <Button
                    variant="outlined"
                    sx={{ width: '180px' }}
                    onClick={onClickChatRoom}>채팅방 입장</Button>
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