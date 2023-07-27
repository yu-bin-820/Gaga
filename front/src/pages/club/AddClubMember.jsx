import AddClubMemberThumnail from "@components/club/AddClubMemberThumnail";
import CommonTop from "@layouts/common/CommonTop";
import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useSWR from "swr";

const AddClubMember = () => {
  const { clubNo } = useParams();
  const [club, setClub] = useState();
  const navigate = useNavigate();
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/club/no/${clubNo}`)
      .then((response) => {
        console.log(response.data);
        setClub(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clubNo]);

  const onClickAddMember = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const data = {
          clubNo: club?.clubNo,
          userNo: myData.userNo,
        };

        console.log(data);

        const response = await axios.post(
          `${import.meta.env.VITE_SPRING_HOST}/rest/club/member`,
          data
        );

        navigate(`/`);
      } catch (error) {
        console.error(error);
      }
    },
    [club, navigate]
  );

  console.log(myData);
  console.log(club);
  if (!club) {
    return <>로딩중</>;
  }
  return (
    <>
      <CommonTop />
      <Box sx={{ marginTop: "64px", bgcolor: "#ededed" }}>
        <Stack spacing={1}>
          <AddClubMemberThumnail club={club} />
          <Box sx={{ bgcolor: "white" }}>
            <Button onClick={onClickAddMember}>신청하기</Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default AddClubMember;
