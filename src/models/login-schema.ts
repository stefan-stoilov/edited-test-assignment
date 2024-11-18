import { z } from "zod";

export const errorMessages = {
  username: "Please provide valid email address.",
  password: {
    minLength: "Password must be at least 6 characters long.",
    regex: "Password must contain at least one letter and one digit.",
  },
};

export const loginSchema = z.object({
  username: z.string().email(errorMessages.username),
  password: z
    .string()
    .min(6, errorMessages.password.minLength)
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/, errorMessages.password.regex),
  shouldRememberUser: z.boolean().default(false),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
