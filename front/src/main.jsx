import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.js";
import MainLayout from "@layouts/common/MainLayout.jsx";
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
import ListGroupMemberList from "@components/user/ListGroupMember.jsx";
import AddClub from "@pages/club/AddClub.jsx";
import GetClub from "@pages/club/GetClub.jsx";
import ListReport from "@pages/communication/ListReport.jsx";

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
            path: "updateuser",
            element: <UpdateUser />,
          },
          {
            path: "memberlist",
            element: <ListGroupMember />,
          },
        ],
      },
      {
        path: "meeting",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "memberlist",
            element: <ListGroupMemberList />,
          },
        ],
      },
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
        ],
      },
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
              { path: "list", element: <ListReport /> },
              {
                path: "reportno/:reportNo",
                element: <GetReport />,
              },
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
            ],
          },
        ],
      },
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
