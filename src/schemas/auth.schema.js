import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Se requiere nombre de usuario",
  }),
  fullname: z.string({
    required_error: "Se requiere nombre completo",
  }),
  password: z.string({
    required_error: "Se requiere contraseña",
  }).min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres"
  }),
});
