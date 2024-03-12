import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "le nom d'utilisateur doit comporter au moins 3 caractères"),
  email: z.string().email("l'email n'est pas valide"),
  password: z
    .string()
    .min(11, "le mot de passe doit comporter au moins 11 caractères"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("l'email n'est pas valide"),
});

export const verifyTokenSchema = z.object({
  token: z.string(),
});

export const verifyNewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(11, "le mot de passe doit comporter au moins 11 caractères"),
    confirmNewPassword: z
      .string()
      .min(11, "le mot de passe doit comporter au moins 11 caractères"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "les mots de passe ne sont pas identiques",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z
    .string()
    .min(11, "le mot de passe doit comporter au moins 11 caractères"),
});
