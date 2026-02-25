import { Dashboard } from '@/features/dashboard/Dashboard'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/signin' })
    }
  },
})

function App() {
  return <Dashboard />
}
