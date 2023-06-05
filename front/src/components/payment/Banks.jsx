import React, { useCallback, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";

const Banks = () => {
  const [bankList, setBankList] = useState([]);

  const onClickBanks = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/payment/banks`
      );

      console.log(response.data);
      setBankList(response.data.response);
      alert("은행 정보를 불러왔습니다.");
    } catch (error) {
      console.error(error);
      alert("은행 정보를 불러오는중 오류가 발생하였습니다.");
    }
  }, []);

  return (
    <>
      <Box>
        <Box>
          <button onClick={onClickBanks}>은행정보 불러오기</button>
        </Box>
        {bankList?.map((bank, i) => (
          <Box key={i}>
            {bank.code}
            <br />
            {bank.name}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Banks;
