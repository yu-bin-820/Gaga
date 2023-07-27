import { create } from 'zustand';

const useChatMapStore = create((set) => ({
  locationDrawerOpen: false,
  isPost: false,
  lat: 33.450701,
  lng: 126.570667,
  shouldScroll: true,
  isInfinteSroll: false,
  scrollPositon: 0.0,

  setField: (field, value) => set(() => ({ [field]: value })),
  onChangeField: (field, event) => set(() => ({ [field]: event.target.value })),
}));

export default useChatMapStore;
