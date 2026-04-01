export type { Transaction, Category, TransactionType } from '../data/mockData'

export type Role = 'Viewer' | 'Admin'

export type ActiveSection = 'dashboard' | 'transactions' | 'insights'

export interface Filters {
  search: string
  category: string
  type: string
}

export interface AppState {
  transactions: Transaction[]
  filters: Filters
  role: Role
  darkMode: boolean
  activeSection: ActiveSection
}

export type AppAction =
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<Filters> }
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_ACTIVE_SECTION'; payload: ActiveSection }

import type { Transaction } from '../data/mockData'
