import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import axios from 'axios';
import React, { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

const DeleteClubDialog = ({ open, setOpen }) => {
  const { clubNo } = useParams();

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const onClickDelete = useCallback(
    (event) => {
      event.preventDefault();

      try {
        const data = {
          clubNo: parseInt(clubNo),
        };

        console.log(data);

        const response = axios.patch(
          `${import.meta.env.VITE_SPRING_HOST}/rest/club/delete`,
          data
        );

        navigate(`/`);
      } catch (error) {
        console.error(error);
      }
    },
    [clubNo]
  );

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>클럽을 삭제하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>
            취소
          </Button>
          <Button variant='contained' onClick={onClickDelete}>
            삭제하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteClubDialog;
