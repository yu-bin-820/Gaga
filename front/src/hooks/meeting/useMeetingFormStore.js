import {create} from 'zustand';


const meetingField={
    mainCategoryNo: '',
    filterTag: '',
    meetingName: '',
    meetingIntro: '',
    meetingImg: '',
    meetingDate: '',
    meetingStartTime: '',
    meetingEndTime: '',
    meetingAddr: '',
    meetingDetailAddr: '',
    meetingLat: '',
    meetingLng: '',
    filterGender: '',
    filterMinAge: '',
    filterMaxAge: '',
    meetingMaxMemberNo: '',
    entryFee: null,
    file: null,
    image: null,
}
const useMeetingFormStore=create((set=>({
    ...meetingField,

    setField: (field, value)=> set((state)=>({[field]: value})),
    onChangeField: (field, event)=>set((state)=>({[field]:event.target.value})),
    reset: () => {
        set(meetingField)
      },
})))


export default useMeetingFormStore;