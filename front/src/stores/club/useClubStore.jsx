import { create } from 'zustand';

const useClubStore = create((set) => ({
  prevClubPath: [],
  setField: (field, value) => set(() => ({ [field]: value })),
  onChangeField: (field, event) => set(() => ({ [field]: event.target.value })),
}));

export default useClubStore;
