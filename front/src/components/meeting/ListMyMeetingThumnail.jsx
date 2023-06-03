import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import MeetingThumbnail from './MeetingThumnail';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const ListMyMeetingThumnail = ({ meeting }) => {

    const { state, meetingSuccuess, meetingState, meetingNo } = meeting;


    const navigate = useNavigate();

    const onClickListMeetingMember=useCallback((event)=>{
        const { id } = event.target;
        navigate(`/meeting/member/listmember/meetingno/${meetingNo}`);
    },[]);

    const onClickMeetingSuccess = React.useCallback((MouseEvent)=>{
        const { id } = event.target;
        navigate(`/meeting/updatemeetingsuccess/meetingno/${meetingNo}`);
        },[]);

        const onClickAddMeetingReview=useCallback((event)=>{
            const { id } = event.target;
            navigate(`/meeting/review/addreview/meetingno/${meetingNo}`);
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
                    onClick={onClickListMeetingMember}>멤버리스트</Button>
                    <Button 
                    onClick={onClickMeetingSuccess}>성사하기</Button>
                    <Button 
                    onClick={onClickAddMeetingReview}>후기작성</Button>
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

export default ListMyMeetingThumnail;