import { useParams, useNavigate } from "react-router";
import fetcher from "@utils/fetcher";
import useSWR from "swr";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import ClubThumbnail from "./ClubThumbnail";

const ListCreateClub = () => {
  const { userNo } = useParams();
  const [clubList, setClubList] = useState();
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/club/list/create/${
          myData?.userNo
        }`
      )
      .then((response) => {
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

  const onClickListClubMember = useCallback((event) => {
    const { id } = event.target;
    const { groupType } = event.target;
    navigate(`/club/member/listmember/clubno/${id}`);
  }, []);

  return (
    <Box>
      <Box>
        {clubList?.map((club, i) => (
          <Box key={i}>
            <ClubThumbnail club={club} />
            <Button id={club.clubNo} onClick={onClickClub}>
              클럽정보
            </Button>
            <Button
              id={club.clubNo}
              groupType={1}
              onClick={onClickListClubMember}
            >
              클럽멤버
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ListCreateClub;
