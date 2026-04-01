import { useState, useEffect } from 'react'
import { Modal, Button, Input, Select } from '../shared'
import { useApp } from '../../context/FinanceContext'
import { categories, type Transaction, type Category, type TransactionType } from '../../data/mockData'

interface TransactionFormProps {
  isOpen: boolean
  onClose: () => void
  transaction?: Transaction | null
}

export function TransactionForm({ isOpen, onClose, transaction }: TransactionFormProps) {
  const { addTransaction, updateTransaction } = useApp()
  const isEditing = !!transaction

  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: 'Food' as Category,
    type: 'expense' as TransactionType,
    amount: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        type: transaction.type,
        amount: transaction.amount.toString(),
      })
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: 'Food',
        type: 'expense',
        amount: '',
      })
    }
    setErrors({})
  }, [transaction, isOpen])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const transactionData = {
      date: formData.date,
      description: formData.description.trim(),
      category: formData.category,
      type: formData.type,
      amount: parseFloat(formData.amount),
    }

    if (isEditing && transaction) {
      updateTransaction({ ...transactionData, id: transaction.id })
    } else {
      addTransaction(transactionData)
    }

    onClose()
  }

  const categoryOptions = categories.map((cat) => ({ value: cat, label: cat }))
  const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="date"
          type="date"
          label="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          error={errors.date}
        />

        <Input
          id="description"
          type="text"
          label="Description"
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
        />

        <Select
          id="category"
          label="Category"
          options={categoryOptions}
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
        />

        <Select
          id="type"
          label="Type"
          options={typeOptions}
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
        />

        <Input
          id="amount"
          type="number"
          label="Amount"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          error={errors.amount}
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            {isEditing ? 'Update' : 'Add'} Transaction
          </Button>
        </div>
      </form>
    </Modal>
  )
}
