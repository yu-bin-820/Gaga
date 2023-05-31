import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useSWR from "swr";
import ClubThumbnail from "./ClubThumbnail";
import Payment from "@components/payment/Payment";
import Refund from "@components/payment/Refund";
import BankCode from "@components/payment/Banks";
import Banks from "@components/payment/Banks";
import Account from "@components/payment/Account";

const ListClub = () => {
  const [clubList, setClubList] = useState();
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    const data = {
      gender: 0,
      maxAge: 50,
      minAge: 20,
      age: 25,
      mainCategoryNo: 2,
    };
    axios
      .post(`http://${import.meta.env.VITE_SPRING_HOST}/rest/club/list`, data)
      .then((response) => {
        console.log(data);
        console.log(response.data);
        setClubList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [myData]);

  const onClickClub = useCallback(
    (event) => {
      const { id } = event.target;
      navigate(`/club/no/${id}`);
    },
    [navigate]
  );

  return (
    <>
      <Box sx={{ marginTop: "100px" }}>
        <Box>
          <Account />
          <Payment />
          <Refund />
          <Box>
            {clubList?.map((club, i) => (
              <Box key={i}>
                <ClubThumbnail club={club} />
                <h5>{club.clubName}</h5>
                <Button id={club.clubNo} onClick={onClickClub}>
                  <h5>{club.clubNo}</h5>
                  <br />
                  <br />
                  {i + 1}번 클럽정보
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ListClub;
