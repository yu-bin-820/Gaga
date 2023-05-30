import { Button, ImageList, ImageListItem, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import StarIcon from '@mui/icons-material/Star';


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
                            sx={{ width: 350, height: 100, overflow: 'hidden' }}
                            cols={3}
                            rowHeight={100}
                            >
                            <ImageListItem>
                                {!imageLoadingError ? (
                                <img
                                    src={`http://${
                                    import.meta.env.VITE_SPRING_HOST
                                    }/upload_images/meeting/${meetingReview?.meetingReviewImg}`}
                                    alt="noImg"
                                    loading="lazy"
                                    onError={handleImageError}
                                />
                                ) : (
                                <Box
                                    sx={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'grey',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    }}
                                >
                            <Typography
                            sx={{
                                fontSize: '1.2rem',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                            >
                            No Img
                            </Typography>
                    </Box>
                )}
                </ImageListItem>
            </ImageList>
            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                <Rating
                    name="meetingScore"
                    value={meetingReview.meetingScore}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
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