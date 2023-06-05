import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import MeetingThumbnail from './MeetingThumnail';
import PropTypes from 'prop-types';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';


const ListMyConfirmMeetingThumnail = ({ meeting }) => {

    const { state, meetingSuccuess, meetingState, meetingNo } = meeting;


    const navigate = useNavigate();

    const { data: myData, mutate: mutateMe } = useSWR(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    const onClickDeleteMember = useCallback(async (event) => {
        const { id } = event.target;
        event.preventDefault();

        try {
        const data = {
            meetingNo: meetingNo,
            userNo: myData.userNo,
        };

        console.log(data);

        const response = await axios
            .delete(
            `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
            {
                data: data,
            }
            )
            .then(() => {
            });
        } catch (error) {
        console.error(error);
        }
    }, []);

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
                    onClick={onClickDeleteMember}>참여 취소</Button>
                    <Button 
                    onClick={onClickAddMeetingReview}>후기작성</Button>
                    <Button
                    onClick={onClickChatRoom}>채팅방 입장</Button>
                </Box>
        </div>
    );
};

MeetingThumbnail.propTypes = {
    meeting: PropTypes.shape({
      meetingState: PropTypes.number.isRequired,
      meetingSuccuess: PropTypes.number.isRequired,
      state: PropTypes.number.isRequired,
      meetingNo: PropTypes.number.isRequired,
    }).isRequired,
  };

export default ListMyConfirmMeetingThumnail;