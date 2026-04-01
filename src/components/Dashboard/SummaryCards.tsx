import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '../shared'
import { formatCurrency } from '../../lib/utils'
import { useTransactions } from '../../hooks/useTransactions'

export function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useTransactions()

  const cards = [
    {
      title: 'Total Balance',
      value: totalBalance,
      icon: Wallet,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Income',
      value: totalIncome,
      icon: TrendingUp,
      color: 'text-income',
      bgColor: 'bg-income/10',
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      color: 'text-expense',
      bgColor: 'bg-expense/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {cards.map((card, index) => (
        <Card key={card.title} delay={index * 0.1}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">{card.title}</p>
              <p className={`text-2xl lg:text-3xl font-bold mt-2 ${card.color}`}>
                {formatCurrency(card.value)}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
