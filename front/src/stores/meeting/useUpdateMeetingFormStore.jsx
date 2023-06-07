import {create} from 'zustand';


const meetingField={
    meetingName: '',
    meetingIntro: '',
    meetingImg: '',
    meetingDate: null,
    meetingStartTime: null,
    meetingEndTime: null,
    filterGender: '',
    filterMinAge: '',
    filterMaxAge: '',
    meetingMaxMemberNo: null,
    meetingState: null,
    file: null,
    image: null,
}

const useUpdateMeetingFormStore =create((set=>({
    ...meetingField,

    setField: (field, value)=> set((state)=>({[field]: value})),
    onChangeField: (field, event)=>set((state)=>({[field]:event.target.value})),
    reset: () => {
        set(meetingField)
      },
})))



export default useUpdateMeetingFormStore;