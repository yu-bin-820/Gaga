import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel  from '@mui/lab/TabPanel';
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
    <Box sx={{  width: '100%', typography: 'body3',alignItems: "center", display: "flex", justifyContent: "center"  }}>
      <TabContext value={value} >
        <Box sx={{ paddingRight: '1%', borderBottom: 2,  borderColor: 'divider', width: '95%', alignItems: "center", display: "flex", justifyContent: "center"   }}>
        <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab style={{ fontSize: '20px', margin:'10px' }} label="Notice" value="1" component={Link} to="/notice/listNoticePost" />
            <Tab style={{ fontSize: '20px', margin:'10px'}}  label="Event" value="2" component={Link} to="/notice/listEventPost" />
            <Tab style={{ fontSize: '20px', margin:'10px' }} label="FAQ" value="3" component={Link} to="/notice/listQnaPost" />
          </TabList>
        </Box>        
      </TabContext>
    </Box>
  );
}