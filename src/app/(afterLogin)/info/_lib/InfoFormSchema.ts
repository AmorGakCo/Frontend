import { z } from "zod";


const githubUrlRegex = /^https:\/\/github\.com\/[a-zA-Z0-9-_]+(\/[a-zA-Z0-9-_]+)?$/;
const phoneNumberRegex = /^010-?\d{4}-?\d{4}$/; // 한국 010 번호 형식

export const formSchema = z
.object({
  latitude: z.number(),
  longitude: z.number(),
  smsNotificationSetting: z
    .boolean(),
  githubUrl:  z
  .string()
  .url("유효한 URL 형식이 아닙니다.")
  .regex(githubUrlRegex, "올바른 GitHub URL을 입력해주세요. 예: https://github.com/username 또는 https://github.com/username/repo"),
  phoneNumber: z
    .string()
    .regex(phoneNumberRegex, "유효한 전화번호를 입력해주세요. 예: 010-1234-5678 또는 01012345678"),
});