import { Icon } from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInSchema } from '@/features/auth/signin/signin-schema'
import { logInFn } from '@/lib/supabase/auth'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export default function SignInForm() {
  const router = useRouter()
  const [signInError, setSignInError] = useState<string | null>(null)

  const signInMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return await logInFn({ data })
    },
    onSuccess: () => {
      setSignInError(null)
      router.navigate({ to: '/', replace: true })
    },
    onError: (error: Error) => {
      setSignInError(error.message)
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      signInMutation.mutate(value)
    },
  })
  return (
    <div className="w-full max-w-md space-y-8 mx-auto p-8 ">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <Icon name="HandCoins" size={40} color="#2d2d2d" />
        </div>
        <h2 className="text-3xl italic font-bold text-slate-900 dark:text-white">
          Manejador de Préstamos
        </h2>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Inicia sesión en tu cuenta
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          ¡Bienvenido de nuevo! Por favor, ingresa tus datos para ingresar al
          <span className="font-semibold"> Manejador de Préstamos</span>.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                signInSchema.shape.email.safeParse(value).success
                  ? undefined
                  : signInSchema.shape.email.safeParse(value).error?.issues[0]
                      ?.message,
            }}
          >
            {(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Correo electrónico
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  autoComplete="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1"
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                signInSchema.shape.password.safeParse(value).success
                  ? undefined
                  : signInSchema.shape.password.safeParse(value).error
                      ?.issues[0]?.message,
            }}
          >
            {(field) => (
              <div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Contraseña
                  </Label>
                  <Link
                    to="/"
                    className="text-sm font-medium  transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1"
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        </div>

        {signInError && (
          <div className="flex justify-center">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              {signInError}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <Button
                type="submit"
                className="w-full h-11 text-base font-bold shadow-lg "
                disabled={isSubmitting || signInMutation.isPending}
              >
                {isSubmitting || signInMutation.isPending
                  ? 'Iniciando sesión...'
                  : 'Iniciar sesión'}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        ¿No tienes una cuenta?{' '}
        <Link to="/signup" className="font-semibold ">
          Regístrate gratis
        </Link>
      </p>
    </div>
  )
}
