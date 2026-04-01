import { useState } from 'react'
import { Plus, Download } from 'lucide-react'
import { Card, Button } from '../shared'
import { TransactionFilters } from './TransactionFilters'
import { TransactionTable } from './TransactionTable'
import { TransactionForm } from './TransactionForm'
import { useApp } from '../../context/FinanceContext'
import { useTransactions } from '../../hooks/useTransactions'
import { exportToCSV } from '../../lib/utils'
import type { Transaction } from '../../data/mockData'

export function Transactions() {
  const { state } = useApp()
  const { transactions } = useTransactions()
  const { role } = state
  const isAdmin = role === 'Admin'

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTransaction(null)
  }

  const handleExport = () => {
    exportToCSV(transactions)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Transactions</h2>
          <p className="text-muted-foreground">View and manage your transactions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          {isAdmin && (
            <Button variant="primary" onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      <Card animate={false}>
        <div className="space-y-4">
          <TransactionFilters />
          <TransactionTable onEdit={handleEdit} />
        </div>
      </Card>

      <TransactionForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        transaction={editingTransaction}
      />
    </div>
  )
}

export { TransactionFilters } from './TransactionFilters'
export { TransactionTable } from './TransactionTable'
export { TransactionForm } from './TransactionForm'
