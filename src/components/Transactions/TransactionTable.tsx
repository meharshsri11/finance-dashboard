import { useState } from 'react'
import { ArrowUpDown, Pencil, Trash2, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, EmptyState } from '../shared'
import { useApp } from '../../context/FinanceContext'
import { useTransactions } from '../../hooks/useTransactions'
import { formatCurrency, formatDate } from '../../lib/utils'
import { cn } from '../../lib/utils'
import type { Transaction } from '../../data/mockData'

interface TransactionTableProps {
  onEdit: (transaction: Transaction) => void
}

type SortField = 'date' | 'amount' | 'category'
type SortDirection = 'asc' | 'desc'

export function TransactionTable({ onEdit }: TransactionTableProps) {
  const { state, deleteTransaction } = useApp()
  const { transactions } = useTransactions()
  const { role } = state
  const isAdmin = role === 'Admin'

  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    let comparison = 0
    switch (sortField) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case 'amount':
        comparison = a.amount - b.amount
        break
      case 'category':
        comparison = a.category.localeCompare(b.category)
        break
    }
    return sortDirection === 'asc' ? comparison : -comparison
  })

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-foreground transition-colors"
    >
      {children}
      <ArrowUpDown className={cn('w-4 h-4', sortField === field && 'text-primary')} />
    </button>
  )

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="w-8 h-8" />}
        title="No transactions found"
        description="No transactions match your current filters. Try adjusting your search or filters."
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              <SortButton field="date">Date</SortButton>
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Description
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              <SortButton field="category">Category</SortButton>
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Type
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
              <SortButton field="amount">Amount</SortButton>
            </th>
            {isAdmin && (
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {sortedTransactions.map((transaction) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="py-3 px-4 text-sm text-foreground">
                  {formatDate(transaction.date)}
                </td>
                <td className="py-3 px-4 text-sm text-foreground max-w-[200px] truncate">
                  {transaction.description}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {transaction.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                      transaction.type === 'income'
                        ? 'bg-income/10 text-income'
                        : 'bg-expense/10 text-expense'
                    )}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td
                  className={cn(
                    'py-3 px-4 text-sm font-semibold text-right',
                    transaction.type === 'income' ? 'text-income' : 'text-expense'
                  )}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </td>
                {isAdmin && (
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(transaction)}
                        className="p-2"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTransaction(transaction.id)}
                        className="p-2 text-expense hover:text-expense hover:bg-expense/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}
