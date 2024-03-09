import { create } from "zustand";

const useModalStore = create<{
  content: React.ReactNode | null;
  showModal: (content: React.ReactNode | null) => void;
  hideModal: () => void;
}>((set) => ({
  content: null,
  showModal: (content: React.ReactNode | null) =>
    set((state) => ({ ...state, content })),
  hideModal: () => set((state) => ({ ...state, content: null })),
}));

export default useModalStore;
