import {create} from 'zustand';


const userField={
    userId: '',
    password: '',
    userName: '',
    birthday: '',
    gender: 1,
    nickName: '',
    phoneNo: ''
}
const useUserFormStore=create((set=>({
    ...userField,

    setField: (field, value)=> set((state)=>({[field]: value})),
    onChangeField: (field, event)=>set((state)=>({[field]:event.target.value})),
    reset: () => {
        set(userField)
      },
})))


export default useUserFormStore;