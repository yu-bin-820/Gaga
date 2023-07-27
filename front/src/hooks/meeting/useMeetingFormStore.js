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
    filterMinAge: 14,
    filterMaxAge: 50,
    parentClubNo: 0,
    meetingMaxMemberNo: null,
    entryFee: 0,
    file: null,
    image: null,
    parentMeetingNo: 0,
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