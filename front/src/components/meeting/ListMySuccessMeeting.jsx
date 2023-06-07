import fetcher from '@utils/fetcher';
import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router';
import axios from 'axios';
import MeetingThumbnail from './MeetingThumnail';
import { Box, Stack } from '@mui/system';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';


const ListMySuccessMeeting = ({ meeting }) => {
    const { state, entryFee, meetingSuccuess, meetingState, meetingNo } = meeting;
    const [meetingReviewList, setMeetingReviewList] = useState();

    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
      );

    useEffect(()=>{
        axios
            .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review/${meetingNo}`)
            .then((response)=>{
                console.log(response.data);
                setMeetingReviewList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[meetingNo]);

        const isMeetingReview = !!(
            meetingReviewList &&
            meetingReviewList.length &&
            meetingReviewList.some((meetingReview) => meetingReview.meetingReviewerNo === myData?.userNo)
          );

    const navigate = useNavigate();

    const onClickAddMeetingReview=useCallback((event)=>{
        navigate(`/meeting/review/addreview/meetingno/${meetingNo}`);
    },[]);

    const onClickUpdateMeetingReview = useCallback((event) => {
      const matchingMeetingReview = meetingReviewList.find(
        (meetingReview) => meetingReview.meetingReviewerNo === myData?.userNo
      );
      if (matchingMeetingReview) {
        navigate(`/meeting/review/updatereview/reviewno/${matchingMeetingReview.meetingReviewNo}`);
      }
    }, [meetingReviewList, myData?.userNo, navigate]);

    const onClickChatRoom=useCallback((event)=>{
        navigate(`/meeting/member/listmember/meetingno/${meetingNo}`);
    },[]);

    console.log(isMeetingReview)

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
                    {!isMeetingReview &&(
                        <Button 
                        variant="outlined"
                        sx={{ width: '180px' }}
                        onClick={onClickAddMeetingReview}>후기작성</Button>)}
                    {isMeetingReview &&(
                        <Button 
                        variant="outlined"
                        sx={{ width: '180px' }}
                        onClick={onClickUpdateMeetingReview}>후기수정</Button>)}
                    <Button
                                        variant="outlined"
                                        sx={{ width: '180px' }}
                    onClick={onClickChatRoom}>채팅방 입장</Button>
                    </Stack>
                    </Stack>
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