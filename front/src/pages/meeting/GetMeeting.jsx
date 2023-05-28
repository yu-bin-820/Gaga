import ListMeetingReview from '@components/meeting/ListMeetingReview';
import { BottomNavigation, BottomNavigationAction, Box, Button, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PeopleIcon from '@mui/icons-material/People';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GetMeetingStaticMap from '@components/meeting/map/GetMeetingStaticMap';
import { styled } from '@mui/system';


const CenteredText = styled('h5')({
    display: 'flex',
    alignItems: 'center',
  });

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

    const [value, setValue] = React.useState(0);


    return (
    <Box sx={{ marginTop: '64px', marginBottom: '50px' }}>
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
    
    </div>
    </div>

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <h4>{meeting?.meetingName}</h4>
    <CenteredText>
    <PeopleIcon/><h5>2/{meeting?.meetingMaxMemberNo}</h5>
    </CenteredText>
    <CenteredText>
    <CalendarMonthIcon/> {meeting?.meetingDate}
    </CenteredText>
    <CenteredText>
        <QueryBuilderIcon/> {meeting?.meetingStartTime} ~ {meeting?.meetingEndTime}
    </CenteredText>
    <CenteredText>
        <LocationOnIcon/> {meeting?.meetingAddr}
    </CenteredText>
    <h5>
    &nbsp; &nbsp; &nbsp;{meeting?.meetingDetailAddr}
    </h5>
    <br/>
    <Box>
    <GetMeetingStaticMap/>
    </Box>

    <Button onClick={onClickUpdate}>수정하기</Button>
    <Button onClick={onClickDelete}>삭제하기</Button>
    <ListMeetingReview/>
    <BottomNavigation
        showLabels
        sx={{ width: '100%', position: 'fixed', bottom: '0rem' }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="참여하기" onClick={onClickAddMember}/>
      </BottomNavigation>
    </Box>
    );
};

export default GetMeeting;