import {create} from 'zustand';


const meetingField={
    mainCategoryNo: '',
    filterTag: '',
    meetingName: '',
    meetingIntro: '',
    meetingImg: '',
    meetingDate: null,
    meetingStartTime: null,
    meetingEndTime: null,
    meetingAddr: '',
    meetingDetailAddr: '',
    meetingLat: '',
    meetingLng: '',
    filterGender: '',
    filterMinAge: '',
    filterMaxAge: '',
    parentClubNo: null,
    meetingMaxMemberNo: null,
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