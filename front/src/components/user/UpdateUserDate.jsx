import { LocalizationProvider, MobileDatePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import useUpdateUserFormStore from '@hooks/user/useUpdateUserFormStore';

const UpdateUserDate = () => {
  const {
    birthday,
    setField
  } = useUpdateUserFormStore();

  const [value, setValue] = React.useState(birthday ? dayjs(birthday) : dayjs('1990-01-01'));

  // birthday 값이 변경될 때마다 value를 업데이트 합니다.
  useEffect(() => {
    setValue(birthday ? dayjs(birthday) : dayjs('1990-01-01'));
  }, [birthday]);

  const handleUserDateChange = useCallback((newValue) => {
    setValue(newValue);
    setField('birthday', dayjs(newValue).format('YYYY-MM-DD'));
  }, [setField]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker value={value} onChange={handleUserDateChange}/>
      </LocalizationProvider>
    </div>
  );
};

export default UpdateUserDate;
