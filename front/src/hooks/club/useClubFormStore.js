import { create } from 'zustand';

const clubField = {
  clubName: '',
  clubIntro: '',
  clubMaxMemberNo: null,
  clubImg: '',
  selectedSido: '',
  selectedSigoon: '',
  clubRegion: '',
  filterGender: '',
  filterMinAge: '',
  filterMaxAge: '',
  filterTag: '',
  mainCategoryNo: '',
  file: null,
  image: null,
};

const useClubFormStore = create((set) => ({
  ...clubField,

  setClubRegion: (value) => set({ clubRegion: value }),
  setSelectedSido: (sido) => set({ selectedSido: sido }),
  setSelectedSigoon: (sigoon) => set({ selectedSigoon: sigoon }),

  setField: (field, value) => set((state) => ({ [field]: value })),
  onChangeField: (field, event) =>
    set((state) => ({ [field]: event.target.value })),
  reset: () => {
    set(clubField);
  },
}));

export default useClubFormStore;
