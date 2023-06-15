import {
  Avatar,
  Button,
  ImageListItem,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import useClubFormStore from '@hooks/club/useClubFormStore';
import PropTypes from 'prop-types';

const AddClubImg = ({ setNextButtonDisable }) => {
  const { file, image, setField, clubIntro, onChangeField } =
    useClubFormStore();

  useEffect(() => {
    if (clubIntro) {
      setNextButtonDisable(false);
    } else {
      setNextButtonDisable(true);
    }
  }, [setNextButtonDisable, clubIntro]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onChangeImg = (event) => {
    const file = event.target.files[0];
    setField('file', file);
    setField('image', URL.createObjectURL(file));
  };

  return (
    <Box sx={{ margin: '10px' }}>
      <h4>클럽을 소개해 주세요!</h4>
      <Stack direction='row' spacing={2} alignItems={'center'} marginLeft='5px'>
        <Button
          variant='outlined'
          startIcon={
            <Avatar>
              <AddPhotoAlternateIcon />
            </Avatar>
          }
          color='info'
          aria-label='upload picture'
          component='label'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: '3px', // 테두리 두께 조정
            width: '95px',
            height: '95px',
          }}
          size='large'
        >
          <input
            hidden
            accept='image/*'
            type='file'
            id='file'
            name='clubImg'
            onChange={onChangeImg}
          />
        </Button>
        <ImageListItem>
          {image && (
            <img src={image} style={{ width: '90px', height: '90px' }} />
          )}
        </ImageListItem>
      </Stack>
      <br />
      <TextField
        id='outlined-multiline-static'
        name='clubIntro'
        placeholder='소개글을 입력해 주세요'
        onChange={(e) => onChangeField('clubIntro', e)}
        fullWidth
        multiline
        value={clubIntro}
        rows={4}
      />
    </Box>
  );
};

AddClubImg.propTypes = {
  setNextButtonDisable: PropTypes.bool,
};

export default AddClubImg;
