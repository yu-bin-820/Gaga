import { create } from 'zustand';

const useAddressFormStore = create((set) => ({
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  state: '',
  country: '',
  cardNumber: '',
  cvv: '',

  setFirstName: (firstName) => set(() => ({ firstName: firstName })),
  setLastName: (lastName) => set(() => ({ lastName: lastName })),
  setAddress1: (address1) => set(() => ({ address1: address1 })),
  setAddress2: (address2) => set(() => ({ address2 })),
  setState: (state) => set(() => ({ state })),
  setCountry: (country) => set(() => ({ country })),
  setCardNumber: (cardNumber) => set(() => ({ cardNumber })),
  setCvv: (cvv) => set(() => ({ cvv })),

  onChangeFirstName: (event) => set(() => ({ firstName: event.target.value })),
  onChangeLastName: (event) => set(() => ({ lastName: event.target.value })),
  onChangeAddress1: (event) => set(() => ({ address1: event.target.value })),
  onChangeAddress2: (event) => set(() => ({ address2: event.target.value })),
  onChangeState: (event) => set(() => ({ state: event.target.value })),
  onChangeCountry: (event) => set(() => ({ country: event.target.value })),
  onChangeCardNumber: (event) =>
    set(() => ({ cardNumber: event.target.value })),
  onChangeCvv: (event) => set(() => ({ cvv: event.target.value })),
}));

export default useAddressFormStore;
