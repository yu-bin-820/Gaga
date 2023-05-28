import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useSWR from "swr";

const ListMainClub = () => {
  const [clubList, setClubList] = useState();
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    const data = {
      mainCategoryNo: 2,
    };
    axios
      .get(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/club/list/nonuser/${
          data.mainCategoryNo
        }`,
        data
      )
      .then((response) => {
        console.log(data);
        console.log(response.data);
        setClubList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickClub = useCallback((event) => {
    const { id } = event.target;
    navigate(`/club/no/${id}`);
  }, []);

  return (
    <>
      <Box sx={{ marginTop: "100px" }}>
        <Box>
          {clubList?.map((club, i) => (
            <Box key={i}>
              <h5>{club.clubName}</h5>
              <Button id={club.clubNo} onClick={onClickClub}>
                {i + 1}번 클럽정보
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ListMainClub;
