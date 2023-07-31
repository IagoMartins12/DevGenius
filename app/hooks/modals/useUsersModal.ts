import { User } from '@prisma/client';
import { create } from 'zustand';

interface userModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isCurrentUser: boolean;
  currentData: User[] | undefined;
  setCurrentData: (data: User[] | undefined) => void;
  setNotIsCurrentUser: () => void;
  setIsCurrentUser: () => void;
  removeFollowers: boolean;
  setRemoveFollowers: () => void;
  setNotRemoveFollowers: () => void;
}

const useUsersModal = create<userModal>(set => ({
  currentData: undefined,
  isOpen: false,
  isCurrentUser: false,
  setNotIsCurrentUser: () => set({ isCurrentUser: false }),
  setIsCurrentUser: () => set({ isCurrentUser: true }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setCurrentData: (data: User[] | undefined) => set({ currentData: data }),
  removeFollowers: false,
  setRemoveFollowers: () => set({ removeFollowers: false }),
  setNotRemoveFollowers: () => set({ removeFollowers: true }),
}));

export default useUsersModal;
