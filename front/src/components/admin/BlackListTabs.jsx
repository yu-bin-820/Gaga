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
        <Box sx={{ borderBottom: 2, borderColor: 'divider', width: 1000, alignItems: "center", display: "flex", justifyContent: "center"  }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Black List" value="1" component={Link} to="/blackList/listBlackList" />
            <Tab label="User List" value="2" component={Link} to="/blackList/listUser" />
            <Tab label="Report Admin" value="3" component={Link} to="/blackList/listReportAdmin" />
          </TabList>
        </Box>        
      </TabContext>
    </Box>
  );
}