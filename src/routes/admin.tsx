import { useUserProfile } from '@/hooks/useUserProfile'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.role || context.role === 'user') {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  const { data: profile } = useUserProfile()

  return (
    <div>
      Hello "/admin"!{' '}
      {profile ? `Welcome, ${profile.first_name}` : 'Loading...'}
    </div>
  )
}
