import { LocalizationProvider, MobileDatePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';

const AddMeetingDate = () => {
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    const {
        meetingDate,
        meetingStartTime,
        meetingEndTime,
        setField
      } = useMeetingFormStore();  

      const handleMeetingDateChange = useCallback((newValue) => {
        setField('meetingDate', newValue);
      }, [setField]);

      const handleMeetingStartTimeChange = useCallback((newValue) => {
        setField('meetingStartTime', newValue);
      }, [setField]);

      const handleMeetingEndTimeChange = useCallback((newValue) => {
        setField('meetingEndTime', newValue);
      }, [setField]);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem >
                <MobileDatePicker value={meetingDate} onChange={handleMeetingDateChange}/>
            </DemoItem>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem >
                <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} value={meetingStartTime} onChange={handleMeetingStartTimeChange}/>
            </DemoItem>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem >
                <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} value={meetingEndTime} onChange={handleMeetingEndTimeChange}/>
            </DemoItem>
            </LocalizationProvider>

        </div>
    );
};

export default AddMeetingDate;