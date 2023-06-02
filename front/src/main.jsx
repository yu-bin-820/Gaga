import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.js";
import ErrorPage from "@pages/common/ErrorPage.jsx";
import Main from "@pages/common/Main.jsx";
import GetMeeting from "@pages/meeting/GetMeeting.jsx";
import UpdateMeeting from "@pages/meeting/UpdateMeeting.jsx";
import AddMeeting from "@pages/meeting/AddMeeting.jsx";
import AddMeetingMember from "@pages/meeting/AddMeetingMember.jsx";
import Login from "@pages/user/Login.jsx";
import GetMyProfile from "@pages/communication/GetMyProfile.jsx";
import ListMeetingMember from "@pages/meeting/ListMeetingMember.jsx";
import UpdateMeetingSuccess from "@pages/meeting/UpdateMeetingSuccess.jsx";
import AddMeetingReveiw from "@pages/meeting/AddMeetingReveiw.jsx";
import UpdateMeetingReview from "@pages/meeting/UpdateMeetingReview.jsx";
import ListChatRoom from "@pages/communication/ListChatRoom.jsx";
import GetDirectChat from "@pages/communication/GetDirectChat.jsx";
import GetGroupChat from "@pages/communication/GetGroupChat.jsx";
import UnauthenticatedMain from "@pages/common/UnauthenticatedMain";
import RootLayout from "@layouts/common/RootLayout.jsx";
import AddUser from "@pages/user/AddUser.jsx";
import UpdateUser from "@pages/user/UpdateUser.jsx";

import Test from "@pages/communication/Test.jsx";
import GetReport from "@pages/communication/GetReport.jsx";
import AddReport from "@pages/communication/AddReport.jsx";
import GetProfile from "@pages/communication/GetProfile.jsx";
import CommonTop from "@layouts/common/CommonTop.jsx";
import ListReportCategory from "@pages/communication/ListReportCategory.jsx";
import AddClub from "@pages/club/AddClub.jsx";
import GetClub from "@pages/club/GetClub.jsx";
import ListReport from "@pages/communication/ListReport.jsx";

import AddNaverUser from "@pages/user/AddNaverUser.jsx";
import AddKakaoUser from "@pages/user/AddKakaoUser.jsx";
import FindId from "@pages/user/FindId.jsx";
import FindPassword from "@pages/user/FindPassword.jsx";

import UpdateReport from "@pages/communication/UpdateReport.jsx";
import { element } from "prop-types";
import SearchMeeting from "@pages/meeting/SearchMeeting";
import ListClubMember from "@pages/club/ListClubMember.jsx";
import AddClubMember from "@pages/club/AddClubMember.jsx";

import AddNoticePost from "@pages/admin/NoticePost/AddNoticePost.jsx";
import GetNoticePost from "@pages/admin/NoticePost/GetNoticePost.jsx";
import ListNoticePost from "@pages/admin/NoticePost/ListNoticePost.jsx";
import UpdateNoticePost from "@pages/admin/NoticePost/UpdateNoticePost.jsx";
import ListEventPost from "@pages/admin/NoticePost/ListEventPost.jsx";
import GetBlackList from "@pages/admin/BlackList/GetBlackList.jsx";
import SearchUser from "@pages/admin/BlackList/SearchUser.jsx";
import GetReportAdmin from "@pages/admin/Report/GetReportAdmin.jsx";
import ListReportAdmin from "@pages/admin/Report/ListReportAdmin.jsx";
import ListBlackList from "@pages/admin/BlackList/ListBlackList.jsx";
import TermsOfGaga from "@pages/user/TermsOfGaga.jsx";
import ListSearchMeeting from "@pages/meeting/ListSearchMeeting.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/unauthenticatedmain",
        element: <UnauthenticatedMain />,
      },
      //------------------------------------------------User--------------------------------------------------
      {
        path: "user",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "adduser",
            element: <AddUser />,
          },
          {
            path: "addnaveruser",
            element: <AddNaverUser />,
          },
          {
            path: "addkakaouser",
            element: <AddKakaoUser />,
          },
          {
            path: "findid",
            element: <FindId />,
          },
          {
            path: "findpassword",
            element: <FindPassword />,
          },
          {
            path: "updateuser",
            element: <UpdateUser />,
          },
          {
            path: "termsofgaga",
            element: <TermsOfGaga />,
          },
        ],
      },
      //------------------------------------------------Meeting------------------------------------------------
      {
        path: "meeting",
        children: [
          {
            path: "addmeeting",
            element: <AddMeeting />,
          },
          {
            path: "meetingno/:meetingno",
            element: <GetMeeting />,
          },
          {
            path: "updatemeeting/:meetingno",
            element: <UpdateMeeting />,
          },
          {
            path: "updatemeetingsuccess/meetingno/:meetingno",
            element: <UpdateMeetingSuccess />,
          },
          {
            path: "member",
            children: [
              {
                path: "addmember/:meetingno",
                element: <AddMeetingMember />,
              },
              {
                path: "listmember/meetingno/:meetingno",
                element: <ListMeetingMember />,
              },
            ],
          },
          {
            path: "review",
            children: [
              {
                path: "addreview/meetingno/:meetingno",
                element: <AddMeetingReveiw />,
              },
              {
                path: "updatereview/reviewno/:reviewno",
                element: <UpdateMeetingReview />,
              },
            ],
          },
          {
            path: "searchmeeting",
            element: <SearchMeeting />,
          },
          {
            path: "meetinglist",
            element: <ListSearchMeeting />,
          },
        ],
      },
      //------------------------------------------------Community------------------------------------------------
      {
        path: "community",
        children: [
          {
            path: "profile",
            children: [
              { path: "mine", element: <GetMyProfile /> },
              { path: "userno/:userNo", element: <GetProfile /> },
            ],
          },
          {
            path: "test",
            element: <Test />,
          },
          {
            path: "report",
            children: [
              {
                path: "",
                element: <GetReport />,
              },
              { path: "list", element: <ListReport /> },
              {
                path: "add",
                element: <CommonTop pageName="회원 신고하기" />,
                children: [
                  {
                    path: "category/reportedno/:reportedNo",
                    element: <ListReportCategory />,
                  },
                  {
                    path: "categoryno/:categoryNo/reportedno/:reportedNo",
                    element: <AddReport />,
                  },
                ],
              },
              { path: "update", element: <UpdateReport /> },
            ],
          },
        ],
      },
      //------------------------------------------------Chat------------------------------------------------
      {
        path: "chat",
        children: [
          {
            path: "list",
            element: <ListChatRoom />,
          },
          {
            path: "group/message/list",
            element: <GetGroupChat />,
          },
          {
            path: "direct/message/list",
            element: <GetDirectChat />,
          },
        ],
      },
      //------------------------------------------------Club------------------------------------------------
      {
        path: "club",
        children: [
          {
            path: "addclub",
            element: <AddClub />,
          },
          {
            path: "no/:clubno",
            element: <GetClub />,
          },
          {
            path: "member",
            children: [
              {
                path: "listmember/clubno/:clubno",
                element: <ListClubMember />,
              },
              {
                path: "addmember/:clubno",
                element: <AddClubMember />,
              },
            ],
          },
        ],
      },
      //------------------------------------------------Notice------------------------------------------------
      {
        path: "notice",
        children: [
          {
            path: "addNoticePost",
            element: <AddNoticePost />,
          },
          {
            path: "getNoticePost/noticePostNo/:noticePostNo",
            element: <GetNoticePost />,
          },
          {
            path: "updateNoticePost/noticePostNo/:noticePostNo",
            element: <UpdateNoticePost />,
          },
          {
            path: "listNoticePost",
            element: <ListNoticePost />,
          },
          {
            path: "listEventPost",
            element: <ListEventPost />,
          },
        ],
      },
      //------------------------------------------------BlackList------------------------------------------------
      {
        path: "blackList",
        children: [
          {
            path: "getBlackList/blackListNo/:userNo",
            element: <GetBlackList />,
          },
          {
            path: "listBlackList",
            element: <ListBlackList />,
          },
          {
            path: "searchUser",
            element: <SearchUser />,
          },
          {
            path: "getReportAdmin",
            element: <GetReportAdmin />,
          },
          {
            path: "listReportAdmin",
            element: <ListReportAdmin />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <RouterProvider router={router} />
    </CssBaseline>
  </ThemeProvider>
);
