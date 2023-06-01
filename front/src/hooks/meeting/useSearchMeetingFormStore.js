import {create} from 'zustand';


const filterField={
    gender: '',
    maxAge: '',
    minAge: '',
    mainCategoryNo: '',
    tag: '',
}
const useSearchMeetingFormStore=create((set=>({
    ...filterField,

    setField: (field, value)=> set((state)=>({[field]: value})),
    onChangeField: (field, event)=>set((state)=>({[field]:event.target.value})),
    reset: () => {
        set(filterField)
      },
})))


export default useSearchMeetingFormStore;