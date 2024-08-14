'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format, isToday } from 'date-fns';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { TimePickerDemo } from './time-picker/time-picker-demo';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const formSchema = z.object({
  groupName: z
    .string()
    .min(2, {
      message: 'groupName must be at least 2 characters.',
    })
    .max(10),
  groupCapacity: z
    .number()
    .min(1, { message: 'groupCapacity must be at least 1 characters' })
    .max(12),
  address: z.string(),
  description: z
    .string()
    .min(5, { message: '최소 5글자 이상은 적어주세요.' })
    .max(100),
  beginAt: z
    .date()
    .min(new Date(), { message: '현재 시간보다 과거에 만날 수는 없습니다.' }),
  endAt: z.date(),
  isAgree: z.boolean(),
});

export function GroupForm() {
  // 1. Define your form.
  const MAX_CAPACITY = 10;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isAgree: false,
    },
  });
  const groupCapacitys: number[] = [];
  for (let i = 1; i <= MAX_CAPACITY; i++) {
    groupCapacitys.push(i);
  }
  const date = new Date();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-6 flex flex-col">
        <FormField
          control={form.control}
          name="groupName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>그룹명</FormLabel>
              <FormControl>
                <Input placeholder="그룹명을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groupCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>그룹 인원</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="인원 수를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {groupCapacitys.map((number) => (
                    <SelectItem key={number} value={`${number}`}>
                      {number}명
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>위치</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <Button className="bg-white border-[#2990FF] border-[0.5px] hover:bg-slate-100 text-[#2990FF]">
                    위치 설정
                  </Button>
                  <Button>위치 추천</Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>모임 설명</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="모임을 설명해주세요"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beginAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">시작 시간</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP HH:mm:ss')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date.getDate() < new Date().getDate()}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">종료 시간</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP HH:mm:ss')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date.getDate() < new Date().getDate()}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAgree"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-0.5">
              <div className="flex gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>I accept the terms</FormLabel>
              </div>
              <FormDescription className='space-y-0'>
                <div className="underline decoration-solid">Read our T&Cs</div>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className='mb-[66px]'>Submit</Button>
      </form>
    </Form>
  );
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
}
