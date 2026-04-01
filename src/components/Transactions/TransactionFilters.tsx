import { Search } from 'lucide-react'
import { Input, Select } from '../shared'
import { useApp } from '../../context/FinanceContext'
import { categories } from '../../data/mockData'

export function TransactionFilters() {
  const { state, setFilters } = useApp()
  const { filters } = state

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ]

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="pl-10"
        />
      </div>
      <Select
        options={categoryOptions}
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value })}
        className="w-full sm:w-40"
      />
      <Select
        options={typeOptions}
        value={filters.type}
        onChange={(e) => setFilters({ type: e.target.value })}
        className="w-full sm:w-32"
      />
    </div>
  )
}
