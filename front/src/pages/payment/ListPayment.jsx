import fetcher from "@utils/fetcher";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import { Box } from "@mui/system";
import CommonTop from "@layouts/common/CommonTop";

const ListPayment = () => {
  const { userNo } = useParams();
  const [paymentList, setPaymentList] = useState([]);

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    if (myData) {
      const data = {
        userNo: myData.userNo,
      };

      axios
        .get(
          `http://${
            import.meta.env.VITE_SPRING_HOST
          }/rest/payment/list/${userNo}`
        )
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
      <Box sx={{ marginTop: "100px" }}>
        <Box>
          {paymentList.map((payment, i) => (
            <Box key={i}>
              <h3>{i + 1}번 결제정보</h3>
              결제 번호 : {payment.payNo}
              <br />
              결제 시간 : {payment.payTime}
              <br />
              환불 시간 : {payment.refundTime}
              <br />
              결제 상태 : {payment.payState}
              <br />
              결제 금액 : {payment.entryFee}
              <br />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ListPayment;
