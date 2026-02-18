import { Icon } from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpSchema } from '@/features/auth/signup/signup-schema'
import { signUpFn } from '@/lib/supabase/auth'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export default function SignUpForm() {
  const router = useRouter()
  const [signUpError, setSignUpError] = useState<string | null>(null)

  const signUpMutation = useMutation({
    mutationFn: async (data: {
      email: string
      password: string
      first_name?: string
      last_name?: string
    }) => {
      return await signUpFn({
        data: {
          email: data.email,
          password: data.password,
          options: {
            data: {
              first_name: data.first_name,
              last_name: data.last_name,
            },
          },
        },
      })
    },
    onSuccess: () => {
      setSignUpError(null)
      router.navigate({ to: '/', replace: true })
    },
    onError: (error: Error) => {
      setSignUpError(error.message)
    },
  })

  const form = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      signUpMutation.mutate(value)
    },
  })
  return (
    <div className="w-full max-w-md space-y-8 mx-auto p-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <Icon name="HandCoins" size={40} color="#2d2d2d" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Completa la información para empezar
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
          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="first_name"
              validators={{
                onChange: ({ value }) => {
                  if (!value || value === '') return undefined
                  return signUpSchema.shape.first_name.safeParse(value).success
                    ? undefined
                    : signUpSchema.shape.first_name.safeParse(value).error
                        ?.issues[0]?.message
                },
              }}
            >
              {(field) => (
                <div>
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Nombre
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Tu nombre"
                    autoComplete="given-name"
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
              name="last_name"
              validators={{
                onChange: ({ value }) => {
                  if (!value || value === '') return undefined
                  return signUpSchema.shape.last_name.safeParse(value).success
                    ? undefined
                    : signUpSchema.shape.last_name.safeParse(value).error
                        ?.issues[0]?.message
                },
              }}
            >
              {(field) => (
                <div>
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Apellido
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Tu apellido"
                    autoComplete="family-name"
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

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                signUpSchema.shape.email.safeParse(value).success
                  ? undefined
                  : signUpSchema.shape.email.safeParse(value).error?.issues[0]
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
                signUpSchema.shape.password.safeParse(value).success
                  ? undefined
                  : signUpSchema.shape.password.safeParse(value).error
                      ?.issues[0]?.message,
            }}
          >
            {(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Contraseña
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="Crea una contraseña"
                  autoComplete="new-password"
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
            name="confirmPassword"
            validators={{
              onChangeListenTo: ['password'],
              onChange: ({ value, fieldApi }) => {
                const password = fieldApi.form.getFieldValue('password')
                const result = signUpSchema.safeParse({
                  first_name: '',
                  last_name: '',
                  email: 'test@test.com',
                  password: password,
                  confirmPassword: value,
                })
                if (!result.success) {
                  const error = result.error.issues.find(
                    (issue) => issue.path[0] === 'confirmPassword',
                  )
                  return error?.message
                }
                return undefined
              },
            }}
          >
            {(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Confirmar contraseña
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="Confirma tu contraseña"
                  autoComplete="new-password"
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

        {signUpError && (
          <div className="flex justify-center">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              {signUpError}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <Button
                type="submit"
                className="w-full h-11 text-base font-bold shadow-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                disabled={isSubmitting || signUpMutation.isPending}
              >
                {isSubmitting || signUpMutation.isPending
                  ? 'Creando cuenta...'
                  : 'Crear cuenta'}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        ¿Ya tienes una cuenta?{' '}
        <Link
          to="/signin"
          className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}
