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
      case '/blackList/listBlackList':
        setValue('1');
        break;
      case '/blackList/listUser':
        setValue('2');
        break;
      case '/blackList/listReportAdmin':
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
        <Box sx={{ borderBottom: 3, borderColor: 'divider', width: '150%', alignItems: "center", display: "flex", justifyContent: "center", fontSize: '1.5rem'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example"  >
            <Tab label="BlackList" value="1" component={Link} to="/blackList/listBlackList" sx={{fontSize: '1.0rem'}}/>
            <Tab label="UserList" value="2" component={Link} to="/blackList/listUser" sx={{fontSize: '1.0rem'}}/>
            <Tab label="Report " value="3" component={Link} to="/blackList/listReportAdmin" sx={{fontSize: '1.0rem'}}/>
          </TabList>
        </Box>        
      </TabContext>
    </Box>
  );
}