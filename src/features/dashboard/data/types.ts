export type LoanStatus = 'pendiente' | 'proximo' | 'atrasado' | 'pagado'

export interface Debtor {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface Loan {
  id: string
  debtorId: string
  amount: number
  dueDate: string
  status: LoanStatus
  createdAt: string
  notes: string
}
