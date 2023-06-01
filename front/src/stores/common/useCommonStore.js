import { create } from 'zustand';

const useCommonStore = create((set) => ({
  groupType: 'meeting',

  setField: (field, value) => set((state) => ({ [field]: value })),
  onChangeField: (field, event) =>
    set((state) => ({ [field]: event.target.value })),
}));

export default useCommonStore;
