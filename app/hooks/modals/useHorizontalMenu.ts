import { create } from 'zustand';

interface HorizontalMenu {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useHorizontalMenu = create<HorizontalMenu>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useHorizontalMenu;
