import ClubThumbnail from "@components/club/ClubThumbnail";
import MeetingThumbnail from "@components/meeting/MeetingThumnail";
import useSearchClubFormStore from "@hooks/club/useSearchClubFormStore";
import useSearchMeetingFormStore from "@hooks/meeting/useSearchMeetingFormStore";
import CommonTop from "@layouts/common/CommonTop";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ListSearchClub = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [clubList, setClubList] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { searchKeyword } = useSearchClubFormStore();

  useEffect(() => {
    fetchData();
  }, [searchKeyword]);

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 해제
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = {
      currentPage: currentPage,
      searchKeyword: searchKeyword,
    };

    console.log(data);

    const response = await axios.post(
      `${import.meta.env.VITE_SPRING_HOST}/rest/club/search`,
      data
    );
    const newData = await response.data;

    console.log(newData);

    setClubList((prevData) => [...(prevData || []), ...newData]);
    setCurrentPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  const onClickClub = useCallback((event) => {
    const { id } = event.target;
    navigate(`/club/no/${id}`);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading
    ) {
      fetchData();
    }
  };

  return (
    <div>
      <CommonTop />
      <Box sx={{ marginTop: "64px" }}>
        <Box>
          {clubList?.map((club, i) => (
            <Box key={i}>
              <ClubThumbnail club={club} />
              <h5>{club.state}</h5>
              <Button id={club.clubNo} onClick={onClickClub}>
                클럽정보
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default ListSearchClub;
