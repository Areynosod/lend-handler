import z from 'zod'

export const signUpSchema = z
  .object({
    first_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    last_name: z
      .string()
      .min(2, 'El apellido debe tener al menos 2 caracteres'),
    email: z.email().min(1, 'El correo electrónico es obligatorio'),
    password: z
      .string()
      .min(1, 'La contraseña es obligatoria')
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Por favor, confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })
