import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

export default function CenteredTabsBlackList() {
    const [value, setValue] = useState('1');
    const [tabLabels, setTabLabels] = useState(['블랙리스트', '신고', '회원검색']);
  
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
      setValue(newValue);

      switch(newValue) {
        case '1':
          navigate('/blackList/listBlackList');
          break;
        case '2':
          navigate('/blackList/listReportAdmin');
          break;
        case '3':
          navigate('/blackList/listUser');
          break;
        default:
          break;
      }
    };
  
    const reorderTabs = (index) => {
      const reorderedLabels = [...tabLabels];
      const clickedTabLabel = reorderedLabels.splice(index, 1)[0];
      reorderedLabels.unshift(clickedTabLabel);
      setTabLabels(reorderedLabels);
    };
  
    useEffect(() => {
      // 초기 탭의 게시글 가져오기
      handleChange(null, value);
    }, []);
  
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ display: 'flex', justifyContent: 'center' }} >
                {tabLabels.map((label, index) => (
                  <Tab
                    key={label}
                    label={label}
                    value={String(index + 1)}
                    onClick={() => reorderTabs(index)}
                    sx={{ fontSize: '20px', textTransform: 'capitalize',display: 'flex', justifyContent: 'center'  }}
                  />
                ))}
              </TabList>
            </Box>          
          </TabContext>
        </Box>
      );
}