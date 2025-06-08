import { create } from 'zustand';

const initState = {
  severity: '',
  title: '',
  subTitle: '',
  duration: 3000
};

const useToastState = create((set, get) => ({
  toastInfo: initState,
  show: false,
  showToast: (toastInfo) => set({ toastInfo, show: true }),
  hideToast: () => set({ toastInfo: initState, show: false })
}));

const getToastState = () => useToastState.getState();
export { useToastState, getToastState };
