import { create } from 'zustand';

interface UserInfoStore {
  state: string;
  city: string;
  setStates: (state: string) => void;
  setCity: (city: string) => void;
}

const useUserInfo = create<UserInfoStore>(set => ({
  state: '',
  city: '',
  setStates: (state: string) => set({ state }),
  setCity: (city: string) => set({ city }),
}));

export default useUserInfo;
