import { create } from 'zustand';

const useItemState = create((set, get) => ({
  item: {},
  setItem: (item) => set({ item })
}));

const getItemState = () => useItemState.getState();
export { useItemState, getItemState };
