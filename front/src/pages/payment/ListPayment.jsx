import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import { Box, Stack } from '@mui/system';
import CommonTop from '@layouts/common/CommonTop';
import PaymentThumnail from '@components/payment/PaymentThumnail';
import { Button } from '@mui/material';
import NoPayment from '@components/payment/NoPayment';

const ListPayment = () => {
  const { userNo } = useParams();
  const [paymentList, setPaymentList] = useState([]);

  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const isAdmin = myData?.role === 1;

  useEffect(() => {
    if (myData) {
      const apiUrl = isAdmin
        ? `${import.meta.env.VITE_SPRING_HOST}/rest/payment`
        : `${import.meta.env.VITE_SPRING_HOST}/rest/payment/list/${userNo}`;

      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data);
          setPaymentList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAdmin, myData, userNo]);

  const onClickProfile = useCallback(
    (e) => {
      navigate(`/community/profile/userno/${e.currentTarget.dataset.value}`);
    },
    [navigate]
  );

  return (
    <div style={{ backgroundColor: '#ededed' }}>
      <CommonTop pageName='결제 내역 조회' prevPath='/community/profile/mine' />
      <Stack sx={{ marginLeft: '10px', marginRight: '10px' }}>
        <Stack sx={{ marginTop: '45px' }}>
          <h5>
            결제 내역 조회 페이지입니다. <br /> 환불은 상세 정보 페이지에서
            진행됩니다.
            <br />
            문의사항은 Q&A 게시판을 이용해 주세요.
          </h5>
          <Stack>
            {paymentList?.filter(
              (payment) => payment.payState === 1 || payment.payState === 2
            ).length === 0 && <NoPayment ment={'결제 내역이 없습니다.'} />}
            {paymentList?.map((payment, i) => (
              <Stack key={i} sx={{ marginBottom: '10px' }}>
                {isAdmin ? (
                  <Box
                    sx={{
                      borderRadius: 2,
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <PaymentThumnail payment={payment} />
                    <Stack
                      direction='row'
                      justifyContent='center'
                      spacing={1.5}
                      marginBottom={1}
                    >
                      <Button
                        data-value={payment.userNo}
                        variant='outlined'
                        sx={{ width: '180px' }}
                        onClick={onClickProfile}
                      >
                        회원정보
                      </Button>
                    </Stack>
                  </Box>
                ) : (
                  <PaymentThumnail payment={payment} />
                )}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default ListPayment;
