import { useMemo } from 'react'
import { useApp } from '../context/FinanceContext'
import type { Transaction } from '../data/mockData'

export function useTransactions() {
  const { state } = useApp()
  const { transactions, filters } = state

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        filters.search === '' ||
        t.description.toLowerCase().includes(filters.search.toLowerCase())
      const matchesCategory =
        filters.category === '' || t.category === filters.category
      const matchesType = filters.type === '' || t.type === filters.type

      return matchesSearch && matchesCategory && matchesType
    })
  }, [transactions, filters])

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [filteredTransactions])

  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [transactions])

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [transactions])

  const totalBalance = useMemo(() => {
    return totalIncome - totalExpenses
  }, [totalIncome, totalExpenses])

  const spendingByCategory = useMemo(() => {
    const categoryMap = new Map<string, number>()
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const current = categoryMap.get(t.category) || 0
        categoryMap.set(t.category, current + t.amount)
      })
    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
    }))
  }, [transactions])

  const balanceTrend = useMemo(() => {
    const months: { month: string; balance: number }[] = []
    const sortedByDate = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    let runningBalance = 0
    const monthMap = new Map<string, number>()

    sortedByDate.forEach((t) => {
      const date = new Date(t.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      runningBalance += t.type === 'income' ? t.amount : -t.amount
      monthMap.set(monthKey, runningBalance)
    })

    const sortedMonths = Array.from(monthMap.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    )

    sortedMonths.slice(-6).forEach(([key, balance]) => {
      const [year, month] = key.split('-')
      const date = new Date(parseInt(year), parseInt(month) - 1)
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        balance,
      })
    })

    return months
  }, [transactions])

  const getMonthlySpending = (monthsAgo: number) => {
    const now = new Date()
    const targetMonth = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1)
    const nextMonth = new Date(now.getFullYear(), now.getMonth() - monthsAgo + 1, 1)

    return transactions
      .filter((t) => {
        const date = new Date(t.date)
        return t.type === 'expense' && date >= targetMonth && date < nextMonth
      })
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const thisMonthSpending = useMemo(() => getMonthlySpending(0), [transactions])
  const lastMonthSpending = useMemo(() => getMonthlySpending(1), [transactions])

  const spendingChange = useMemo(() => {
    if (lastMonthSpending === 0) return 0
    return ((thisMonthSpending - lastMonthSpending) / lastMonthSpending) * 100
  }, [thisMonthSpending, lastMonthSpending])

  const highestSpendingCategory = useMemo(() => {
    if (spendingByCategory.length === 0) return null
    return spendingByCategory.reduce((max, cat) =>
      cat.value > max.value ? cat : max
    )
  }, [spendingByCategory])

  const averageDailySpend = useMemo(() => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const daysElapsed = Math.max(1, Math.ceil((now.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24)))
    return thisMonthSpending / daysElapsed
  }, [thisMonthSpending])

  return {
    transactions: sortedTransactions,
    allTransactions: transactions,
    totalIncome,
    totalExpenses,
    totalBalance,
    spendingByCategory,
    balanceTrend,
    thisMonthSpending,
    lastMonthSpending,
    spendingChange,
    highestSpendingCategory,
    averageDailySpend,
  }
}
