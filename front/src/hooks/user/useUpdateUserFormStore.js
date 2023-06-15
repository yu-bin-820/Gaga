import {create} from 'zustand';


const userField={
    userNo:'',
    userId: '',
    // password: '',
    userName: '',
    birthday: null,
    gender: 1,
    nickName: '',
    phoneNo: '',
    profileImg: '',
    activityImg: '',
    activityImg2: '',
    activityImg3: '',
    userIntro: '',
    mainTitleNo: 0,
    mainTitleName:'',
    bankCode: '',
    bankName: '',
    accountNo: '',
    blacklist: 0,
    filterGender: 0,
    filterMaxAge:   0,
    filterMinAge: 0,
    filterTag: '',
    filterTag2: '',
    filterTag3: '',
}
const useUpdateUserFormStore=create((set=>({
    ...userField,

    setField: (field, value) => {
        console.log(`Setting ${field} to ${value}`);
        set(state => ({ ...state, [field]: value }));
      },
    onChangeField: (field, event)=>set((state)=>({[field]:event.target.value})),
    reset: () => {
        set(userField)
      },
})))


export default useUpdateUserFormStore;