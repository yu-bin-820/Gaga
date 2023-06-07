import { LocalizationProvider, MobileDatePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import useUpdateUserFormStore from '@hooks/user/useUpdateUserFormStore';

const UpdateUserDate = (value, onChange) => {
  const {
    birthday,
    setField
  } = useUpdateUserFormStore();

  const handleUserDateChange = useCallback((newValue) => {
    setField('birthday', newValue);
  }, [setField]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoItem>
          <MobileDatePicker value={birthday} onChange={handleUserDateChange} />
        </DemoItem>
      </LocalizationProvider>
    </div>
  );
};

export default UpdateUserDate;