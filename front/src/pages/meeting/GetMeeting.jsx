import ListMeetingReview from '@components/meeting/ListMeetingReview';
import { Box, Button, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PeopleIcon from '@mui/icons-material/People';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GetMeetingStaticMap from '@components/meeting/map/GetMeetingStaticMap';

const GetMeeting = () => {

    const { meetingno } = useParams();
    const [meeting, setMeeting] = useState();

    const navigate = useNavigate();
    const onClickUpdate = useCallback((MouseEvent)=>{
        navigate(`/meeting/updatemeeting/${ meetingno }`);
    },[]);

    useEffect(()=>{
        axios
            .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`)
            .then((response)=>{
                console.log(response.data);
                setMeeting(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[]);

    const onClickDelete = useCallback(
        async (event) => {
            event.preventDefault();

            try {
            const data = {
                meetingNo: meeting?.meetingNo
            };

            console.log(data);

            const response = await axios.delete(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting`, {
                data: data,
            });

            navigate(`/`);
                
            } catch (error) {
                console.error(error);
            }
        },
        []
    );

    const onClickAddMember=useCallback((event)=>{
        navigate(`/meeting/member/addmember/${meetingno}`);
    },[]);

    return (
    <Box sx={{marginTop:'64px'}}>
        <div style={{ position: 'relative', marginBottom: '10px' }}>
        <ImageListItem
            sx={{
            maxWidth: '450px',
            maxHeight: '100px',
            minWidth: '450px',
            minHeight: '100px',
            }}
        >
            <img
                src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c`}
            />
            
        </ImageListItem>
        <div style={{ position: 'absolute', bottom: 0, left: 0, background: 'rgba(0, 0, 0, 0.7)', padding: '10px' }}>
    <h5>{meeting?.meetingName}</h5>
    </div>
    </div>
    <PeopleIcon/>
    <CalendarMonthIcon/>
    <QueryBuilderIcon/>
    <LocationOnIcon/>
    <Box>
    <GetMeetingStaticMap/>
    </Box>

    <Button onClick={onClickUpdate}>수정하기</Button>
    <Button onClick={onClickDelete}>삭제하기</Button>
    <Button onClick={onClickAddMember}>신청하기</Button>
    <ListMeetingReview/>
    </Box>
    );
};

export default GetMeeting;