import { create } from 'zustand';

const useAddressFormStore = create((set) => ({
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  cardNumber: '',
  cvv: '',

  setField: (field, value) => set((state) => ({ [field]: value })),
  onChangeField: (field, event) =>
    set((state) => ({ [field]: event.target.value })),
}));

export default useAddressFormStore;
