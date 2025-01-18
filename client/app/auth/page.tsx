import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { FaTelegram } from 'react-icons/fa';
import { authOptions } from '@/lib/auth-options';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { Social } from './_components/social';
import StateAuth from './_components/state';

export default async function AuthPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  return (
    <div className="container max-w-md w-full h-screen flex justify-center items-center flex-col space-y-4">
      <FaTelegram size={120} className="text-blue-500" />
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold">Telegram</h1>
        <ModeToggle />
      </div>
      <StateAuth />
      <Social />
    </div>
  );
}
