import { create } from 'zustand';

type Store = {
  step: 'login' | 'verify';
  onChangeStep: (step: 'login' | 'verify') => void;
  email: string;
  onChangeEmail: (email: string) => void;
};

export const useAuth = create<Store>()(set => ({
  step: 'login',
  onChangeStep: step => set({ step }),
  email: '',
  onChangeEmail: email => set({ email }),
}));
