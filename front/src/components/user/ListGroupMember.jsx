import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useSWR from "swr";

const ListGroupMember = () => {
  const [groupMemberList, setGroupMemberList] = useState();
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    const data = {
      groupType: 1,
      groupNo: 5,
      state: 1,
    };
    axios
      .get(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/list/grouptype/${
          data.groupType
        }/no/${data.groupNo}/state/${data.state}`,
        data
      )
      .then((response) => {
        console.log(data);
        console.log(response.data);
        setGroupMemberList(response.data);
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
          {groupMemberList?.map((group, i) => (
            <Box key={i}>
              <h5>{group.clubName}</h5>
              <Button id={group.clubNo} onClick={onClickClub}>
                <h5>{group.clubNo}</h5>
                <br />
                <br />
                {i + 1}번 멤버 정보 {group.userNo}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ListGroupMember;
