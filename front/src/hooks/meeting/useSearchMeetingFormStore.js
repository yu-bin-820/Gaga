import { create } from 'zustand';

const useSearchMeetingFormStore = create((set) => ({
  searchKeyword: '',
  setField: (field, value) => set({ [field]: value }),
  reset: () => set({ searchKeyword: '' }),
}));

export default useSearchMeetingFormStore;