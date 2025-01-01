import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/hooks/use-auth';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { emailSchema, type EmailSchema } from '@/lib/validation';

const SignIn = () => {
  const { onChangeEmail, onChangeStep } = useAuth();

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(values: EmailSchema) {
    console.log(values)
  }

  return (
    <div className="w-full">
      <p className="text-center text-muted-foreground text-sm">
        Telegram is a messaging app with a focus on speed and security, it’s
        super-fast, simple and free.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input
                    placeholder="info@gmail.com"
                    // disabled={isPending}
                    className="h-10 bg-secondary"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            size="lg"
            // disabled={isPending}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
