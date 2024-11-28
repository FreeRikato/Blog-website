import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string(),
  password: z.string().min(3),
  email: z.string().email(),
});

export const signinSchema = z.object({
  username: z.string(),
  password: z.string().min(3),
});

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
});

export type SignupType = z.infer<typeof signupSchema>;
export type SigninType = z.infer<typeof signinSchema>;
export type CreateBlogType = z.infer<typeof createBlogSchema>;
export type UpdateBlogType = z.infer<typeof updateBlogSchema>;
