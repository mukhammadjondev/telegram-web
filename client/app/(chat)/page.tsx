'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  EmailSchema,
  MessageSchema,
  emailSchema,
  messageSchema,
} from '@/lib/validation';
import { useCurrentContact } from '@/hooks/use-current';

import ContactList from './_components/contact-list';
import AddContact from './_components/add-contact';
import TopChat from './_components/top-chat';
import Chat from './_components/chat';

const HomePage = () => {
  const router = useRouter();
  const { currentContact } = useCurrentContact();

  const contactForm = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const messageForm = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: { text: '', image: '' },
  });

  useEffect(() => {
    router.replace('/');
  }, []);

  const onCreateContact = (values: EmailSchema) => {
    console.log(values);
  };

  const onSendMessage = (values: MessageSchema) => {
    console.log(values);
  };

  return (
    <>
      <div className="w-80 h-screen border-r fixed inset-0 z-50">
        {/* <div className='w-full h-[95vh] flex justify-center items-center'>
					<Loader2 size={50} className='animate-spin' />
				</div> */}

        <ContactList contacts={contacts} />
      </div>
      <div className="pl-80 w-full">
        {!currentContact?._id && (
          <AddContact
            contactForm={contactForm}
            onCreateContact={onCreateContact}
          />
        )}

        {currentContact?._id && (
          <div className="w-full relative">
            <TopChat messages={[]} />
            <Chat messageForm={messageForm} onSendMessage={onSendMessage} />
          </div>
        )}
      </div>
    </>
  );
};

const contacts = [
  {
    email: 'john@gmail.com',
    _id: '1',
    avatar: 'https://github.com/shadcn.png',
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis repellat blanditiis hic reiciendis quibusdam voluptatem necessitatibus, minus sint maxime iste impedit cupiditate ab provident doloremque sed dicta, molestias nemo cum.',
  },
  { email: 'amile@gmail.com', _id: '2' },
  { email: 'faris@gmail.com', _id: '3' },
  { email: 'abdo@gmail.com', _id: '4' },
  { email: 'billi@gmail.com', _id: '5' },
];

export default HomePage;
