import { IMessage, IUser } from '@/types';
import { create } from 'zustand';

type Store = {
  currentContact: IUser | null;
  onChangeCurrentContact: (contact: IUser | null) => void;
  editedMessage: IMessage | null;
  onChangeEditedMessage: (message: IMessage | null) => void;
};

export const useCurrentContact = create<Store>()(set => ({
  currentContact: null,
  onChangeCurrentContact: contact => set({ currentContact: contact }),
  editedMessage: null,
  onChangeEditedMessage: message => set({ editedMessage: message }),
}));
