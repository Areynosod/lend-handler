import { Button } from '@/components/ui/button'
import { logOutFn } from '@/lib/supabase/auth'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/signin' })
    }
  },
})

function App() {
  const router = useRouter()
  const handleLogout = async () => {
    await logOutFn()
    router.navigate({ to: '/signin', replace: true })
  }
  return (
    <div className="flex h-screen w-full max-w-7xl mx-auto flex-col   gap-4">
      <div className="flex items-center justify-end gap-4">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <p>home screen</p>
    </div>
  )
}
