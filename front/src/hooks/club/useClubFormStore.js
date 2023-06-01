import { create } from "zustand";

const clubField = {
  clubName: "",
  clubIntro: "",
  clubMaxMemberNo: "",
  clubImg: "",
  clubRegion: "",
  filterGender: "",
  filterMinAge: "",
  filterMaxAge: "",
  filterTag: "",
  mainCategoryNo: "",
  file: null,
  image: null,
};

const useClubFormStore = create((set) => ({
  ...clubField,

  setClubRegion: (value) => set({ clubRegion: value }),

  setField: (field, value) => set((state) => ({ [field]: value })),
  onChangeField: (field, event) =>
    set((state) => ({ [field]: event.target.value })),
  reset: () => {
    set(clubField);
  },
}));

export default useClubFormStore;
