import { Button, ImageList, ImageListItem, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import StarIcon from '@mui/icons-material/Star';
import CustomedImageListItem from '@components/common/CustomedImageListItem';


const ListMeetingReview = () => {
    const { meetingno } = useParams();
    const [meetingReviewList, setMeetingReviewList] = useState();
    const navigate = useNavigate();

    const [imageLoadingError, setImageLoadingError] = useState(false);

    const handleImageError = useCallback(() => {
      setImageLoadingError(true);
    }, []);


    useEffect(()=>{
        axios
            .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review/${meetingno}`)
            .then((response)=>{
                console.log(response.data);
                setMeetingReviewList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[meetingno]);

        const onClickUpdateMeetingReview = React.useCallback((MouseEvent)=>{
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
        
                    const response = await axios.delete(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review`, {
                        data: data,
                    });
                    navigate(`/meeting/meetingno/${meetingno}`)
                    
                } catch (error) {
                    console.error(error);
                }
            },
            []
        );

    return (
        <Box>
            <Box>
                {meetingReviewList?.map((meetingReview,i)=>(
                    <Box key={i}>
                        <ImageList
                            sx={{ width: 100, height: 100, overflow: 'hidden' }}
                            cols={1}
                            rowHeight={100}
                            >
                            <ImageListItem>
                            <CustomedImageListItem
                                src={`http://${
                                import.meta.env.VITE_SPRING_HOST
                                }/upload_images/meeting/${meetingReview?.meetingReviewImg}`}
                            />
                            </ImageListItem>
                        </ImageList>
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                            <Rating name="read-only" value={meetingReview.meetingScore} readOnly />
                            <Box sx={{ ml: 2 }}>{meetingReview.meetingScore}</Box>
                        </Box>
                    <Button 
                    id={meetingReview.meetingReviewNo}
                    onClick={onClickUpdateMeetingReview}>수정하기</Button>
                    <Button 
                    id={meetingReview.meetingReviewNo}
                    onClick={onClickDelete}>삭제하기</Button>
                    </Box>
                    
                ))}
            </Box>
        </Box>
    );
};

export default ListMeetingReview;