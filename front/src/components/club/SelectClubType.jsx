import { Button, List } from "@mui/material";
import { Box } from "@mui/system";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ListMyClub from "@components/club/ListMyClub";
import ListMyMeeting from "@components/meeting/ListMyMeeting";

const SelectClubType = () => {
  const [clubList, setClubList] = useState();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  return (
    <Box>
      <Box>
        <h3>모임 기반 클럽</h3>
        <ListMyMeeting />
        <h3>기존 클럽 기반 새 클럽</h3>
        <ListMyClub />
      </Box>
    </Box>
  );
};

export default SelectClubType;
