import { Link } from '@tanstack/react-router'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/ui/button'
import {
  getDebtorById,
  getLoansByDebtorId,
  getDebtorFullName,
} from '@/features/dashboard/data/mock'
import type { LoanStatus } from '@/features/dashboard/data/types'
import { cn } from '@/lib/utils'

interface DebtorDetailProps {
  debtorId: string
}

export function DebtorDetail({ debtorId }: DebtorDetailProps) {
  const debtor = getDebtorById(debtorId)
  const loans = getLoansByDebtorId(debtorId)

  if (!debtor) {
    return (
      <div className="flex w-full max-w-7xl mx-auto flex-col items-center gap-4 p-6">
        <p className="text-lg text-muted-foreground">Deudor no encontrado.</p>
        <Button variant="outline" asChild>
          <Link to="/">Volver al panel</Link>
        </Button>
      </div>
    )
  }

  const totalDebt = loans
    .filter((l) => l.status !== 'pagado')
    .reduce((sum, l) => sum + l.amount, 0)

  const totalPaid = loans
    .filter((l) => l.status === 'pagado')
    .reduce((sum, l) => sum + l.amount, 0)

  const statusBadge = (status: LoanStatus) => {
    const styles: Record<LoanStatus, string> = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      proximo: 'bg-blue-100 text-blue-800',
      atrasado: 'bg-red-100 text-red-800',
      pagado: 'bg-green-100 text-green-800',
    }
    const labels: Record<LoanStatus, string> = {
      pendiente: 'Pendiente',
      proximo: 'Próximo',
      atrasado: 'Atrasado',
      pagado: 'Pagado',
    }
    return (
      <span
        className={cn(
          'px-2 py-1 rounded text-xs font-medium',
          styles[status],
        )}
      >
        {labels[status]}
      </span>
    )
  }

  return (
    <div className="flex w-full max-w-7xl mx-auto flex-col gap-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <Icon name="ArrowLeft" size={18} color="#000" />
            Volver
          </Link>
        </Button>
      </div>

      <header>
        <h1 className="text-2xl font-semibold">
          {getDebtorFullName(debtor)}
        </h1>
        <p className="text-sm text-muted-foreground">Detalles del deudor</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-gray-400 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Correo</p>
          <p className="font-medium">{debtor.email}</p>
        </div>
        <div className="border border-gray-400 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Teléfono</p>
          <p className="font-medium">{debtor.phone}</p>
        </div>
        <div className="border border-gray-400 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Deuda activa</p>
          <p className="text-xl font-bold">${totalDebt.toLocaleString()}</p>
        </div>
        <div className="border border-gray-400 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total pagado</p>
          <p className="text-xl font-bold text-green-700">
            ${totalPaid.toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Préstamos ({loans.length})
        </h2>

        <div className="hidden md:block">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Monto
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Fecha de Pago
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Creado
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Estado
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Notas
                </th>
              </tr>
            </thead>
            <tbody>
              {loans.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-muted-foreground px-4 py-8 text-center"
                  >
                    No tiene préstamos registrados.
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="border border-gray-300 hover:bg-gray-50"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      ${loan.amount.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {loan.dueDate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {loan.createdAt}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {statusBadge(loan.status)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-muted-foreground">
                      {loan.notes}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden flex flex-col gap-3">
          {loans.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No tiene préstamos registrados.
            </p>
          ) : (
            loans.map((loan) => (
              <div key={loan.id} className="rounded-md border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    ${loan.amount.toLocaleString()}
                  </span>
                  {statusBadge(loan.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Fecha de pago: {loan.dueDate}
                </p>
                <p className="text-sm text-muted-foreground">
                  Creado: {loan.createdAt}
                </p>
                <p className="text-sm text-muted-foreground">{loan.notes}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
