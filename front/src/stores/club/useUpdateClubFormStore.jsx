import { create } from 'zustand';

const clubField = {
  clubName: '',
  clubIntro: '',
  clubImg: '',
  filterGender: '',
  filterMinAge: '',
  filterMaxAge: '',
  meetingMaxMemberNo: null,
  clubState: null,
  file: null,
  image: null,
};

const useUpdateClubFormStore = create((set) => ({
  ...clubField,

  setField: (field, value) => set((state) => ({ [field]: value })),
  onChangeField: (field, event) =>
    set((state) => ({ [field]: event.target.value })),
  reset: () => {
    set(clubField);
  },
}));

export default useUpdateClubFormStore;
