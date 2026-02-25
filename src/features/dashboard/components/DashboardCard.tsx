interface DashboardCardProps {
  title: string
  number: number
}
export const DashboardCard = ({ title, number }: DashboardCardProps) => {
  return (
    <div className="border border-gray-400 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-3xl font-bold text-gray-900 mt-2">{number}</p>
    </div>
  )
}
