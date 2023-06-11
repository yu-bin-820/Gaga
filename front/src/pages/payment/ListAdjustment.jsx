import AdjustmentThumnail from '@components/payment/AdjustmentThumnail';
import ListAdminAdjustmnet from '@components/payment/ListAdminAdjustmnet';
import CommonTop from '@layouts/common/CommonTop';
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
        <CommonTop
          pageName='정산 내역 조회'
          prevPath='/community/profile/mine'
        />
        {isAdmin ? (
          <>
            <ListAdminAdjustmnet />
          </>
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
