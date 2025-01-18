import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '@/http/axios';

export const useSignIn = () => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (email: string) =>
      await axiosClient
        .post<{ email: string }>('/auth/login', { email })
        .then(res => res.data),
  });

  return { signIn: mutateAsync, isPending, isError };
};
