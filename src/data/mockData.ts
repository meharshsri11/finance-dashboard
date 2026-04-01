export type Category = 'Food' | 'Transport' | 'Shopping' | 'Salary' | 'Entertainment' | 'Health'
export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  date: string
  amount: number
  category: Category
  type: TransactionType
  description: string
}

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2026-04-01', amount: 5500, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '2', date: '2026-03-28', amount: 85.50, category: 'Food', type: 'expense', description: 'Grocery shopping at Whole Foods' },
  { id: '3', date: '2026-03-27', amount: 45.00, category: 'Transport', type: 'expense', description: 'Uber rides this week' },
  { id: '4', date: '2026-03-25', amount: 299.99, category: 'Shopping', type: 'expense', description: 'New headphones' },
  { id: '5', date: '2026-03-24', amount: 15.99, category: 'Entertainment', type: 'expense', description: 'Netflix subscription' },
  { id: '6', date: '2026-03-22', amount: 120.00, category: 'Health', type: 'expense', description: 'Gym membership' },
  { id: '7', date: '2026-03-20', amount: 250.00, category: 'Salary', type: 'income', description: 'Freelance project payment' },
  { id: '8', date: '2026-03-18', amount: 62.30, category: 'Food', type: 'expense', description: 'Restaurant dinner' },
  { id: '9', date: '2026-03-15', amount: 5500, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '10', date: '2026-03-12', amount: 89.99, category: 'Shopping', type: 'expense', description: 'Online clothing order' },
  { id: '11', date: '2026-03-10', amount: 35.00, category: 'Transport', type: 'expense', description: 'Gas station fill-up' },
  { id: '12', date: '2026-03-08', amount: 55.00, category: 'Entertainment', type: 'expense', description: 'Concert tickets' },
  { id: '13', date: '2026-03-05', amount: 42.50, category: 'Food', type: 'expense', description: 'Coffee and lunch' },
  { id: '14', date: '2026-03-01', amount: 5500, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '15', date: '2026-02-28', amount: 200.00, category: 'Health', type: 'expense', description: 'Doctor visit copay' },
  { id: '16', date: '2026-02-25', amount: 150.00, category: 'Shopping', type: 'expense', description: 'Home decor items' },
  { id: '17', date: '2026-02-20', amount: 28.99, category: 'Food', type: 'expense', description: 'Fast food delivery' },
  { id: '18', date: '2026-02-15', amount: 5500, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '19', date: '2026-02-10', amount: 75.00, category: 'Entertainment', type: 'expense', description: 'Movie night with friends' },
  { id: '20', date: '2026-02-05', amount: 180.00, category: 'Transport', type: 'expense', description: 'Car maintenance' },
]

export const categories: Category[] = ['Food', 'Transport', 'Shopping', 'Salary', 'Entertainment', 'Health']

export const categoryColors: Record<Category, string> = {
  Food: '#f97316',
  Transport: '#3b82f6',
  Shopping: '#ec4899',
  Salary: '#10b981',
  Entertainment: '#8b5cf6',
  Health: '#ef4444',
}
