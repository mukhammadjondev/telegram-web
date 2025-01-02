'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { IUser } from '@/types';
import { useCurrentContact } from '@/hooks/use-current';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import Settings from './settings';

interface Props {
  contacts: IUser[];
}
const ContactList: FC<Props> = ({ contacts }) => {
  const router = useRouter();
  const { currentContact, onChangeCurrentContact } = useCurrentContact();

  const renderContact = (contact: IUser) => {
    const onChat = () => {
      if (currentContact?._id === contact._id) return;
      onChangeCurrentContact(contact);
      router.push(`/?chat=${contact._id}`);
    };

    return (
      <div
        className={cn(
          'flex justify-between items-center cursor-pointer hover:bg-secondary/50 p-2',
          currentContact?._id === contact._id && 'bg-secondary/50'
        )}
        onClick={onChat}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Avatar className="z-40">
              <AvatarImage
                src={contact.avatar}
                alt={contact.email}
                className="object-cover"
              />
              <AvatarFallback className="uppercase">
                {contact.email[0]}
              </AvatarFallback>
            </Avatar>
            <div className="size-3 bg-green-500 absolute rounded-full bottom-0 right-0 !z-50" />
          </div>

          <div>
            <h2 className="capitalize line-clamp-1 text-sm">
              {contact.email.split('@')[0]}
            </h2>
            <p className="text-xs line-clamp-1 text-muted-foreground">
              No message yet
            </p>
          </div>
        </div>

        <div className="self-end">
          <p className="text-xs text-muted-foreground">19:20 pm</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center bg-background pl-2 sticky top-0">
        <Settings />
        <div className="m-2 w-full">
          <Input className="bg-secondary" type="text" placeholder="Search..." />
        </div>
      </div>

      {contacts.length === 0 && (
        <div className="w-full h-[95vh] flex justify-center items-center text-center text-muted-foreground">
          <p>Contact list is empty</p>
        </div>
      )}

      {contacts.map(contact => (
        <div key={contact._id}>{renderContact(contact)}</div>
      ))}
    </>
  );
};

export default ContactList;
