import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import PropTypes from 'prop-types';


const DeleteMeetingDialog = ({ open, setOpen }) => {

    const { meetingno } = useParams();


    const handleClose = () => {
        setOpen(false);
      };

      const navigate = useNavigate();


      const onClickDelete = useCallback(
        (event) => {
            event.preventDefault();

            try {
            const data = {
              meetingNo: parseInt(meetingno)
            };

            console.log(data);

            const response = axios.patch(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/delete`, 
                data);

            navigate(`/`);
                
            } catch (error) {
                console.error(error);
            }
        },
        [meetingno, navigate]
    );

    return (
    <div>
      <Dialog 
      open={open} 
      onClose={handleClose}
      sx={{padding: '20px'}}>
        <Typography 
        variant="h6" 
        sx={{ fontSize: '16px', padding: '20px' }}>
            모임을 삭제하시겠습니까?
          </Typography>
        <DialogActions>
          <Stack
          direction={'row'}
          justifyContent="center"
          alignItems="center"
          spacing={2}>
            <Button 
            variant="contained" 
            sx={{ width: '100px' }} 
            onClick={handleClose}>
              취소
            </Button>
            <Button 
            variant="contained" 
            sx={{ width: '100px' }} 
            onClick={onClickDelete}>
              삭제하기
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
    );
};

DeleteMeetingDialog.propTypes = {
  open: PropTypes.object.isRequired,
  setOpen: PropTypes.object.isRequired,
};


export default DeleteMeetingDialog;