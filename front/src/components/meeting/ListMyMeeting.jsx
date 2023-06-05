import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import ListMyMeetingThumnail from './ListMyMeetingThumnail';
import ListMyConfirmMeetingThumnail from './ListMyConfirmMeetingThumnail';
import ListMySuccessMeeting from './ListMySuccessMeeting';
import ListMyPendingMeetingThumnail from './ListMyPendingMeetingThumnail';

const ListMyMeeting = () => {
    
    const { userNo } = useParams();
    const [meetingList, setMeetingList] = useState();
    const navigate = useNavigate();

    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    useEffect(()=>{
        axios
            .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/mymeeting/${userNo ? userNo: myData.userNo}`)
            .then((response)=>{
                console.log(response.data);
                setMeetingList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[userNo]);

    return (
        <Box sx={{ marginBottom: '170px', backgroundColor: '#ededed' }}>
            <h5 style={{margin:'1px'}}>참여 확정 모임</h5>
            {meetingList?.map((meeting, i) => {
                if (meeting.state === 2 && meeting.meetingSuccess === 1) {
                return (
                    <Box key={i} sx={{ margin: '3px' }}>
                    <ListMyConfirmMeetingThumnail meeting={meeting} />
                    </Box>
                );
                } else {
                return null;
                }
            })}
            <h5 style={{margin:'1px'}}>참여 신청 모임</h5>
            {meetingList?.map((meeting, i) => {
                if (meeting.state === 1) {
                return (
                    <Box key={i} sx={{ margin: '3px' }}>
                    <ListMyPendingMeetingThumnail meeting={meeting} />
                    </Box>
                );
                } else {
                return null;
                }
            })}

            <h5 style={{margin:'1px'}}>주최한 모임</h5>
            {meetingList?.map((meeting, i) => {
                if (meeting.state === 0) {
                return (
                    <Box key={i} sx={{ margin: '3px' }}>
                    <ListMyMeetingThumnail meeting={meeting} />
                    </Box>
                );
                } else {
                return null;
                }
            })}

            <h5>성사된 모임</h5>
            {meetingList?.map((meeting, i) => {
                if (meeting.state === (2 || 3) && meeting.meetingSuccess === 2) {
                return (
                    <Box key={i} sx={{ margin: '3px' }}>
                    <ListMySuccessMeeting meeting={meeting} />
                    </Box>
                );
                } else {
                return null;
                }
            })}

        </Box>
    );
};

export default ListMyMeeting;