import z from 'zod'
import { createServerFn } from '@tanstack/react-start'
import type { User } from '@supabase/supabase-js'
import { getSupabaseServerClient } from '@/lib/supabase/supabase'

export const getUserFn = createServerFn().handler(
  async (): Promise<{ user: User | null }> => {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data
  },
)
export const getUserRole = createServerFn().handler(
  async (): Promise<{ role: 'user' | 'admin' | 'super_admin' | null }> => {
    const supabase = getSupabaseServerClient()
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError
    if (!authData.user.id) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single()
    if (error) throw error
    return data
  },
)

export const logInFn = createServerFn()
  .inputValidator(
    z.object({
      email: z.email(),
      password: z.string().min(6),
    }),
  )
  .handler(async ({ data: { email, password } }) => {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.code === 'invalid_credentials') {
        throw new Error('Invalid email or password')
      }

      throw new Error(error.message)
    }

    return data
  })

export const logOutFn = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
    throw error
  }
})

export const signUpFn = createServerFn()
  .inputValidator(
    z.object({
      email: z.email(),
      password: z.string().min(6),
      options: z
        .object({
          data: z
            .object({
              first_name: z.string().optional(),
              last_name: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
    }),
  )
  .handler(async ({ data: { email, password, options } }) => {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options,
    })
    if (error) {
      throw new Error(error.message)
    }
    await logInFn({ data: { email, password } })
  })

export const getUserToken = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient()
  const token = await (
    await supabase.auth.getSession()
  ).data.session?.access_token
  return token
})

export const getLoggedInUser = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    throw new Error(error.message)
  }
  if (!data.user.id) {
    return null
  }
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()
  if (profileError) {
    throw new Error(profileError.message)
  }
  return profile
})
