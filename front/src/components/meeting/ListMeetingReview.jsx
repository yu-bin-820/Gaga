import { Button, Rating, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import UpdateMeetingReviewDrawer from './UpdateMeetingReviewDrawer';


const ListMeetingReview = () => {
    const { meetingno } = useParams();
    const navigate = useNavigate();
    const [settingsUpdateReviewOpen, setSettingsUpdateReviewOpen] = useState(false);
    const [ reviewNo, setReviewNo] = useState(0);


    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    const {data : meetingReviewList, mutate: mutateMeetingReviewList } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review/${meetingno}`,
        fetcher
    );

    const onClickUpdateMeetingReview = useCallback((e) => {
        // navigate('/settings');
        const { id } = e.target;
        console.log(id);
        setReviewNo(id);
        setSettingsUpdateReviewOpen(true);
      }, []);
      const toggleSettingsUpdateReview = useCallback(
        (state) => () => {
            setSettingsUpdateReviewOpen(state);
        },
        []
      );

        const onClickDelete = useCallback(
            
            async (event) => {
                event.preventDefault();
        
                try {
                    const data = {
                        meetingReviewNo: event.target.id
                    };
        
                    console.log(data);
        
                    const response = await axios.delete(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review`, {
                        data: data,
                    });
                    mutateMeetingReviewList()
                    
                } catch (error) {
                    console.error(error);
                }
            },
            [mutateMeetingReviewList]
        );
        console.log(meetingReviewList)

    return (
        <Box>
            <Box>
                {meetingReviewList?.map((meetingReview,i)=>(
                    <Box key={i}>
                        <Stack 
                        direction="row" 
                        spacing={2}
                        alignItems="center">
                            <img
                                src={`${
                                import.meta.env.VITE_CDN_HOST
                                }/upload_images/meeting/${meetingReview?.meetingReviewImg}?type=f_sh&w=100&h=100&faceopt=true&sharp_amt=1.0`}
                                style={{ width: '100px', height: '100px' }}
                            />
                        <Stack>
                        <Stack 
                        spacing={1}
                        direction={'row'}>
                            <Typography variant="subtitle2">{meetingReview.meetingReviewrNickName}</Typography>

                            <Rating 
                            name="read-only" 
                            value={meetingReview.meetingScore} 
                            size='small'
                            readOnly />
                            
                            <Typography variant="subtitle2">{meetingReview.meetingScore}</Typography>
                            </Stack>
                            <Typography variant="caption" display="block" gutterBottom>
                                {meetingReview?.meetingReviewContent?.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                                </Typography>
                            </Stack>
                            </Stack>
                    {myData.userNo === meetingReview.meetingReviewerNo && (
                    <Stack
                    direction={'row'}
                    justifyContent={'flex-end'}
                    spacing={3}>
                    <Button 
                    id={meetingReview.meetingReviewNo}
                    onClick={onClickUpdateMeetingReview}>수정하기</Button>
                    <Button 
                    id={meetingReview.meetingReviewNo}
                    onClick={onClickDelete}>삭제하기</Button>
                    </Stack>
                    )}
                    </Box>
                ))}

                <UpdateMeetingReviewDrawer
                settingsUpdateReviewOpen={settingsUpdateReviewOpen}
                setSettingsUpdateReviewOpen={setSettingsUpdateReviewOpen}
                toggleSettingsUpdateReview={toggleSettingsUpdateReview} 
                reviewno={reviewNo}
                />
            </Box>
        </Box>
    );
};

export default ListMeetingReview;