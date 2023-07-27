import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.js';
import ErrorPage from '@pages/common/ErrorPage.jsx';
import Main from '@pages/common/Main.jsx';
import GetMeeting from '@pages/meeting/GetMeeting.jsx';
import GetMyProfile from '@pages/communication/GetMyProfile.jsx';
import ListMeetingMember from '@pages/meeting/ListMeetingMember.jsx';
import UpdateMeetingSuccess from '@pages/meeting/UpdateMeetingSuccess.jsx';
import ListChatRoom from '@pages/communication/ListChatRoom.jsx';
import GetDirectChat from '@pages/communication/GetDirectChat.jsx';
import GetGroupChat from '@pages/communication/GetGroupChat.jsx';
import UnauthenticatedMain from '@pages/common/UnauthenticatedMain';
import RootLayout from '@layouts/common/RootLayout.jsx';

import Test from '@pages/communication/Test.jsx';
import GetReport from '@pages/communication/GetReport.jsx';
import AddReport from '@pages/communication/AddReport.jsx';
import GetProfile from '@pages/communication/GetProfile.jsx';
import CommonTop from '@layouts/common/CommonTop.jsx';
import ListReportCategory from '@pages/communication/ListReportCategory.jsx';
import AddClub from '@pages/club/AddClub.jsx';
import GetClub from '@pages/club/GetClub.jsx';
import ListReport from '@pages/communication/ListReport.jsx';

import Login from '@pages/user/Login.jsx';
import AddUser from '@pages/user/AddUser.jsx';
import AddNaverUser from '@pages/user/AddNaverUser.jsx';
import AddKakaoUser from '@pages/user/AddKakaoUser.jsx';
import FindId from '@pages/user/FindId.jsx';
import FindPassword from '@pages/user/FindPassword.jsx';
import UpdateUser from '@pages/user/UpdateUser.jsx';
import TermsOfGaga from '@pages/user/TermsOfGaga.jsx';
import DeleteUser from '@pages/user/DeleteUser.jsx';
import AddUserTest from '@pages/user/AddUserTest.jsx';

import UpdateReport from '@pages/communication/UpdateReport.jsx';

import SearchMeeting from '@pages/meeting/SearchMeeting';
import ListClubMember from '@pages/club/ListClubMember.jsx';
import AddClubMember from '@pages/club/AddClubMember.jsx';

import AddNoticePost from '@pages/admin/NoticePost/AddNoticePost.jsx';
import GetNoticePost from '@pages/admin/NoticePost/GetNoticePost.jsx';
import ListNoticePost from '@pages/admin/NoticePost/ListNoticePost.jsx';
import ListQnaPost from '@pages/admin/NoticePost/ListQnaPost.jsx';
import ListEventPost from '@pages/admin/NoticePost/ListEventPost.jsx';
import UpdateNoticePost from '@pages/admin/NoticePost/UpdateNoticePost.jsx';

import GetBlackList from '@pages/admin/BlackList/GetBlackList.jsx';
import ListUser from '@pages/admin/BlackList/ListUser.jsx';
import GetReportAdmin from '@pages/admin/Report/GetReportAdmin.jsx';
import ListReportAdmin from '@pages/admin/Report/ListReportAdmin.jsx';
import ListBlackList from '@pages/admin/BlackList/ListBlackList.jsx';

import UpdateClub from '@pages/club/UpdateClub.jsx';
import UpdateAccount from '@pages/payment/UpdateAccount.jsx';
import ListPayment from '@pages/payment/ListPayment.jsx';
import ListSearchMeeting from '@pages/meeting/ListSearchMeeting.jsx';
import GetUser from '@pages/admin/BlackList/GetUser.jsx';
import ListSearchClub from '@pages/club/ListSearchClub.jsx';
import SearchClub from '@pages/club/SearchClub.jsx';
import Payment from '@pages/payment/Payment.jsx';
import PaymentRedirect from '@pages/payment/PaymentRedirect.jsx';
import PaymentFail from '@pages/payment/PaymentFail.jsx';
import ListAdjustment from '@pages/payment/ListAdjustment.jsx';
import GetPayment from '@pages/payment/GetPayment.jsx';

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
      //------------------------------------------------User--------------------------------------------------
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
            path: 'addnaveruser',
            element: <AddNaverUser />,
          },
          {
            path: 'addkakaouser',
            element: <AddKakaoUser />,
          },
          {
            path: 'findid',
            element: <FindId />,
          },
          {
            path: 'findpassword',
            element: <FindPassword />,
          },
          {
            path: 'updateuser',
            element: <UpdateUser />,
          },
          {
            path: 'termsofgaga',
            element: <TermsOfGaga />,
          },
          {
            path: 'deleteuser',
            element: <DeleteUser />,
          },
          {
            path: 'addusertest',
            element: <AddUserTest />,
          },
        ],
      },
      //------------------------------------------------Meeting------------------------------------------------
      {
        path: 'meeting',
        children: [
          {
            path: 'meetingno/:meetingno',
            element: <GetMeeting />,
          },
          {
            path: 'updatemeetingsuccess/meetingno/:meetingno',
            element: <UpdateMeetingSuccess />,
          },
          {
            path: 'member',
            children: [
              {
                path: 'listmember/meetingno/:meetingno',
                element: <ListMeetingMember />,
              },
            ],
          },
          {
            path: 'searchmeeting',
            element: <SearchMeeting />,
          },
          {
            path: 'meetinglist',
            element: <ListSearchMeeting />,
          },
        ],
      },
      //------------------------------------------------Community------------------------------------------------
      {
        path: 'community',
        children: [
          {
            path: 'test',
            element: <Test />,
          },
          {
            path: 'profile',
            children: [
              { path: 'mine', element: <GetMyProfile /> },
              { path: 'userno/:userNo', element: <GetProfile /> },
            ],
          },
          {
            path: 'test',
            element: <Test />,
          },
          {
            path: 'report',
            children: [
              {
                path: '',
                element: <GetReport />,
              },
              { path: 'list', element: <ListReport /> },
              {
                path: 'add',
                element: <CommonTop pageName='회원 신고하기' />,
                children: [
                  {
                    path: 'category/reportedno/:reportedNo',
                    element: <ListReportCategory />,
                  },
                  {
                    path: 'categoryno/:categoryNo/reportedno/:reportedNo',
                    element: <AddReport />,
                  },
                ],
              },
              { path: 'update', element: <UpdateReport /> },
            ],
          },
        ],
      },
      //------------------------------------------------Chat------------------------------------------------
      {
        path: 'chat',
        children: [
          {
            path: 'list',
            element: <ListChatRoom />,
          },
          {
            path: 'group/message/list',
            element: <GetGroupChat />,
          },
          {
            path: 'direct/message/list',
            element: <GetDirectChat />,
          },
        ],
      },
      //------------------------------------------------Club------------------------------------------------
      {
        path: 'club',
        children: [
          {
            path: 'addclub',
            element: <AddClub />,
          },
          {
            path: 'no/:clubNo',
            element: <GetClub />,
          },
          {
            path: 'updateclub/:clubNo',
            element: <UpdateClub />,
          },
          {
            path: 'searchclub',
            element: <SearchClub />,
          },
          {
            path: 'clublist',
            element: <ListSearchClub />,
          },
          {
            path: 'member',
            children: [
              {
                path: 'listmember/clubno/:clubNo',
                element: <ListClubMember />,
              },
              {
                path: 'addmember/:clubNo',
                element: <AddClubMember />,
              },
            ],
          },
        ],
      },
      //------------------------------------------------Notice------------------------------------------------
      {
        path: 'notice',
        children: [
          {
            path: 'addNoticePost',
            element: <AddNoticePost />,
          },
          {
            path: 'getNoticePost/noticePostNo/:noticePostNo',
            element: <GetNoticePost />,
          },
          {
            path: 'updateNoticePost/noticePostNo/:noticePostNo',
            element: <UpdateNoticePost />,
          },
          {
            path: 'listNoticePost',
            element: <ListNoticePost />,
          },
          {
            path: 'listEventPost',
            element: <ListEventPost />,
          },
          {
            path: 'listQnaPost',
            element: <ListQnaPost />,
          },
        ],
      },
      //------------------------------------------------BlackList------------------------------------------------
      {
        path: 'blackList',
        children: [
          {
            path: 'getBlackList/blackListNo/:userNo',
            element: <GetBlackList />,
          },
          {
            path: 'listBlackList',
            element: <ListBlackList />,
          },
          {
            path: 'listUser',
            element: <ListUser />,
          },
          {
            path: 'getUser/userNo/:userNo',
            element: <GetUser />,
          },
          {
            path: 'getReportAdmin/reportNo/:reportNo',
            element: <GetReportAdmin />,
          },
          {
            path: 'listReportAdmin',
            element: <ListReportAdmin />,
          },
        ],
      },
      //------------------------------------------------Payment------------------------------------------------
      {
        path: 'payment',
        children: [
          {
            path: '',
            element: <Payment />,
          },
          {
            path: 'redirect',
            element: <PaymentRedirect />,
          },
          {
            path: 'fail',
            element: <PaymentFail />,
          },
          {
            path: 'details/:payNo',
            element: <GetPayment />,
          },

          {
            path: 'adjustment',
            children: [
              {
                path: 'account/:userNo',
                element: <UpdateAccount />,
              },
            ],
          },
          {
            path: 'listpayment/:userNo',
            element: <ListPayment />,
          },
          {
            path: 'listadjustment/:userNo',
            element: <ListAdjustment />,
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
