import AdjustmentThumnail from '@components/payment/AdjustmentThumnail';
import CommonTop from '@layouts/common/CommonTop';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';

const ListAdjustment = () => {
  const { userNo } = useParams();
  const [meeting, setMeeting] = useState('');
  const [adjustmentList, setAdjustmentList] = useState([]);
  const [adjustmentAllList, setAdjustmentAllList] = useState([]);

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const isAdmin = myData?.role === 1;

  const onClickUpdate = (meeting) => {
    axios.patch(`${import.meta.env.VITE_SPRING_HOST}/rest/payment/adjustment`, {
      meetingNo: meeting.meetingNo,
    });
    console.log(meeting);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/payment/adjustment`)
      .then((allResponse) => {
        console.log(allResponse.data);
        setAdjustmentAllList(allResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (myData) {
      const data = {
        userNo: myData.userNo,
      };

      axios
        .get(
          `${
            import.meta.env.VITE_SPRING_HOST
          }/rest/payment/adjustment/${userNo}`
        )
        .then((response) => {
          console.log(data);
          console.log(response.data);
          setAdjustmentList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [myData, userNo]);

  return (
    <div style={{ backgroundColor: '#ededed' }}>
      <Stack sx={{ marginTop: '64px' }}>
        <CommonTop />
        {isAdmin ? (
          <div>
            관리자 페이지입니다.
            <Stack>
              {adjustmentAllList?.map((meeting, i) => (
                <Stack key={i}>
                  <h3>유저정보{meeting.meetingLeaderNo}</h3>
                  <AdjustmentThumnail meeting={meeting} />
                  <Stack
                    direction={'row'}
                    justifyContent='center'
                    spacing={1.5}
                  >
                    <Button
                      variant='outlined'
                      sx={{ width: '180px' }}
                      onClick={() => onClickUpdate(meeting.meetingNo)}
                    >
                      정산하기
                    </Button>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </div>
        ) : (
          <Stack>
            {adjustmentList?.map((meeting, i) => (
              <Stack key={i}>
                <AdjustmentThumnail meeting={meeting} />
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </div>
  );
};

export default ListAdjustment;
