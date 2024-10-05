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
import { ControllerRenderProps } from 'react-hook-form';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const DateTimePicker = ({
  value,
  onChange,
}: {
  value: Date;
  onChange: (...event: any[]) => void;
}) => (
  <Popover>
    <FormControl>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP HH:mm:ss') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
    </FormControl>
    <FormMessage />
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={value}
        onSelect={onChange}
        disabled={(date) => date.getDate() < new Date().getDate()}
        initialFocus
      />
      <div className="p-3 border-t border-border">
        <TimePickerDemo setDate={onChange} date={value} />
      </div>
    </PopoverContent>
  </Popover>
);
