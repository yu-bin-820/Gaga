import {create} from 'zustand';


const userField={
    userId: '',
    password: '',
    userName: '',
    birthday: null,
    gender: 1,
    nickName: '',
    phoneNo: ''
}
const useUpdateUserFormStore=create((set=>({
    ...userField,

    setField: (field, value)=> set((state)=>({[field]: value})),
    onChangeField: (field, event)=>set((state)=>({[field]:event.target.value})),
    reset: () => {
        set(userField)
      },
})))


export default useUpdateUserFormStore;