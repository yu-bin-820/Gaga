import create from "zustand";

// const usePasswordUpdateStore = create(set => ({
//   password: "",
//   passwordConfirm: "",
//   setPassword: (password) => set({ password }),
//   setPasswordConfirm: (passwordConfirm) => set({ passwordConfirm }),
//   isValid: () => {
//     const { password, passwordConfirm } = get();
//     const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,14}$/;
//     return re.test(password) && re.test(passwordConfirm) && password === passwordConfirm;
//   }
// }));
