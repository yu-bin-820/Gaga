import CategoryAccordion from '@components/common/CategoryAccordion';
import GroupThumbnail from '@components/common/GroupThumbnail';
import UserThumbnail from '@components/common/UserThumbnail';
import { Box } from '@mui/system';

import React from 'react';

const Test = () => {
  return (
    <>
      <GroupThumbnail />
      <UserThumbnail />

      <CategoryAccordion />
    </>
  );
};

export default Test;
