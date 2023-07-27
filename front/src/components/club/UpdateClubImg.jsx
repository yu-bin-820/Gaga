import { Avatar, Button, ImageListItem, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CancelIcon from '@mui/icons-material/Cancel';
import useUpdateClubFormStore from '@stores/club/useUpdateClubFormStore';

const UpdateClubImg = () => {
  const { clubIntro, image, file, clubImg, setField, onChangeField } =
    useUpdateClubFormStore();

  const onChangeImg = (event) => {
    const file = event.target.files[0];
    setField('clubImg', '');
    setField('file', file);
    setField('image', URL.createObjectURL(file));
  };

  const clearImage = () => {
    setField('file', null);
    setField('image', null);
    setField('clubImg', '');
  };

  return (
    <Box sx={{ margin: '10px' }}>
      <h4>클럽의 소개를 수정해주세요!</h4>
      <Stack direction='row' spacing={2} alignItems='center' marginLeft='5px'>
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
        {image && (
          <Box
            sx={{
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <CancelIcon
              fontSize='small'
              onClick={() => clearImage()}
              sx={{
                alignSelf: 'flex-end',
                marginTop: '-8px',
                marginRight: '-8px',
                cursor: 'pointer',
              }}
            />
            <img src={image} style={{ width: '90px', height: '90px' }} />
          </Box>
        )}
      </Stack>
      <br />
      <TextField
        id='outlined-multiline-static'
        name='clubIntro'
        placeholder='소개글을 입력해 주세요'
        onChange={(e) => onChangeField('clubIntro', e)}
        fullWidth
        multiline
        required
        value={clubIntro}
        rows={4}
      />
    </Box>
  );
};

export default UpdateClubImg;
