import ListMeetingParentClubNo from "@components/meeting/ListMeetingParentClubNo";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const CenteredText = styled("h5")({
  display: "flex",
  alignItems: "center",
});

const GetClub = () => {
  const { clubNo } = useParams();
  const [club, setClub] = useState();
  const [pendingMemberList, setPendingMemberList] = useState();
  const [confirmedMemberList, setConfirMemberList] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/club/no/${clubNo}`)
      .then((response) => {
        console.log(response.data);
        setClub(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/user/list/grouptype/1/no/${clubNo}/state/2`
      )
      .then((response) => {
        console.log(response.data);
        setConfirMemberList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/user/list/grouptype/1/no/${clubNo}/state/1`
      )
      .then((response) => {
        console.log(response.data);
        setPendingMemberList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickAddMember = useCallback((event) => {
    navigate(`/club/member/addmember/${clubNo}`);
  }, []);

  const onClickUpdate = useCallback((MouseEvent) => {
    navigate(`/club/updateclub/${clubNo}`);
  }, []);
  const onClickDelete = useCallback(async (event) => {
    event.preventDefault();

    try {
      const data = {
        clubNo: club?.clubNo,
      };

      console.log(data);

      const response = await axios.delete(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/club`,
        {
          data: data,
        }
      );

      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Box sx={{ marginTop: "64px" }}>
        <h2>여기는 클럽 상세페이지입니다. </h2>
        <br />
        <h5>클럽이름 {club?.clubName}</h5>
        클럽장 번호 {club?.clubLeaderNo} <br />
        최대인원 {club?.clubMaxMemberNo} <br />
        생성일 {club?.clubRegDate} <br />
        모집상태 {club?.clubState} <br />
        이미지 {club?.clubImg} <br />
        지역 {club?.clubRegion} <br />
        성별 {club?.filterGender} <br />
        최소나이 {club?.filterMinAge} <br />
        최대나이 {club?.filterMaxAge} <br />
        태그 {club?.filterTag} <br />
        메인 카테고리 번호 {club?.mainCategoryNo} <br />
        <h3>클럽 내 생성 모임 목록</h3>
        <ListMeetingParentClubNo />
        <Button onClick={onClickUpdate}>수정하기</Button>
        <Button onClick={onClickDelete}>삭제하기</Button>
        <Button onClick={onClickAddMember}>신청하기</Button>
      </Box>
    </>
  );
};

export default GetClub;
