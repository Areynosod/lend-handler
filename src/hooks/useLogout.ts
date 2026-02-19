import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { logOutFn } from '@/lib/supabase/auth'

export function useLogout() {
  const router = useRouter()

  return useMutation({
    mutationFn: () => logOutFn(),
    onSuccess: () => {
      router.navigate({ to: '/signin', replace: true })
    },
  })
}
