import { FC, useRef } from 'react';
import { useTheme } from 'next-themes';
import emojies from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { UseFormReturn } from 'react-hook-form';
import { Paperclip, Send, Smile } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSchema } from '@/lib/validation';

interface Props {
  onSendMessage: (values: MessageSchema) => void;
  messageForm: UseFormReturn<MessageSchema>;
}
const Chat: FC<Props> = ({ onSendMessage, messageForm }) => {
  const { resolvedTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEmojiSelect = (emoji: string) => {
    const input = inputRef.current;
    if (!input) return;

    const text = messageForm.getValues('text');
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    const newText = text.slice(0, start) + emoji + text.slice(end);
    messageForm.setValue('text', newText);

    setTimeout(() => {
      input.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  return (
    <div className="flex flex-col justify-end z-40 min-h-[92vh]">
      {/* <ChatLoading /> */}

      {/* <MessageCard isReceived /> */}

      {/* <div className='w-full h-[88vh] flex items-center justify-center'>
				<div className='text-[100px] cursor-pointer' onClick={() => onSendMessage({ text: '✋' })}>
					✋
				</div>
			</div> */}

      <Form {...messageForm}>
        <form
          onSubmit={messageForm.handleSubmit(onSendMessage)}
          className="w-full flex relative"
        >
          <Button size="icon" type="button" variant="secondary">
            <Paperclip />
          </Button>
          <FormField
            control={messageForm.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="bg-secondary border-l border-l-muted-foreground border-r border-r-muted-foreground h-9"
                    placeholder="Type a message"
                    value={field.value}
                    onBlur={() => field.onBlur()}
                    onChange={e => field.onChange(e.target.value)}
                    ref={inputRef}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" type="button" variant="secondary">
                <Smile />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none rounded-md absolute right-6 bottom-0">
              <Picker
                data={emojies}
                theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                onEmojiSelect={(emoji: { native: string }) =>
                  handleEmojiSelect(emoji.native)
                }
              />
            </PopoverContent>
          </Popover>

          <Button type="submit" size="icon">
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Chat;
