import { create } from 'zustand';

const clubField = {
  clubName: '',
  clubIntro: '',
  clubMaxMemberNo: null,
  clubImg: '',
  clubRegion: '',
  filterGender: null,
  filterMinAge: 14,
  filterMaxAge: 50,
  filterTag: '',
  mainCategoryNo: '',
  file: null,
  image: null,
  parentClubNo: 0,
  parentMeetingNo: 0,
};

const useClubFormStore = create((set) => ({
  ...clubField,

  setField: (field, value) => set((state) => ({ [field]: value })),
  onChangeField: (field, event) =>
    set((state) => ({ [field]: event.target.value })),
  reset: () => {
    set(clubField);
  },
}));

export default useClubFormStore;
