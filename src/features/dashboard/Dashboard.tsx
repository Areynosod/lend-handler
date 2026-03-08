import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DashboardCard } from '@/features/dashboard/components/DashboardCard'
import { mockLoans, mockDebtors, getDebtorFullName } from './data/mock'
import type { LoanStatus } from './data/types'
import { cn } from '@/lib/utils'

type Filter = 'todos' | LoanStatus

export const Dashboard = () => {
  const [filter, setFilter] = useState<Filter>('todos')
  const [search, setSearch] = useState('')

  const pendientes = mockLoans.filter((l) => l.status === 'pendiente').length
  const proximos = mockLoans.filter((l) => l.status === 'proximo').length
  const atrasados = mockLoans.filter((l) => l.status === 'atrasado').length

  const totalLoaned = mockLoans
    .filter((l) => l.status !== 'pagado')
    .reduce((sum, l) => sum + l.amount, 0)

  const filteredLoans = mockLoans.filter((loan) => {
    const matchesFilter = filter === 'todos' || loan.status === filter
    const debtor = mockDebtors.find((d) => d.id === loan.debtorId)
    const matchesSearch =
      search === '' ||
      (debtor &&
        getDebtorFullName(debtor).toLowerCase().includes(search.toLowerCase()))
    return matchesFilter && matchesSearch
  })

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
      <span className={cn('px-2 py-1 rounded text-xs font-medium', styles[status])}>
        {labels[status]}
      </span>
    )
  }

  const filterButtons: { label: string; value: Filter }[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Pendientes', value: 'pendiente' },
    { label: 'Próximos', value: 'proximo' },
    { label: 'Atrasados', value: 'atrasado' },
    { label: 'Pagados', value: 'pagado' },
  ]

  return (
    <div className="flex w-full max-w-7xl mx-auto flex-col gap-4 p-6">
      <header>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-2xl">Panel</p>
            <p className="text-sm font-medium text-gray-500">
              Manejador de prestamos
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Button variant={'outline'}>
              <Icon name="Plus" color="#000" />
              Agregar Deudor
            </Button>
            <Button>
              <Icon name="Plus" color="#fff" />
              Agregar Prestamo
            </Button>
          </div>
        </div>
      </header>
      <div className="flex justify-end">
        <p>Total de dinero prestado:</p>{' '}
        <strong>${totalLoaned.toLocaleString()}</strong>
      </div>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <DashboardCard title="Pendientes" number={pendientes} />
          <DashboardCard title="Próximos" number={proximos} />
          <DashboardCard title="Atrasados" number={atrasados} />
        </div>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <p className="text-lg">Mostrar:</p>
            <div className="flex flex-row gap-2 mt-2">
              {filterButtons.map((fb) => (
                <Button
                  key={fb.value}
                  variant={filter === fb.value ? 'secondary' : 'outline'}
                  onClick={() => setFilter(fb.value)}
                >
                  {fb.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="sm:ml-auto">
            <Input
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="hidden md:block">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Nombre
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Monto
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Fecha de Pago
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Estado
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-muted-foreground px-4 py-8 text-center"
                    >
                      No se encontraron préstamos.
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => {
                    const debtor = mockDebtors.find(
                      (d) => d.id === loan.debtorId,
                    )
                    return (
                      <tr
                        key={loan.id}
                        className="border border-gray-300 hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 px-4 py-2">
                          {debtor ? getDebtorFullName(debtor) : '—'}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          ${loan.amount.toLocaleString()}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {loan.dueDate}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {statusBadge(loan.status)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {debtor && (
                            <Button variant="ghost" size="sm" asChild>
                              <Link
                                to="/deudor/$debtorId"
                                params={{ debtorId: debtor.id }}
                              >
                                Ver detalles
                              </Link>
                            </Button>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex flex-col gap-3">
            {filteredLoans.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center">
                No se encontraron préstamos.
              </p>
            ) : (
              filteredLoans.map((loan) => {
                const debtor = mockDebtors.find(
                  (d) => d.id === loan.debtorId,
                )
                return (
                  <div key={loan.id} className="rounded-md border p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {debtor ? getDebtorFullName(debtor) : '—'}
                      </span>
                      {statusBadge(loan.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Monto: ${loan.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Fecha de pago: {loan.dueDate}
                    </p>
                    {debtor && (
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link
                          to="/deudor/$debtorId"
                          params={{ debtorId: debtor.id }}
                        >
                          Ver detalles
                        </Link>
                      </Button>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
