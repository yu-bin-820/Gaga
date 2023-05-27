import { create } from 'zustand';

const useCommunityStore = create((set) => ({
  chatRoomEntryNo: 0,
  chatType: '',
  chatRoomLeader: {},
  setChatRoomEntryNo: (chatRoomEntryNo) =>
    set(() => ({ chatRoomEntryNo: chatRoomEntryNo })),
  setField: (field, value) => set(() => ({ [field]: value })),
  onChangeField: (field, event) => set(() => ({ [field]: event.target.value })),
}));

export default useCommunityStore;
