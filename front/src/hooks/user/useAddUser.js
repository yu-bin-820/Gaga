import {create} from 'zustand';


const addUser={
    userId: '',
    password: '',
    userName: '',
    birthday: '',
    gender: '',
    nickName: '',
    phoneNo: ''
}
const userAddUser=create((set=>({
    ...addUser,

    setField: (field, value)=> set((state)=>({[field]: value})),
    onChangeField: (field, event)=>set((state)=>({[field]:event.target.value})),
    reset: () => {
        set(addUser)
      },
})))


export default userAddUser;