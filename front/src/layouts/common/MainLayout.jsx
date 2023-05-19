import React from 'react';
import MainTop from './MainTop';

import { Outlet } from 'react-router';
import MainBottomNav from './MainBottomNav';

const MainLayout = () => {
  return (
    <div>
      <MainTop />
      <Outlet />
      <MainBottomNav />
    </div>
  );
};

export default MainLayout;
