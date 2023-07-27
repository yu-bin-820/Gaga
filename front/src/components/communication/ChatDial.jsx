import { useRef } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImageIcon from '@mui/icons-material/Image';

export default function ChatDial() {
  const selectFile = useRef(null);
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={selectFile} //input에 접근 하기위해 useRef사용
      />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: '5rem', left: '2rem' }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<LocationOnIcon />}
          tooltipTitle={'Location'}
          onClick={() => {}}
        />

        <SpeedDialAction
          icon={<ImageIcon />}
          tooltipTitle={'Image'}
          // onClick={() => selectFile?.current?.click()}
        />
      </SpeedDial>
    </Box>
  );
}
