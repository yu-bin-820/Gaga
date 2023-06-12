import { styled } from '@mui/system';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    height: '30px',

    '&.Mui-disabled': {
      border: 1,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
  '& .MuiToggleButton-root.Mui-selected': {
    color: 'white',
    backgroundColor: '#036635',
    '&:hover': {
      backgroundColor: '#036635', // selected + focus 상태에서의 마우스 오버 색상 설정
    },
  },
  '& .MuiToggleButton-root.Mui-selected.Mui-fucusVisible': {
    color: 'white',
    backgroundColor: '#036635',
    '&:hover': {
      backgroundColor: '#036635', // selected + focus 상태에서의 마우스 오버 색상 설정
    },
  },
  display: 'flex',
  flexWrap: 'wrap',
}));

export default StyledToggleButtonGroup;
