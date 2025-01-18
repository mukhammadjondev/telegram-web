import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';

import { useUpdateProfile } from '@/modules/profile/hooks/useUpdateProfile';
import { ProfileSchema, profileSchema } from '@/lib/validation';
import { Form } from '../ui/form';
import { TextAreaField, TextField } from '../fields';
import { LoadingButton } from '../loading-button';

const InformationForm = () => {
  const { data: session } = useSession();
  const { updateProfile, isPending } = useUpdateProfile();

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: session?.currentUser?.firstName || '',
      lastName: session?.currentUser?.lastName || '',
      bio: session?.currentUser?.bio || '',
    },
  });

  const onSubmit = (values: ProfileSchema) => {
    updateProfile(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <TextField
          name="firstName"
          label="First name"
          placeholder="Osman"
          className="bg-secondary"
        />
        <TextField
          name="lastName"
          label="Last name"
          placeholder="Ali"
          className="bg-secondary"
        />
        <TextAreaField
          name="bio"
          label="Bio"
          placeholder="Enter anyhting about yourself"
          className="bg-secondary"
        />
        <LoadingButton className="w-full" isLoading={isPending}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
};

export default InformationForm;
