import { Button, Dialog, DialogActions, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';

const UnMatchedFilterMeeting = ({ open, setOpen}) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
        open={open} 
        onClose={handleClose}
        sx={{padding: '20px'}}>
            <Typography
            variant="h6" 
            sx={{ fontSize: '16px', padding: '20px' }}>
                참여할 수 없는 모임입니다.
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
                    확인
                </Button>
            </Stack>
            </DialogActions>
        </Dialog>
    );
};

UnMatchedFilterMeeting.propTypes = {
    open: PropTypes.object.isRequired,
    setOpen: PropTypes.object.isRequired,
  };

export default UnMatchedFilterMeeting;