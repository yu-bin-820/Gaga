import {
  Avatar,
  Button,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useMeetingFormStore from "@hooks/meeting/useMeetingFormStore";

const AddMeetingImg = () => {
  const { file, image, setField, meetingIntro, onChangeField } =
    useMeetingFormStore();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onChangeImg = (event) => {
    const file = event.target.files[0];
    setField("file", file);
    setField("image", URL.createObjectURL(file));
  };

    return (
        <div>
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
                style={{ maxWidth: '90px', maxHeight: '90px', minWidth: '90px', minHeight: '90px' }} /> }
            </ImageListItem>
            </Stack>
            <br/>
            <TextField
                id="outlined-multiline-static"
                label="meetingIntro"
                name="meetingIntro"
                placeholder="Search by email address, phone number, or user UID"
                onChange={(e)=>onChangeField('meetingIntro',e)}
                fullWidth
                multiline
                value={meetingIntro}
                rows={4}
                />


        </div>
    );
};

export default AddMeetingImg;
