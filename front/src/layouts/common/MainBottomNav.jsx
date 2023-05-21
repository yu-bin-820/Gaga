import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

export default function MainBottomNav() {

  const navigate = useNavigate();

  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
    );

  const onClickHome = React.useCallback((MouseEvent)=>{
    navigate(`/`);
  },[]);

  const onClickAddGrop = React.useCallback((MouseEvent)=>{
    navigate(`/meeting/addmeeting`);
  },[]);

  const onClickProfile = React.useCallback((MouseEvent)=>{
    navigate(`/community/profile/${myData.userNo}`);
  },[myData]);

  console.log(myData)

  return (
    <BottomNavigation
      sx={{ width: '100%', position: 'fixed', bottom: '0rem' }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction 
        label="Home" 
        value="home" 
        icon={<HomeIcon />} 
        onClick={onClickHome}/>
        
      <BottomNavigationAction
        label="Create"
        value="create"
        icon={<AddCircleOutlineIcon />}
        onClick={onClickAddGrop}
      />
      <BottomNavigationAction
        label="Chat"
        value="chat"
        icon={<QuestionAnswerIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<PersonIcon />}
        onClick={onClickProfile}
      />
    </BottomNavigation>
  );
}
