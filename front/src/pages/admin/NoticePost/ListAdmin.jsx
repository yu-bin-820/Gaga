import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListNoticePost from '@pages/admin/NoticePost/ListNoticePost.jsx';
import ListEventPost from '@pages/admin/NoticePost/ListEventPost.jsx';
import ListQnaPost from '@pages/admin/NoticePost/ListQnaPost.jsx';

export default function ListAdmin() {
  const [tab, setTab] = useState(0);

  const switchTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <div>
      <Tabs value={tab} onChange={switchTab}>
        <Tab label="Notice Posts" />
        <Tab label="Event Posts" />
        <Tab label="Q&A Posts" />
      </Tabs>
      {tab === 0 && <ListNoticePost key="list-notice" noticePostCategoryNo={0} />}
      {tab === 1 && <ListEventPost key="list-event" noticePostCategoryNo={1} />}
      {tab === 2 && <ListQnaPost key="list-qna" noticePostCategoryNo={2} />}
    </div>
  );
}