import type { Debtor, Loan } from './types'

export const mockDebtors: Debtor[] = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@email.com',
    phone: '809-555-0101',
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'García',
    email: 'maria.garcia@email.com',
    phone: '809-555-0102',
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'López',
    email: 'carlos.lopez@email.com',
    phone: '809-555-0103',
  },
  {
    id: '4',
    firstName: 'Ana',
    lastName: 'Martínez',
    email: 'ana.martinez@email.com',
    phone: '809-555-0104',
  },
  {
    id: '5',
    firstName: 'Pedro',
    lastName: 'Rodríguez',
    email: 'pedro.rodriguez@email.com',
    phone: '809-555-0105',
  },
  {
    id: '6',
    firstName: 'Laura',
    lastName: 'Fernández',
    email: 'laura.fernandez@email.com',
    phone: '809-555-0106',
  },
  {
    id: '7',
    firstName: 'Miguel',
    lastName: 'Sánchez',
    email: 'miguel.sanchez@email.com',
    phone: '809-555-0107',
  },
  {
    id: '8',
    firstName: 'Sofía',
    lastName: 'Ramírez',
    email: 'sofia.ramirez@email.com',
    phone: '809-555-0108',
  },
  {
    id: '9',
    firstName: 'Diego',
    lastName: 'Torres',
    email: 'diego.torres@email.com',
    phone: '809-555-0109',
  },
  {
    id: '10',
    firstName: 'Carmen',
    lastName: 'Díaz',
    email: 'carmen.diaz@email.com',
    phone: '809-555-0110',
  },
]

export const mockLoans: Loan[] = [
  {
    id: 'L1',
    debtorId: '1',
    amount: 5000,
    dueDate: '2024-01-15',
    status: 'pendiente',
    createdAt: '2023-12-01',
    notes: 'Préstamo personal',
  },
  {
    id: 'L2',
    debtorId: '2',
    amount: 3500,
    dueDate: '2024-02-10',
    status: 'proximo',
    createdAt: '2024-01-05',
    notes: 'Préstamo para negocio',
  },
  {
    id: 'L3',
    debtorId: '3',
    amount: 2000,
    dueDate: '2024-01-05',
    status: 'atrasado',
    createdAt: '2023-11-20',
    notes: 'Préstamo de emergencia',
  },
  {
    id: 'L4',
    debtorId: '4',
    amount: 8000,
    dueDate: '2024-03-20',
    status: 'pendiente',
    createdAt: '2024-01-10',
    notes: 'Préstamo para vehículo',
  },
  {
    id: 'L5',
    debtorId: '5',
    amount: 1500,
    dueDate: '2024-02-28',
    status: 'proximo',
    createdAt: '2024-01-15',
    notes: 'Préstamo educativo',
  },
  {
    id: 'L6',
    debtorId: '6',
    amount: 12000,
    dueDate: '2024-01-02',
    status: 'atrasado',
    createdAt: '2023-10-15',
    notes: 'Préstamo para remodelación',
  },
  {
    id: 'L7',
    debtorId: '7',
    amount: 4500,
    dueDate: '2024-04-01',
    status: 'pendiente',
    createdAt: '2024-02-01',
    notes: 'Préstamo personal',
  },
  {
    id: 'L8',
    debtorId: '8',
    amount: 6000,
    dueDate: '2024-01-10',
    status: 'atrasado',
    createdAt: '2023-11-01',
    notes: 'Préstamo para equipo médico',
  },
  {
    id: 'L9',
    debtorId: '9',
    amount: 2500,
    dueDate: '2024-03-15',
    status: 'proximo',
    createdAt: '2024-01-20',
    notes: 'Préstamo para inventario',
  },
  {
    id: 'L10',
    debtorId: '10',
    amount: 7500,
    dueDate: '2024-05-01',
    status: 'pendiente',
    createdAt: '2024-02-10',
    notes: 'Préstamo para vivienda',
  },
  {
    id: 'L11',
    debtorId: '1',
    amount: 3000,
    dueDate: '2024-06-01',
    status: 'pendiente',
    createdAt: '2024-03-01',
    notes: 'Segundo préstamo personal',
  },
  {
    id: 'L12',
    debtorId: '3',
    amount: 4000,
    dueDate: '2024-02-15',
    status: 'proximo',
    createdAt: '2024-01-25',
    notes: 'Préstamo para mercancía',
  },
  {
    id: 'L13',
    debtorId: '5',
    amount: 9500,
    dueDate: '2024-01-08',
    status: 'pagado',
    createdAt: '2023-09-01',
    notes: 'Préstamo saldado',
  },
  {
    id: 'L14',
    debtorId: '8',
    amount: 2200,
    dueDate: '2024-04-10',
    status: 'pendiente',
    createdAt: '2024-02-15',
    notes: 'Préstamo adicional',
  },
  {
    id: 'L15',
    debtorId: '6',
    amount: 5500,
    dueDate: '2023-12-20',
    status: 'pagado',
    createdAt: '2023-08-01',
    notes: 'Préstamo completado',
  },
]

export function getDebtorById(id: string): Debtor | undefined {
  return mockDebtors.find((d) => d.id === id)
}

export function getLoansByDebtorId(debtorId: string): Loan[] {
  return mockLoans.filter((l) => l.debtorId === debtorId)
}

export function getDebtorFullName(debtor: Debtor): string {
  return `${debtor.firstName} ${debtor.lastName}`
}
