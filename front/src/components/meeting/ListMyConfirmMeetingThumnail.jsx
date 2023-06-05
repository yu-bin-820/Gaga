import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import MeetingThumbnail from './MeetingThumnail';
import PropTypes from 'prop-types';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import useCommonStore from '@stores/common/useCommonStore';
import DeleteMemberDialog from './DeleteMemberDialog';


const ListMyConfirmMeetingThumnail = ({ meeting }) => {

    const { meetingNo } = meeting;
    const {setField} = useCommonStore();

    const [deleteMemberDialogOpen, setDeleteMemberDialogOpen] =
    useState(false);


    const navigate = useNavigate();

    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    const onClickDeleteMember = useCallback(() => {
        setDeleteMemberDialogOpen(true);
    }, []);

    const onClickChatRoom=useCallback((event)=>{
        setField('chatRoomEntryNo',meetingNo);
        setField('chatType',2);
        setField('chatRoomLeader',meeting.meetingLeaderNo)
        navigate(`/chat/group/message/list`);
    },[]);

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