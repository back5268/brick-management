import { create } from 'zustand';

const useDataState = create((set, get) => ({
  accounts: [],
  departments: [],
  setAccounts: (accounts) => set({ accounts }),
  setDepartments: (departments) => set({ departments })
}));

const getDataState = () => useDataState.getState();
export { useDataState, getDataState };
