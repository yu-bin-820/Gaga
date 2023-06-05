import { create } from 'zustand';

const usePaymentFormStore = create((set) => ({
  data: {},
  setData: (data) => set({ data }),
}));

export default usePaymentFormStore;
