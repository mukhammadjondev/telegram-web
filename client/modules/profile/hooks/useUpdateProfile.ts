import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { axiosClient } from '@/http/axios';
import { generateToken } from '@/lib/generate-token';
import { toast } from '@/hooks/use-toast';
import { ProfileSchema } from '@/lib/validation';

export const useUpdateProfile = () => {
  const { data: session, update } = useSession();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (body: ProfileSchema) => {
      const token = await generateToken(session?.currentUser?._id);

      return axiosClient
        .put('/user/profile', body, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => res.data);
    },
    onSuccess: () => {
      toast({ description: 'Profile updated successfully' });
      update();
    },
  });

  return { updateProfile: mutateAsync, isPending, isError };
};
