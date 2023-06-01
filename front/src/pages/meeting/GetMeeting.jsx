import ListMeetingReview from "@components/meeting/ListMeetingReview";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  ImageListItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PeopleIcon from "@mui/icons-material/People";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GetMeetingStaticMap from "@components/meeting/map/GetMeetingStaticMap";
import { Stack, styled } from "@mui/system";
import MeetingMember from "@components/meeting/MeetingMember";
import GetMeetingTop from "@layouts/meeting/GetMeetingTop";

const CenteredText = styled("h5")({
  display: "flex",
  alignItems: "center",
});

const GetMeeting = () => {
  const { meetingno } = useParams();
  const [meeting, setMeeting] = useState();
  const [pendingMemberList, setPendingMemberList] = useState();
  const [confirmedMemberList, setConfirMemberList] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/meeting/no/${meetingno}`
      )
      .then((response) => {
        console.log(response.data);
        setMeeting(response.data);
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
        }/rest/user/list/grouptype/2/no/${meetingno}/state/2`
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
        }/rest/user/list/grouptype/2/no/${meetingno}/state/1`
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
    navigate(`/meeting/member/addmember/${meetingno}`);
  }, []);

  const [value, setValue] = React.useState(0);

  const [imageLoadingError, setImageLoadingError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageLoadingError(true);
  }, []);

  return (
    <>
      <GetMeetingTop />
      <Box sx={{ marginTop: "50px", marginBottom: "64px" }}>
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <ImageListItem
            sx={{
              maxWidth: "100%",
              maxHeight: "100px",
              minWidth: "100%",
              minHeight: "100px",
            }}
          >
            {!imageLoadingError ? (
              <img
                src={`http://${
                  import.meta.env.VITE_SPRING_HOST
                }/upload_images/meeting/${meeting?.meetingImg}`}
                alt="noImg"
                loading="lazy"
                onError={handleImageError}
              />
            ) : (
              <img
                src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c`}
              />
            )}
          </ImageListItem>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            background: "rgba(0, 0, 0, 0.7)",
            padding: "10px",
          }}
        ></div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h4>{meeting?.meetingName}</h4>

        <Stack spacing={1}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <PeopleIcon />
            <Typography sx={{ fontSize: 13 }}>
              {meeting?.memberCount}/{meeting?.meetingMaxMemberNo}
            </Typography>
          </Stack>

          <CenteredText>
            <CalendarMonthIcon /> {meeting?.meetingDate}
          </CenteredText>

          <CenteredText>
            <QueryBuilderIcon /> {meeting?.meetingStartTime} ~{" "}
            {meeting?.meetingEndTime}
          </CenteredText>
          <CenteredText>
            <LocationOnIcon /> {meeting?.meetingAddr}
          </CenteredText>
          <h5>&nbsp; &nbsp; &nbsp;{meeting?.meetingDetailAddr}</h5>
        </Stack>
        <br />
        {meeting && (
          <Box>
            <GetMeetingStaticMap meeting={meeting} />
          </Box>
        )}
        <h5>확정 멤버</h5>
        {confirmedMemberList?.map((confirmedMember, i) => (
          <MeetingMember key={i} member={confirmedMember} />
        ))}
        <h5>신청 멤버</h5>
        {pendingMemberList?.map((pendingMember, i) => (
          <MeetingMember key={i} member={pendingMember} />
        ))}
        <h5>리뷰</h5>
        <ListMeetingReview />
        <Stack
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ position: "fixed", bottom: 5, left: 0, right: 0 }}
        >
          <Button
            variant="contained"
            sx={{ width: "85vw", borderRadius: "50px" }}
          >
            참여하기
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default GetMeeting;
