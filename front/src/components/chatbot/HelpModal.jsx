import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#3BB377',

    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    color: '#FFFFFF', // 흰색으로 설정
  };

  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
      );
           
      useEffect(() => {
        if (myData) {
          const { userNo, role } = myData;
          console.log(userNo, role, '유저넘버랑 권한');    
        }
      }, [myData]);

    return (
      <React.Fragment>
        <Button onClick={handleOpen}>GPT 모드는 뭔가요?</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 340 }}>
            <h2 id="child-modal-title">GPT모드?</h2>
            <p id="child-modal-description">
             GPT모드는 챗봇에 생성형 AI의 기능을 <br /> 추가시켜, 더 나은 사용자 경험을 위해 만들어졌습니다.<br />
             평소에 사용하시던 GPT와 동일하므로 다양한 질문을 통해 GAGABOT with GPT를 경험해보세요!
            </p>
            <Button onClick={handleClose}>닫기</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
  
  export default function HelpModal({ open, handleClose }) {
    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
    );

    useEffect(() => {
        if (myData) {
            const { userNo, role } = myData;
            console.log(userNo, role, '유저넘버랑 권한');    
        }
    }, [myData]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="help-modal-title"
            aria-describedby="help-modal-description"
        >
            <Box sx={style}>
                <h3 id="help-modal-title">환영합니다 {myData ? myData.userName : '사용자'}님 </h3>
                <p id="help-modal-description">
                    챗봇을 사용해주셔서 감사합니다! <br />
                     GAGABOT은 간단한 질의응답이 가능합니다.
                    다음처럼 질문해보세요 !</p>
                    <p> 📣 GAGA가 무슨 뜻이야?</p>
                    <p> ❔   클럽이랑 모임의 차이점이 뭐야?</p>
                    <p>🔍 내가 원하는 모임은 어떻게 찾을 수 있지?</p>
                    <p>🤷🏻‍♂️ 나쁜 유저 신고는 어떻게 해?</p>
                <Button onClick={(event) => handleClose(event)}>닫기</Button>
                <ChildModal /> {/* ChildModal 추가 */}
            </Box>
        </Modal>
    );
}