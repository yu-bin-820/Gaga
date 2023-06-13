import { LocalizationProvider, MobileDatePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import useUserFormStore from '@hooks/user/useUserFormStore';
import 'dayjs/locale/ko';

const AddUserDate = () => {
    const [value, setValue] = React.useState(dayjs('1990-01-01'));

    const {
        birthday,
        setField
      } = useUserFormStore();  

      const handleUserDateChange = useCallback((newValue) => {
        setField('birthday', newValue);
      }, [setField]);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <DemoItem >
                <MobileDatePicker value={birthday} onChange={handleUserDateChange}/>
            </DemoItem>
            </LocalizationProvider>

        </div>
    );
};

export default AddUserDate;