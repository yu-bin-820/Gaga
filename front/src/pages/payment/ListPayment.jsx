import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { Box, Stack } from '@mui/system';
import CommonTop from '@layouts/common/CommonTop';
import PaymentThumnail from '@components/payment/PaymentThumnail';

const ListPayment = () => {
  const { userNo } = useParams();
  const [paymentList, setPaymentList] = useState([]);

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
        .get(`${import.meta.env.VITE_SPRING_HOST}/rest/payment/list/${userNo}`)
        .then((response) => {
          console.log(data);
          console.log(response.data);
          setPaymentList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [myData, userNo]);

  return (
    <>
      <CommonTop />
      <Stack sx={{ margin: '10px' }}>
        <Stack sx={{ marginTop: '64px' }}>
          <Stack>
            {paymentList?.map((payment, i) => (
              <Stack key={i} sx={{ marginBottom: '30px' }}>
                <PaymentThumnail payment={payment} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ListPayment;
