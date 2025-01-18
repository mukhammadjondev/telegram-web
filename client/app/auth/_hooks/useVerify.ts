import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '@/http/axios';
import { IUser } from '@/types';

export const useVerify = () => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (body: { email: string; otp: string }) =>
      await axiosClient
        .post<{ user: IUser }>('/auth/verify', body)
        .then(res => res.data),
  });

  return { verify: mutateAsync, isPending, isError };
};
