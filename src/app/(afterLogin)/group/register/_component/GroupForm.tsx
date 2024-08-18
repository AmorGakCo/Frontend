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
import { X } from 'lucide-react';
// const formSchema = z
//   .object({
//     name: z
//       .string()
//       .min(2, {
//         message: '그룹 이름은 최소 1글자 이상이어야 합니다.',
//       })
//       .max(10),
//     groupCapacity: z.string().superRefine((data, ctx) => {
//       if (1 > Number(data) || Number(data) > 12) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: '그룹 인원수는 1명에서 12명까지만 가능합니다.',
//         });
//       }
//     }),
//     address: z.string().min(10, {
//       message: '그룹 이름은 최소 10글자 이상이어야 합니다.',
//     }),
//     description: z
//       .string()
//       .min(5, { message: '그룹 설명은 최소 5글자 이상은 적어주세요.' })
//       .max(100, { message: '그룹 설명은 최소 100글자를 넘을 수는 없습니다.' }),
//     beginAt: z
//       .date()
//       .min(new Date(), { message: '현재 시간보다 과거에 만날 수는 없습니다.' }),
//     endAt: z
//       .date()
//       .min(new Date(), { message: '현재 시간보다 과거에 만날 수는 없습니다.' }),
//     isAgree: z.boolean()
//   }).superRefine((data, ctx) => {
//     if (!data.isAgree) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ['isAgree'],
//         message: '약관에 동의하셔야 그룹이 생성됩니다.',
//       });
//     }
//     if (data.endAt <= data.beginAt) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ['endAt'],
//         message: '종료일자는 시작일자보다 이후여야 합니다.',
//       });
//     }
//   });

export function GroupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      address: 'wqeqqeqweqw',
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>위치</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {}}
                        className="bg-white border-[#2990FF] border-[0.5px] hover:bg-slate-100 text-[#2990FF]"
                      >
                        장소 검색
                      </Button>
                    </DialogTrigger>
                    <DialogOverlay className='bg-white' />
                    <MapModal setAddress={field.onChange}/>
                  </Dialog>
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

  // interface groupInfo {
  //   name: string;
  //   description: string;
  //   groupCapacity: number;
  //   beginAt: Date;
  //   endAt: Date;
  //   address: string;
  //   isAgree?: boolean;
  // }

  // 2. Define a submit handler.
  // values: z.infer<typeof formSchema>
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // // Do something with the form values.
    // // ✅ This will be type-safe and validated.
    // const newValue: groupInfo = {
    //   ...values,
    //   groupCapacity: Number(values.groupCapacity),
    // };
    // delete newValue.isAgree;
    // console.log(newValue);
    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_LOCATION}/groups`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json', // JSON 데이터임을 명시
    //       },
    //       body: JSON.stringify(newValue), // 객체를 JSON 문자열로 변환하여 body에 전달
    //     }
    //   );

    //   // HTTP 상태 코드가 2xx 범위가 아닌 경우 오류로 처리
    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     console.error('HTTP error:', response.status, errorData);
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   // 정상적인 응답 처리
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   // 네트워크 오류나 기타 문제 처리
    //   console.error('Fetch error:', error);
    // }
    console.log(values);
  }
}
