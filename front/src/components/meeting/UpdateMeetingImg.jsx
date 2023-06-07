import { Avatar, Button, ImageListItem, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';
import React from 'react';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const UpdateMeetingImg = () => {

    const {
        meetingIntro,
        image,
        setField,
        onChangeField,
      } =useUpdateMeetingFormStore();

      const onChangeImg = (event) => {
        const file = event.target.files[0];
        setField("file", file);
        setField("image", URL.createObjectURL(file));
      };

    return (
        <Box sx={{ margin: '10px' }}>
        <h4>모임의 소개를 수정해주세요!</h4>
              <Stack direction="row" spacing={2} alignItems={'center'} marginLeft='5px'>
              <Button
                  variant="outlined"
                  startIcon={<Avatar><AddPhotoAlternateIcon /></Avatar>}
                  color="info"
                  aria-label="upload picture"
                  component="label"
                  sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: '3px', // 테두리 두께 조정
                      width: '95px',
                      height: '95px',
                  }}
                  size="large"
              >
                  <input
                      hidden
                      accept="image/*"
                      type="file"
                      id="file"
                      name="meetingReviewImg"
                      onChange={onChangeImg}
                  />
              </Button>
              <ImageListItem>
                  {image && 
                  <img 
                  src={image}
                  style={{ width: '90px', height: '90px'}} /> }
              </ImageListItem>
              </Stack>
              <br/>
              <TextField
                  id="outlined-multiline-static"
                  name="meetingIntro"
                  placeholder="소개글을 입력해 주세요(선택)
  참가비가 있을 경우 참가비 정보도 함께 적어주세요!"
                  onChange={(e)=>onChangeField('meetingIntro',e)}
                  fullWidth
                  multiline
                  required
                  value={meetingIntro}
                  rows={4}
                  />
  
  
          </Box>
    );
};

export default UpdateMeetingImg;