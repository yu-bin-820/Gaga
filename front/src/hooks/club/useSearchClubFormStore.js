import { create } from 'zustand';

const useSearchClubFormStore = create((set) => ({
  searchKeyword: '',
  currentPage: 1,

  setField: (field, value) => set({ [field]: value }),
  reset: () => set({ searchKeyword: '' }),
}));

export default useSearchClubFormStore;
