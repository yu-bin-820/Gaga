import { create } from 'zustand';

const useCommunityStore = create((set) => ({
  chatRoomEntryNo: 0,
  chatType: 0,
  chatRoomLeader: 0,

  prevChatRoomEntryNo: [],
  prevChatType: [],
  prevChatRoomLeader: [],

  reportNo: 0,
  reportCategory: [
    '개인 연락처 또는 1:1 만남요구',
    'GAGA 취지에 반하는 모임 운영',
    'GAGA채팅이 아닌 외부 채팅방으로 유도',
    '비매너, 비협조적인 태도 등으로 모임 진행 방해',
    '비방, 폭언, 협박, 위협 등으로 불안감 조성',
    '성적 수치심, 불쾌감을 유발하는 발언',
    '특정 종교의 권유, 포교, 전도 목적 의심',
    '기타',
  ],
  profileUserNo: 0,

  prevProfilePath: [],
  prevGetGroupChatPath: [],
  prevGetDirectChatPath: [],
  prevPath: '',

  // setChatRoomEntryNo: (chatRoomEntryNo) =>
  //   set(() => ({ chatRoomEntryNo: chatRoomEntryNo })),
  setField: (field, value) => set(() => ({ [field]: value })),
  onChangeField: (field, event) => set(() => ({ [field]: event.target.value })),
}));

export default useCommunityStore;
