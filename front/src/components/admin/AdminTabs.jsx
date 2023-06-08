import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link, useLocation } from 'react-router-dom';

export default function BlackListTabs() {
  const [value, setValue] = React.useState('');


  const location = useLocation();

  React.useEffect(() => {
    switch (location.pathname) {
      case '/notice/listNoticePost':
        setValue('1');
        break;
      case '/notice/listEventPost':
        setValue('2');
        break;
      case '/notice/listQnaPost':
        setValue('3');
        break;
      default:
        setValue('2');
        break;
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1',alignItems: "center", display: "flex", justifyContent: "center"  }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider', width: 1000, alignItems: "center", display: "flex", justifyContent: "center"  }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="공지사항" value="1" component={Link} to="/notice/listNoticePost" />
            <Tab label="이벤트" value="2" component={Link} to="/notice/listEventPost" />
            <Tab label="Q&A" value="3" component={Link} to="/notice/listQnaPost" />
          </TabList>
        </Box>        
      </TabContext>
    </Box>
  );
}