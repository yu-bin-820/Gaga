import ListCreateClub from "@components/club/ListCreateClub";
import ListMyClub from "@components/club/ListMyClub";
import ListMyMeeting from "@components/meeting/ListMyMeeting";

import MainBottomNav from "@layouts/common/MainBottomNav";
import MyProfileTop from "@layouts/communication/MyProfileTop";
import { BottomNavigation } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Profile = () => {
  return (
    <>
      <MyProfileTop />
      <Box sx={{ marginTop: "64px", marginBottom: "64px" }}>
        <ListMyMeeting />
        <h3>내가 참여한 클럽 목록</h3>
        <ListMyClub />
        <h3>내가 생성한 클럽 목록</h3>
        <ListCreateClub />
      </Box>
      <MainBottomNav pageName={"profile"} />
    </>
  );
};

export default Profile;
