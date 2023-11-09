import { z } from "zod";

// Validation rules
export const userValidationSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(2).trim(),
  email: z.string().email(),
  emailVerifiedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const authValidateSchema = z.object({
  email: z.string().min(1, { message: "Required" }),
  password: z.string().trim().min(6, { message: "Nhập ký tự lớn hơn 6" }),
});

export type User = z.infer<typeof userValidationSchema>;
export type Auth = z.infer<typeof authValidateSchema>;

export type UserInfo = {
  user: Auth;
  access_token: string;
};
