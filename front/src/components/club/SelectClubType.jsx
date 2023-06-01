import { Button } from "@mui/material";
import { Box } from "@mui/system";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const SelectClubType = () => {
  const [clubList, setClubList] = useState();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    axios
      .get(
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/meeting/list/inchat/no/${myData.userNo}`
      )
      .then((response) => {
        console.log(response.data);
        setMeetingList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [myData]);

  return (
    <Box>
      <Box>
        {meetingList?.map((meeting, i) => (
          <Box key={i}>
            <h5>{meeting.meetingName}</h5>
            <h5>{meeting.state}</h5>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SelectClubType;
