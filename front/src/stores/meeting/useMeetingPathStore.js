import { create } from 'zustand';

const useMeetingPathStore = create((set) => ({
  prevMeetingPath: [],
  setField: (field, value) => set(() => ({ [field]: value })),
  onChangeField: (field, event) => set(() => ({ [field]: event.target.value })),
}));

export default useMeetingPathStore;
