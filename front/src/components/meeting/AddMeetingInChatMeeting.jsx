import { Accordion, AccordionDetails, AccordionSummary, Skeleton, ToggleButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import PropTypes from 'prop-types';
import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';


const AddMeetingInChatMeeting = ({ expanded, handleChange, userNo, onParentMeetingNoClick }) => {

    const [meetingList, setMeetingList] = useState();

    useEffect(() => {
        axios
          .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/inchat/no/${userNo}`)
          .then((response) => {
            console.log(response.data);
            setMeetingList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [userNo]);

      const [alignment, setAlignment] = React.useState('left');
  
      const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
      };

      const onClickParentMeeting = (meetingNo) => {
        console.log('부모미팅번호', meetingNo);
        onParentMeetingNoClick(meetingNo); 
      };

      if (!meetingList) {
        return (
          <Skeleton animation="wave" variant="rectangular" width={'100vw'} height={'100vh'} />
    
        );
      }

    return (
        <Accordion 
        expanded={expanded === 'parentMeeting'} 
        onChange={handleChange('parentMeeting')}
        sx={{ backgroundColor: expanded === "parentMeeting" ? "#e1ede7" : "white" }} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
          <Stack>
          <Typography sx={{ width: '100%', flexShrink: 0 }}>기존 모임 기반 새 모임</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              기존에 모임 멤버를 초대하는 모임을 열어요.<br />
              채팅방이 있는 경우만 가능해요!
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <StyledToggleButtonGroup 
                    size="small" 
                    value={alignment} 
                    exclusive 
                    onChange={handleAlignment} 
                    aria-label="text alignment"
                  >
                    {meetingList?.map((meeting, k) => (
                    <ToggleButton
                        key={k} 
                        value={meeting.meetingNo} 
                        aria-label={meeting.meetingNo} 
                        onClick={() => onClickParentMeeting(meeting.meetingNo)}
                    >
                        {meeting.meetingName}
                    </ToggleButton>
                ))}
                  </StyledToggleButtonGroup>
        </AccordionDetails>
      </Accordion>
    );
};

AddMeetingInChatMeeting.propTypes = {
  expanded: PropTypes.string,
  handleChange: PropTypes.func,
  userNo: PropTypes.number,
  onParentMeetingNoClick: PropTypes.func,
};

export default AddMeetingInChatMeeting;