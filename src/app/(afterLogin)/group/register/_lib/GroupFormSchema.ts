import { z } from "zod";

export const formSchema = z
.object({
  name: z
    .string()
    .min(2, {
      message: '그룹 이름은 최소 1글자 이상이어야 합니다.',
    })
    .max(10),
  groupCapacity: z.string().superRefine((data, ctx) => {
    if (1 > Number(data) || Number(data) > 12) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '그룹 인원수는 1명에서 12명까지만 가능합니다.',
      });
    }
  }),
  addressInfo: z.object({
    latitude: z.number(),         // 위도는 숫자 타입
    longitude: z.number(),         // 경도는 숫자 타입
    address: z.string(),     // 주소는 문자열 타입
    content: z.string(),     // 주소는 문자열 타입
  }),
  description: z
    .string()
    .min(5, { message: '그룹 설명은 최소 5글자 이상은 적어주세요.' })
    .max(100, { message: '그룹 설명은 최소 100글자를 넘을 수는 없습니다.' }),
  beginAt: z
    .date()
    .min(new Date(), { message: '현재 시간보다 과거에 만날 수는 없습니다.' }),
  endAt: z
    .date()
    .min(new Date(), { message: '현재 시간보다 과거에 만날 수는 없습니다.' }),
  isAgree: z.boolean()
}).superRefine((data, ctx) => {
  if (!data.isAgree) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['isAgree'],
      message: '약관에 동의하셔야 그룹이 생성됩니다.',
    });
  }
  if (data.endAt <= data.beginAt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['endAt'],
      message: '종료일자는 시작일자보다 이후여야 합니다.',
    });
  }
});