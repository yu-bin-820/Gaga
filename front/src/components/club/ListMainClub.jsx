import { Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useSWR from "swr";
import ClubThumbnail from "./ClubThumbnail";
import {
  SportsSoccer,
  Palette,
  Fastfood,
  SportsEsports,
  Flight,
  School,
} from "@mui/icons-material";
import fetcher from "@utils/fetcher";

const ListMainClub = () => {
  const [clubList, setClubList] = useState([]);
  const navigate = useNavigate();

  const [mainCategoryNo, setMainCategoryNo] = useState(1);

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    axios
      .get(
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/club/list/nonuser/${mainCategoryNo}`
      )
      .then((response) => {
        console.log(response.data);
        setClubList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mainCategoryNo]);

  const onClickClub = useCallback((event) => {
    const { id } = event.target;
    navigate(`/club/no/${id}`);
  }, []);

  const handleClick = (number) => {
    setMainCategoryNo(number);
  };

  const renderButton = (number) => {
    let icon, label;
    switch (number) {
      case 1:
        icon = <SportsSoccer style={{ width: "30px", height: "30px" }} />;
        label = "운동, 액티비티";
        break;
      case 2:
        icon = <Palette style={{ width: "30px", height: "30px" }} />;
        label = "문화, 예술";
        break;
      case 3:
        icon = <Fastfood style={{ width: "30px", height: "30px" }} />;
        label = "푸드, 디저트";
        break;
      case 4:
        icon = <SportsEsports style={{ width: "30px", height: "30px" }} />;
        label = "취미";
        break;
      case 5:
        icon = <Flight style={{ width: "30px", height: "30px" }} />;
        label = "여행, 동행";
        break;
      case 6:
        icon = <School style={{ width: "30px", height: "30px" }} />;
        label = "자기개발";
        break;
      default:
        icon = null;
        label = null;
        break;
    }

    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {icon}
        {label}
      </Box>
    );
  };

  return (
    <>
      <Box sx={{ marginTop: "100px" }}>
        <Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {[1, 2, 3].map((number) => (
              <Button
                key={number}
                onClick={() => handleClick(number)}
                startIcon={renderButton(number)}
              ></Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {[4, 5, 6].map((number) => (
              <Button
                key={number}
                onClick={() => handleClick(number)}
                startIcon={renderButton(number)}
              ></Button>
            ))}
          </Box>
          {clubList?.map((club, i) => (
            <Box key={i}>
              <h3>
                {i + 1}. {club.clubNo}번 클럽정보입니다.
              </h3>
              <ClubThumbnail club={club} />
              <Button id={club.clubNo} onClick={onClickClub}>
                클럽정보
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ListMainClub;
