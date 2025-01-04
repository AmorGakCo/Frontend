import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TimePickerDemo } from './time-picker-demo';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useState } from 'react';
import dayjs from 'dayjs';

export const DateTimePicker = ({
  value,
  onChange,
}: {
  value: Date;
  onChange: (...event: any[]) => void;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [open, setOpen] = useState(true);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <FormControl>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, 'PPP HH:mm:ss') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
      </FormControl>
      <FormMessage />
      <PopoverContent
        align="center"
        collisionPadding={0}
        className="w-auto p-0 max-h-[calc(100vh-20px)]"
      >
        <Carousel
          orientation={'horizontal'}
          draggable={false}
          setApi={setApi}
          className="w-full max-w-xs"
          opts = {{
            startIndex: value? 1: 0,
            duration:15
          }}
        >
          <CarouselContent>
            <CarouselItem key={0} className="w-full flex justify-center">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(e) => {
                  onChange(e);
                  api?.scrollNext();
                }}
                disabled={(date) => date.getDate() < new Date().getDate()}
                initialFocus
              />
            </CarouselItem>
            <CarouselItem key={1}>
              <div className="w-full relative h-full flex flex-col gap-4 items-center justify-center">
                <div
                  className="absolute top-8 left-8 w-8 h-8 rounded-full"
                  onClick={() => {
                    api?.scrollPrev();
                  }}
                >
                  <Image
                    width={6}
                    height={12}
                    alt="뒤로가기"
                    src="/back.png"
                    className="cursor-pointer"
                  />
                </div>
                <div className="font-semibold">
                  {dayjs(value).format('YYYY년 MM월 DD일')}
                </div>
                <TimePickerDemo setDate={onChange} date={value} />
                <Button
                  className="mt-4 w-1/2"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  확인
                </Button>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </PopoverContent>
    </Popover>
  );
};
