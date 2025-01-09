'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from '../_lib/InfoFormSchema';
import { z } from 'zod';

export function InfoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      smsNotificationSetting: true,
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-6 flex flex-col mt-6 px-6"
      >
        <FormField
          control={form.control}
          name="smsNotificationSetting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SMS 알림</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <Button onClick={() => field.onChange(true)} className='w-[148px]' variant={`${(field.value)? 'default':'outline'}`}>ON</Button>
                  <Button onClick={() => field.onChange(false)} className='w-[148px]' variant={`${(field.value)? 'outline':'default'}`}>OFF</Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github 주소 설정</FormLabel>
              <FormControl>
                <Input placeholder="github 주소를 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>전화번호</FormLabel>
              <FormControl>
                <Input placeholder="전화번호를 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-40">
          설정
        </Button>
      </form>
    </Form>
  );
}
function onSubmit(value: z.infer<typeof formSchema>) {
  console.log(value);
}
