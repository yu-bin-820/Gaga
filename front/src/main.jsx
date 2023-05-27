import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.js';
import MainLayout from '@layouts/common/MainLayout.jsx';
import ErrorPage from '@pages/common/ErrorPage.jsx';
import Main from '@pages/common/Main.jsx';
import GetMeeting from '@pages/meeting/GetMeeting.jsx';
import UpdateMeeting from '@pages/meeting/UpdateMeeting.jsx';
import AddMeeting from '@pages/meeting/AddMeeting.jsx';
import AddMeetingMember from '@pages/meeting/AddMeetingMember.jsx';
import Login from '@pages/user/Login.jsx';
import Profile from '@pages/communication/Profile.jsx';
import ListMeetingMember from '@pages/meeting/ListMeetingMember.jsx';
import UpdateMeetingSuccess from '@pages/meeting/UpdateMeetingSuccess.jsx';
import AddMeetingReveiw from '@pages/meeting/AddMeetingReveiw.jsx';
import UpdateMeetingReview from '@pages/meeting/UpdateMeetingReview.jsx';
import ChatList from '@pages/communication/ChatRoomList.jsx';
import ClubChat from '@pages/communication/ClubChat.jsx';
import DirectChat from '@pages/communication/DirectChat.jsx';
import MeetingChat from '@pages/communication/MeetingChat.jsx';
import UnauthenticatedMain from '@pages/common/UnauthenticatedMain';
import RootLayout from '@layouts/common/RootLayout.jsx';
import AddUser from '@pages/user/AddUser.jsx';
import UpdateUser from '@pages/user/UpdateUser.jsx';

import GroupThumbnail from './components/common/GroupThumbnail';
import Test from '@pages/communication/Test.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/unauthenticatedmain',
        element: <UnauthenticatedMain />,
      },
      {
        path: 'user',
        children: [
          { 
            path: 'login', 
            element: <Login />,
          },
          { 
            path: 'adduser', 
            element: <AddUser />,
          },
          {
            path: 'updateuser',
            element: <UpdateUser />,
          },
        ],
      },
      {
        path: 'meeting',
        children: [
          {
            path: 'addmeeting',
            element: <AddMeeting />,
          },
          {
            path: 'meetingno/:meetingno',
            element: <GetMeeting />,
          },
          {
            path: 'updatemeeting/:meetingno',
            element: <UpdateMeeting />,
          },
          {
            path: 'updatemeetingsuccess/meetingno/:meetingno',
            element: <UpdateMeetingSuccess />,
          },
          {
            path: 'member',
            children: [
              {
                path: 'addmember/:meetingno',
                element: <AddMeetingMember />,
              },
              {
                path: 'listmember/meetingno/:meetingno',
                element: <ListMeetingMember />,
              },
            ],
          },
          {
            path: 'review',
            children: [
              {
                path: 'addreview/meetingno/:meetingno',
                element: <AddMeetingReveiw />,
              },
              {
                path: 'updatereview/reviewno/:reviewno',
                element: <UpdateMeetingReview />,
              },
            ],
          },
        ],
      },
      {
        path: 'community',
        children: [
          {
            path: 'profile/:userno',
            element: <Profile />,
          },
          {
            path: 'test',
            element: <Test />,
          },
        ],
      },
      {
        path: 'chat',
        children: [
          {
            path: 'list',
            element: <ChatList />,
          },
          {
            path: 'club/message/list',
            element: <ClubChat />,
          },
          {
            path: 'meeting/message/list',
            element: <MeetingChat />,
          },
          {
            path: 'direct/message/list',
            element: <DirectChat />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <RouterProvider router={router} />
    </CssBaseline>
  </ThemeProvider>
);
