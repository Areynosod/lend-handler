import { createFileRoute, redirect } from '@tanstack/react-router'
import { DebtorDetail } from '@/features/debtor/DebtorDetail'

export const Route = createFileRoute('/deudor/$debtorId')({
  component: DebtorPage,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/signin' })
    }
  },
})

function DebtorPage() {
  const { debtorId } = Route.useParams()
  return <DebtorDetail debtorId={debtorId} />
}
