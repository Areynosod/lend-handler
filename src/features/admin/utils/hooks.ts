import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Database } from '@/lib/supabase/database'
import {
  fetchProfiles,
  updateProfileRole,
} from '@/features/admin/utils/functions'

type UserRole = Database['public']['Enums']['user_role']

interface UseAdminProfilesOptions {
  search: string
  cursor: { created_at: string; id: string } | null
}

export function useAdminProfiles({ search, cursor }: UseAdminProfilesOptions) {
  return useQuery({
    queryKey: ['admin-profiles', { search, cursor }],
    queryFn: () => fetchProfiles({ data: { search, cursor, limit: 10 } }),
    staleTime: 1000 * 30,
    placeholderData: (prev) => prev,
  })
}

export function useUpdateProfileRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ profileId, role }: { profileId: string; role: UserRole }) =>
      updateProfileRole({ data: { profileId, role } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] })
    },
  })
}
