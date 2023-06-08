import { Button, Rating, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';



const ListMeetingReview = () => {
    const { meetingno } = useParams();
    const navigate = useNavigate();

    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    const [imageLoadingError, setImageLoadingError] = useState(false);

    const handleImageError = useCallback(() => {
      setImageLoadingError(true);
    }, []);


    const {data : meetingReviewList, mutate: mutateMeetingReviewList } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review/${meetingno}`,
        fetcher
    );

        const onClickUpdateMeetingReview = React.useCallback(()=>{
            const { id } = event.target;
            navigate(`/meeting/review/updatereview/reviewno/${id}`);
            },[]);

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
                    navigate(`/meeting/meetingno/${meetingno}`)
                    
                } catch (error) {
                    console.error(error);
                }
            },
            []
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
                                import.meta.env.VITE_SPRING_HOST
                                }/upload_images/meeting/${meetingReview?.meetingReviewImg}`}
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
            </Box>
        </Box>
    );
};

export default ListMeetingReview;