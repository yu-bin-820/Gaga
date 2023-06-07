import { Button, Dialog, DialogActions, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import React, { useCallback } from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import axios from 'axios';


const DeleteMemberDialog = ({ open, setOpen, meeting }) => {

    const handleClose = () => {
        setOpen(false);
    };

    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    const onClickDeleteMember = useCallback(async (event) => {
        event.preventDefault();

        try {
        const data = {
            meetingNo: meeting.meetingNo,
            userNo: myData.userNo,
        };

        console.log(data);

        const response = await axios
            .delete(
            `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
            {
                data: data,
            }
            )
            .then(() => {
            });
        } catch (error) {
        console.error(error);
        }
    }, []);

    return (
        <Dialog
        open={open} 
        onClose={handleClose}
        sx={{padding: '20px'}}>
            <Typography
            variant="h6" 
            sx={{ fontSize: '16px', padding: '20px' }}>
                모임 참여를 취소하시겠습니까?
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
                    아니오
                </Button>
                <Button 
                    variant="contained" 
                    sx={{ width: '100px' }} 
                    onClick={(meeting.entryFee===0) ? onClickDeleteMember : ()=>{}}>
                    예
                </Button>
            </Stack>
            </DialogActions>
        </Dialog>
    );
};

DeleteMemberDialog.propTypes = {
    meeting: PropTypes.object.isRequired,
    open: PropTypes.object.isRequired,
    setOpen: PropTypes.object.isRequired,

};

export default DeleteMemberDialog;