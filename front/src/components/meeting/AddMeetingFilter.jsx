import { Stack } from '@mui/system';
import React, { useCallback } from 'react';
import SelectGender from './SelectGender';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';

const AddMeetingFilter = () => {

    const {
        filterGender,
        filterMinAge,
        filterMaxAge,
        meetingMaxMemberNo,
        entryFee,
        file,
        setField,
        onChangeField,
        reset
      } = useMeetingFormStore();

    const handleGenderChange = useCallback((gender) => {
        setField('filterGender', gender);
      }, [setField]);

    return (
        <div>
        <SelectGender
            onGenderClick={handleGenderChange}
        />
            
        </div>
    );
};

export default AddMeetingFilter;