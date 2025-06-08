import { create } from 'zustand';

export const INITIAL_USER_INFO = {
};

const useUserState = create((set, get) => ({
  userInfo: INITIAL_USER_INFO,
  isAuthenticated: false,
  role: false,
  tools: [],
  loadingz: false,
  setUserInfo: (data) => set({ ...data, isAuthenticated: true, role: data.userInfo?.role }),
  clearUserInfo: () => set({ userInfo: INITIAL_USER_INFO, isAuthenticated: false, role: false, tools: [] }),
  setLoadingz: () => {
    const loading = get().loadingz;
    set({ loadingz: !loading });
  }
}));

const getUserState = () => useUserState.getState();
export { useUserState, getUserState };
