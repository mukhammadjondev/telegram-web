import { useState } from 'react';
import { ChevronDown, PlayCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SOUNDS } from '@/lib/constants';
import useAudio from '@/hooks/use-audio';

import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const NotificationForm = () => {
  const [isNotification, setIsNotification] = useState(false);
  const [isSounding, setIsSounding] = useState(false);
  const [selectedSound, setSelectedSound] = useState('');

  const { playSound } = useAudio();

  const onPlaySound = (value: string) => {
    setSelectedSound(value);
    playSound(value);
  };

  return (
    <>
      <div className="flex items-center justify-between relative">
        <div className="flex flex-col">
          <p>Notification Sound</p>
          <p className="text-muted-foreground text-xs">
            {/* {getSoundLabel(session?.currentUser?.notificationSound)} */}
          </p>
        </div>

        <Popover open={isNotification} onOpenChange={setIsNotification}>
          <PopoverTrigger asChild>
            <Button size={'sm'}>
              Select <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 absolute -right-12">
            <div className="flex flex-col space-y-1">
              {SOUNDS.map(sound => (
                <div
                  className={cn(
                    'flex justify-between items-center bg-secondary cursor-pointer hover:bg-primary-foreground',
                    selectedSound === sound.value && 'bg-primary-foreground'
                  )}
                  key={sound.label}
                  onClick={() => onPlaySound(sound.value)}
                >
                  <Button
                    size={'sm'}
                    variant={'ghost'}
                    className="justify-start"
                  >
                    {sound.label}
                  </Button>
                  {/* {session?.currentUser?.notificationSound === sound.value ? (
                    <Button size='icon'>
                      <Ghost />
                    </Button>
                  ) : ( */}
                  <Button size="icon" variant="ghost">
                    <PlayCircle />
                  </Button>
                  {/* )} */}
                </div>
              ))}
            </div>
            <Button className="w-full mt-2 font-bold">Submit</Button>
          </PopoverContent>
        </Popover>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between relative">
        <div className="flex flex-col">
          <p>Sending Sound</p>
          <p className="text-muted-foreground text-xs">
            {/* {getSoundLabel(session?.currentUser?.sendingSound)} */}
          </p>
        </div>

        <Popover open={isSounding} onOpenChange={setIsSounding}>
          <PopoverTrigger asChild>
            <Button size={'sm'}>
              Select <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 absolute -right-12">
            <div className="flex flex-col space-y-1">
              {SOUNDS.map(sound => (
                <div
                  className={cn(
                    'flex justify-between items-center bg-secondary cursor-pointer hover:bg-primary-foreground',
                    selectedSound === sound.value && 'bg-primary-foreground'
                  )}
                  key={sound.label}
                  onClick={() => onPlaySound(sound.value)}
                >
                  <Button size="sm" variant="ghost" className="justify-start">
                    {sound.label}
                  </Button>
                  {/* {session?.currentUser?.sendingSound === sound.value ? (
                    <Button size="icon">
                      <Ghost />
                    </Button>
                  ) : ( */}
                  <Button size="icon" variant="ghost">
                    <PlayCircle />
                  </Button>
                  {/* )} */}
                </div>
              ))}
            </div>
            <Button className="w-full mt-2 font-bold">Submit</Button>
          </PopoverContent>
        </Popover>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between relative">
        <div className="flex flex-col">
          <p>Mode Mute</p>
          <p className="text-muted-foreground text-xs">
            Muted
            {/* {!session?.currentUser?.muted ? 'Muted' : 'Unmuted'} */}
          </p>
        </div>
        <Switch />
      </div>
    </>
  );
};

export default NotificationForm;
