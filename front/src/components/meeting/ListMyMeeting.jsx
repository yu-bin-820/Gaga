import { Button } from '@mui/material';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import MeetingThumbnail from './MeetingThumbnail';
import GroupThumbnail from '@components/common/GroupThumbnail';

const ListMyMeeting = () => {
    
    const { userno } = useParams();
    const [meetingList, setMeetingList] = useState();
    const navigate = useNavigate();

    const { data: myData, mutate: mutateMe } = useSWR(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    useEffect(()=>{
        axios
            .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/mymeeting/${userno}`)
            .then((response)=>{
                console.log(response.data);
                setMeetingList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[myData]);

    const onClickMeeting=useCallback((event)=>{
        const { id } = event.target;
        navigate(`/meeting/meetingno/${id}`);
    },[]);

    const onClickListMeetingMember=useCallback((event)=>{
        const { id } = event.target;
        navigate(`/meeting/member/listmember/meetingno/${id}`);
    },[]);

    const onClickMeetingSuccess = React.useCallback((MouseEvent)=>{
        const { id } = event.target;
        navigate(`/meeting/updatemeetingsuccess/meetingno/${id}`);
        },[]);

        const onClickAddMeetingReview=useCallback((event)=>{
            const { id } = event.target;
            navigate(`/meeting/review/addreview/meetingno/${id}`);
        },[]);

    return (
        <Box>
            <Box>
                meeting.state 0 : leader / 1 : 신청중 / 2: 확정
                {meetingList?.map((meeting,i)=>(
                    <Box key={i}>
                    <MeetingThumbnail meeting={meeting}/>
                    <h5>{meeting.state}</h5>
                    <Button 
                    id={meeting.meetingNo}
                    onClick={onClickMeeting}>미팅정보</Button>
                    <Button 
                    id={meeting.meetingNo}
                    onClick={onClickListMeetingMember}>멤버리스트</Button>
                    <Button 
                    id={meeting.meetingNo}
                    onClick={onClickMeetingSuccess}>성사하기</Button>
                    <Button 
                    id={meeting.meetingNo}
                    onClick={onClickAddMeetingReview}>후기작성</Button>
                    </Box>
                    
                ))}
            </Box>
        </Box>
    );
};

export default ListMyMeeting;