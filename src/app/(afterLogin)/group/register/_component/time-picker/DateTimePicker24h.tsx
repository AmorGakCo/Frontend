'use client';
import { zodResolver } from '@hookform/resolvers/zod';
// import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';
// import { toast } from "sonner";

export function DateTimePicker24h({
  value,
  onChange,
}: {
  value: Date;
  onChange: (...event: any[]) => void;
}) {
  function handleDateSelect(date: Date | undefined) {
    if (date) {
      onChange(date);
    }
  }

  function handleTimeChange(type: 'hour' | 'minute', timeValue: string) {
    const currentDate = value || new Date();
    let newDate = new Date(currentDate);

    if (type === 'hour') {
      const hour = parseInt(timeValue, 10);
      newDate.setHours(hour);
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(timeValue, 10));
    }
    onChange(newDate);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            {value ? (
              format(value, 'MM/dd/yyyy HH:mm')
            ) : (
              <span>MM/DD/YYYY HH:mm</span>
            )}
            <Clock className="ml-auto h-4 w-4" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <FormMessage />

      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 24 }, (_, i) => i)
                  .reverse()
                  .map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        value && value.getHours() === hour ? 'default' : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange('hour', hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      value && value.getMinutes() === minute
                        ? 'default'
                        : 'ghost'
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() =>
                      handleTimeChange('minute', minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
