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
