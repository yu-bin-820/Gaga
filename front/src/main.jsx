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
import ListMeeting from '@pages/meeting/ListMeeting.jsx';

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
        path: 'meeting',
        children: [
          {
            path: 'list',
            element: <ListMeeting/>
          },
          {
            path: 'meetingno/:meetingno',
            element: <GetMeeting />
          },
          {
            path: 'updatemeetig/:meetingno',
            element: <UpdateMeeting />
          },
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
