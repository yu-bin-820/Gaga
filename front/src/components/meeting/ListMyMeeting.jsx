import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import ListMyMeetingThumnail from './ListMyMeetingThumnail';
import ListMyConfirmMeetingThumnail from './ListMyConfirmMeetingThumnail';
import ListMySuccessMeeting from './ListMySuccessMeeting';
import ListMyPendingMeetingThumnail from './ListMyPendingMeetingThumnail';
import ListMeetingProfile from './ListMeetingProfile';
import NoMeeting from './NoMeeting';

const ListMyMeeting = () => {
    
    const { userNo } = useParams();
    const [meetingList, setMeetingList] = useState();
    const navigate = useNavigate();

    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    const isMyProfile = !(userNo);

    useEffect(()=>{
        axios
            .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/mymeeting/${userNo ? userNo: myData?.userNo}`)
            .then((response)=>{
                console.log(response.data);
                setMeetingList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[userNo, myData]);

    return (
        <Box sx={{ marginBottom: '170px', backgroundColor: '#ededed' }}>
            <h5 style={{margin:'1px'}}>참여 확정 모임</h5>
            
            {meetingList?.filter(meeting => meeting.state === 2 && meeting.meetingSuccess === 1).length === 0 && (
                <NoMeeting 
                ment={'참여가 확정된 모임이 없습니다'}/>
            )}

            {meetingList?.map((meeting, i) => {
                if (meeting.state === 2 && meeting.meetingSuccess === 1) {
                return (
                    <Box key={i} sx={{ margin: '3px' }}>
                    {!isMyProfile&&(<ListMeetingProfile meeting={meeting} />)}
                    {isMyProfile&&(<ListMyConfirmMeetingThumnail meeting={meeting} />)}
                    </Box>
                );
                }
            })}
            <h5 style={{margin:'1px'}}>참여 신청 모임</h5>

            {meetingList?.filter(meeting => meeting.state === 1 && meeting.meetingSuccess===1).length === 0 && (
                <NoMeeting 
                ment={'참여 신청한 모임이 없습니다'}/>
            )}

            {meetingList?.map((meeting, i) => {
                if (meeting.state === 1 && meeting.meetingSuccess===1 ) {
                return (
                    <Box key={i} sx={{ margin: '3px' }}>
                    {!isMyProfile&&(<ListMeetingProfile meeting={meeting} />)}
                    <ListMyPendingMeetingThumnail meeting={meeting} />
                    </Box>
                );
                }
            })}

            <h5 style={{margin:'1px'}}>주최한 모임</h5>

            {meetingList?.filter(meeting => meeting.state === 0).length === 0 && (
                <NoMeeting 
                ment={'주최한 모임이 없습니다'}/>
            )}

            {meetingList?.map((meeting, i) => {
                if (meeting.state === 0) {
                return (
                    <Box key={i} sx={{ margin: '3px' }}>
                    {!isMyProfile&&(<ListMeetingProfile meeting={meeting} />)}
                    {isMyProfile&&(<ListMyMeetingThumnail meeting={meeting} />)}
                    </Box>
                );
                }
            })}

            <h5 style={{margin:'1px'}}>성사된 모임</h5>

            {meetingList?.filter(meeting => meeting?.state === ( 0|| 2 || 3) && meeting?.meetingSuccess === 2).length === 0 && (
                <NoMeeting 
                ment={'성사된 모임이 없습니다'}/>
            )}

            {meetingList?.map((meeting, i) => {
                if (meeting?.state === ( 0|| 2 || 3) && meeting?.meetingSuccess === 2) {
                return (
                    <Box key={i} sx={{ margin: '3px' }}>
                    {!isMyProfile&&(<ListMeetingProfile />)}
                    {isMyProfile&&(<ListMySuccessMeeting meeting={meeting} />)}
                    </Box>
                );
                }
            })}

        </Box>
    );
};

export default ListMyMeeting;