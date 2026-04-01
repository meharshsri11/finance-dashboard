import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import { mockTransactions, type Transaction } from '../data/mockData'
import type { AppState, AppAction, Role, Filters, ActiveSection } from '../types'

const STORAGE_KEY = 'finance-dashboard-state'

const getInitialState = (): AppState => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return {
          ...parsed,
          filters: parsed.filters || { search: '', category: '', type: '' },
          activeSection: parsed.activeSection || 'dashboard',
        }
      } catch {
        // Fall through to default
      }
    }
  }
  
  return {
    transactions: mockTransactions,
    filters: { search: '', category: '', type: '' },
    role: 'Viewer' as Role,
    darkMode: false,
    activeSection: 'dashboard' as ActiveSection,
  }
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload }
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'SET_ROLE':
      return { ...state, role: action.payload }
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode }
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload }
    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
  setFilters: (filters: Partial<Filters>) => void
  setRole: (role: Role) => void
  toggleDarkMode: () => void
  setActiveSection: (section: ActiveSection) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState)

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
        activeSection: state.activeSection,
      })
    )
  }, [state.transactions, state.role, state.darkMode, state.activeSection])

  // Apply dark mode class to document
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [state.darkMode])

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction })
  }

  const updateTransaction = (transaction: Transaction) => {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction })
  }

  const deleteTransaction = (id: string) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  }

  const setFilters = (filters: Partial<Filters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters })
  }

  const setRole = (role: Role) => {
    dispatch({ type: 'SET_ROLE', payload: role })
  }

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' })
  }

  const setActiveSection = (section: ActiveSection) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section })
  }

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        setFilters,
        setRole,
        toggleDarkMode,
        setActiveSection,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
