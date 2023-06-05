import fetcher from '@utils/fetcher';
import React, { useCallback } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router';
import axios from 'axios';
import MeetingThumbnail from './MeetingThumnail';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';


const ListMySuccessMeeting = ({ meeting }) => {
    const { state, entryFee, meetingSuccuess, meetingState, meetingNo } = meeting;


    const navigate = useNavigate();

    const { data: myData, mutate: mutateMe } = useSWR(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    const onClickAddMeetingReview=useCallback((event)=>{
        const { id } = event.target;
        navigate(`/meeting/review/addreview/meetingno/${meetingNo}`);
    },[]);

    const onClickChatRoom=useCallback((event)=>{
        const { id } = event.target;
        navigate(`/meeting/member/listmember/meetingno/${meetingNo}`);
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
                    <MeetingThumbnail meeting={meeting}/>
                    <Button 
                    onClick={onClickAddMeetingReview}>후기작성</Button>
                    <Button
                    onClick={onClickChatRoom}>채팅방 입장</Button>
                </Box>
        </div>
    );
};


ListMySuccessMeeting.propTypes = {
    meeting: PropTypes.shape({
      meetingState: PropTypes.number.isRequired,
      meetingSuccuess: PropTypes.number.isRequired,
      state: PropTypes.number.isRequired,
      meetingNo: PropTypes.number.isRequired,
      entryFee: PropTypes.number.isRequired,
    }).isRequired,
  };

export default ListMySuccessMeeting;