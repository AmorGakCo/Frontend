'use client';

import { zodResolver } from '@hookform/resolvers/zod';

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
import { Checkbox } from '@/components/ui/checkbox';
import { formSchema } from '../_lib/GroupFormSchema';
import { DateTimePicker } from './time-picker/DateTimePicker';
import { groupCapacitys } from '../_lib/Constants';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import MapModal from './modal/MapModal';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';


export function GroupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      isAgree: false,
    },
  });
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressInfo"
          render={({ field}) => (
            <FormItem>
              <FormLabel>위치</FormLabel>
              <FormDescription>
                {field.value && (
                  <div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button className="flex gap-2 bg-white border-[#a7d1ff] border-[0.5px] px-2 py-1 hover:bg-slate-100 ">
                            <Image
                              width={24}
                              height={24}
                              style={{
                                filter:
                                  'opacity(.5) drop-shadow(0 0 0 #2990FF)',
                              }}
                              src="/distance.png"
                              alt="location"
                            />
                            <div className="text-[#2990FF]">
                              {field.value.content}
                            </div>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="p-4 flex flex-col gap-2">
                          <p>{field.value.address}</p>
                          <p>{field.value.content}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </FormDescription>
              <FormControl>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {}}
                      className="bg-white border-[#2990FF] border-[0.5px] hover:bg-slate-100 text-[#2990FF]"
                    >
                      장소 검색
                    </Button>
                  </DialogTrigger>
                  <DialogOverlay className="bg-white" />
                  <MapModal setAddressInfo={field.onChange} />
                </Dialog>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Address Field */}

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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beginAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">시작 시간</FormLabel>
              <DateTimePicker value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">종료 시간</FormLabel>
              <DateTimePicker value={field.value} onChange={field.onChange} />
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
              <FormDescription className="space-y-0 underline decoration-solid">
                Read our T&Cs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mb-[66px]">
          Submit
        </Button>
      </form>
    </Form>
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { 
      addressInfo: { address, latitude, longitude,...restAddressInfo }, 
      isAgree, 
      groupCapacity,
      ...restValues 
    } = values;
    
    const api_values = {
      ...restValues,
      address,
      latitude,
      longitude,
      groupCapacity: Number(groupCapacity),
    };
    
    console.log(api_values);
  }
}
