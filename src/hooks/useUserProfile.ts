import { useQuery } from '@tanstack/react-query'
import type { Tables } from '@/lib/supabase/database'
import { getLoggedInUser } from '@/lib/supabase/auth'

type Profile = Tables<'profiles'>

interface UseUserProfileOptions {
  enabled?: boolean
}

export function useUserProfile(options?: UseUserProfileOptions) {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: async (): Promise<Profile | null> => {
      const profile = await getLoggedInUser()
      return profile
    },
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
