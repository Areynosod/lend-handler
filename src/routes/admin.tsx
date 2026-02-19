import { createFileRoute, redirect } from '@tanstack/react-router'
import { AdminIndex } from '@/features/admin/AdminIndex'

export const Route = createFileRoute('/admin')({
  component: AdminIndex,
  beforeLoad: ({ context }) => {
    if (!context.role || context.role === 'user') {
      throw redirect({ to: '/' })
    }
  },
})
