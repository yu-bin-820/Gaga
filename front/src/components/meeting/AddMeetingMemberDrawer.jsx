import { Button, Divider, Drawer, IconButton, Modal, Skeleton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import AddMeetingMemberThumnail from './AddMeetingMemberThumnail';
import fetcher from '@utils/fetcher';
import PropTypes from 'prop-types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import useSWR from 'swr';
import Payment from '@pages/payment/Payment';

const AddMeetingMemberDrawer = ({settingsAddMemberOpen, setSettingsAddMemberOpen, toggleSettingsAddMember, meetingNo}) => {
    const [meeting, setMeeting] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: myData } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    const {mutate: mutatePendingMemberList } = useSWR(
            `${import.meta.env.VITE_SPRING_HOST}/rest/user/list/grouptype/2/no/${meetingNo}/state/1`,
            fetcher
        );
        
        const {mutate : mutateMyMeetingList } = useSWR(
            `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/mymeeting/${myData?.userNo}`,
            fetcher
        );
  
    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingNo}`)
        .then((response) => {
            console.log(response.data);
            setMeeting(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [meetingNo]);

    const onClickAddMember = useCallback(
        async (event) => {
            event.preventDefault();
    
            try {
                const data = {
                meetingNo: meeting?.meetingNo,
                userNo: myData.userNo,
                };
    
                console.log(data);
        
                await axios.post(
                    `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
                    data
                ).then(()=>{
                    setIsModalOpen(true)
                    mutatePendingMemberList()
                    mutateMyMeetingList()
                    
                }
                );
    
            } catch (error) {
                console.error(error);
            }
        },
        [meeting, myData.userNo, mutateMyMeetingList, mutatePendingMemberList ]
    );
  
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSettingsAddMemberOpen(false);
    }, [setSettingsAddMemberOpen]);

    if (!meeting) {
        return (
            <Skeleton animation="wave" variant="rectangular" width={'100vw'} height={'100vh'} />
        );
    }
    
    return (
        <Drawer
            anchor="right"
            open={settingsAddMemberOpen}
            onClose={toggleSettingsAddMember(false)}
            onOpen={toggleSettingsAddMember(true)}
            >
            <Stack
                direction={'row'}
                alignItems={'center'}
                sx={{ height: '55px', minWidth: '100vw' }}
            >
                <IconButton
                onClick={() => {
                    setSettingsAddMemberOpen(false);}}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Stack>
            <Divider />
            <Box sx={{ bgcolor: '#ededed' }}>
            <Stack spacing={1}>
            <AddMeetingMemberThumnail meeting={meeting} />
            <Box sx={{ bgcolor: 'white' }}>
                <Stack
                direction={'row'}
                justifyContent="space-between"
                alignItems="center"
                sx={{ marginLeft: '10px', marginRight: '10px' }}
                >
                <h4>결제금액</h4>
                <h4 style={{ textAlign: 'right' }}>
                    {meeting.entryFee.toLocaleString()}원
                </h4>
                </Stack>
            </Box>
            <Box sx={{ bgcolor: 'white' }}>
                <Typography sx={{ fontSize: 13, margin: '5px', padding: '10px' }}>
                결제 후 30분 경과 전 : 전액 환불
                <br />
                승인 대기 중 신청 취소 : 전액 환불
                <br />
                참여 거절되거나 승인 후 내보내진 경우 : 전액 환불
                <br />
                참여 확정 모임의 진행일 하루 전 : 환불 불가
                <br />
                모임 진행 당일 신청의 경우 : 환불 불가
                </Typography>
            </Box>
                <Box sx={{ bgcolor: 'white' }}></Box>
                </Stack>
            <Stack
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'fixed', bottom: 5, left: 0, right: 0 }}
            >
            {meeting.entryFee === 0 ? (
                <Button
                variant="contained"
                sx={{ width: '85vw', borderRadius: '50px' }}
                onClick={onClickAddMember}
                >
                신청하기
                </Button>
            ) : (
                <Payment meeting={meeting} />
            )}
            </Stack>
        </Box>
        <Modal open={isModalOpen} onClose={handleCloseModal}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description">
            <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}
            >
            <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                참여가 완료되었습니다.
            </Typography>
            <Button variant="contained" onClick={handleCloseModal}>
                확인
            </Button>
            </Box>
        </Modal>
        </Drawer>
    );
};

AddMeetingMemberDrawer.propTypes = {
    settingsAddMemberOpen: PropTypes.bool,
    setSettingsAddMemberOpen: PropTypes.func,
    toggleSettingsAddMember: PropTypes.func,
    meetingNo: PropTypes.object,
    };

export default AddMeetingMemberDrawer;