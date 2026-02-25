import { Icon } from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { DashboardCard } from '@/features/dashboard/components/DashboardCard'

export const Dashboard = () => {
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
        <p>Total de dinero prestado:</p> <strong>$15,000</strong>
      </div>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <DashboardCard title="Pendientes" number={10} />
          <DashboardCard title="Próximos" number={5} />
          <DashboardCard title="Atrasados" number={3} />
        </div>
        <div className="mt-8">
          <div>
            <p className="text-lg">Mostrar:</p>
            <div className="flex flex-row gap-2 mt-2">
              <Button variant={'secondary'}>Todos</Button>
              <Button variant={'outline'}>Pendientes</Button>
              <Button variant={'outline'}>Próximos</Button>
              <Button variant={'outline'}>Atrasados</Button>
            </div>
          </div>
        </div>
        <div className="mt-8">
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
              </tr>
            </thead>
            <tbody>
              <tr className="border border-gray-300 hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Juan Pérez</td>
                <td className="border border-gray-300 px-4 py-2">$5,000</td>
                <td className="border border-gray-300 px-4 py-2">2024-01-15</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Pendiente
                  </span>
                </td>
              </tr>
              <tr className="border border-gray-300 hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  María García
                </td>
                <td className="border border-gray-300 px-4 py-2">$3,500</td>
                <td className="border border-gray-300 px-4 py-2">2024-02-10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Próximo
                  </span>
                </td>
              </tr>
              <tr className="border border-gray-300 hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  Carlos López
                </td>
                <td className="border border-gray-300 px-4 py-2">$2,000</td>
                <td className="border border-gray-300 px-4 py-2">2024-01-05</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                    Atrasado
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
