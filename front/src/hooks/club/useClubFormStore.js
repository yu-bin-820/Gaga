import { create } from "zustand";

const clubField = {
  clubName: "",
  clubIntro: "",
  clubMaxMemberNo: "",
  clubImg: "",
  clubRegionL: "",
  filterGender: "",
  filterMinAge: "",
  filterMaxAge: "",
  filterTag: "",
  mainCategoryNo: "",
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
