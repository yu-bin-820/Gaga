import AdjustmentThumnail from '@components/payment/AdjustmentThumnail';
import CommonTop from '@layouts/common/CommonTop';
import { Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';

const ListAdjustment = () => {
  const { userNo } = useParams();
  const [adjustmentList, setAdjustmentList] = useState([]);

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

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
    <>
      <CommonTop />
      <Stack sx={{ marginTop: '100px' }}>
        <Stack>
          {adjustmentList?.map((meeting, i) => (
            <Stack key={i} sx={{ marginBottom: '30px' }}>
              <AdjustmentThumnail meeting={meeting} />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default ListAdjustment;
