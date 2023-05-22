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

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'user',
        children: [
          {path: 'login',
        element: <Login/>}
        ]
      },
      {
        path: 'meeting',
        children: [
          {
            path: 'addmeeting',
            element: <AddMeeting />
          },
          {
            path: 'meetingno/:meetingno',
            element: <GetMeeting />
          },
          {
            path: 'updatemeetig/:meetingno',
            element: <UpdateMeeting />
          },
          {
            pathg: 'updatemeetingsuccess/meetingon/:meetingno',
            element:<UpdateMeetingSuccess />
          },
          {
            path: 'member',
            children: [
              {
                path: 'addmember/:meetingno',
                element: <AddMeetingMember />
              },
              {
                path: 'listmember/meetingno/:meetingno',
                element: <ListMeetingMember/>
              }
            ]
          },
          {
            path: 'review',
            children: [
              {
                path: 'addreview/meetingno/:meetingno',
                element: <AddMeetingReveiw />
              },
              {
                path: 'updatereview/reviewno/:reviewno',
                element: <UpdateMeetingReview />
              }
            ]
          },
        ]
      },
      {
        path: 'community',
        children: [
          {
            path: 'profile/:userno',
            element: <Profile/>
          }
        ]
      }
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
