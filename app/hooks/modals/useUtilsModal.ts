import { create } from 'zustand';

interface UtilsModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUtilsModal = create<UtilsModal>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUtilsModal;
