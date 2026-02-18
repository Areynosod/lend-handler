import z from 'zod'

export const signInSchema = z.object({
  email: z.email().min(1, 'El correo electrónico es obligatorio'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
})
