import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '@/lib/supabase/supabase'

export const fetchProfiles = createServerFn()
  .inputValidator(
    z.object({
      search: z.string().optional().default(''),
      cursor: z
        .object({
          created_at: z.string(),
          id: z.string(),
        })
        .nullable()
        .optional()
        .default(null),
      limit: z.number().min(1).max(100).default(10),
    }),
  )
  .handler(async ({ data: { search, cursor, limit } }) => {
    const supabase = getSupabaseServerClient()

    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true })
      .order('id', { ascending: true })
      .limit(limit + 1)

    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`,
      )
    }

    if (cursor) {
      query = query.or(
        `created_at.gt.${cursor.created_at},and(created_at.eq.${cursor.created_at},id.gt.${cursor.id})`,
      )
    }

    const { data, error } = await query

    if (error) throw error

    const hasNextPage = data.length > limit
    const profiles = hasNextPage ? data.slice(0, limit) : data
    const nextCursor =
      hasNextPage && profiles.length > 0
        ? {
            created_at: profiles[profiles.length - 1].created_at!,
            id: profiles[profiles.length - 1].id,
          }
        : null

    return { profiles, nextCursor, hasNextPage }
  })

export const updateProfileRole = createServerFn()
  .inputValidator(
    z.object({
      profileId: z.string().uuid(),
      role: z.enum(['user', 'admin', 'super_admin']),
    }),
  )
  .handler(async ({ data: { profileId, role } }) => {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', profileId)
      .select()
      .single()

    if (error) throw error
    return data
  })
