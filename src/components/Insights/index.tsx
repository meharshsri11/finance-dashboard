import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../shared'
import { useTransactions } from '../../hooks/useTransactions'
import { formatCurrency } from '../../lib/utils'
import { cn } from '../../lib/utils'

export function Insights() {
  const {
    highestSpendingCategory,
    thisMonthSpending,
    lastMonthSpending,
    spendingChange,
    averageDailySpend,
  } = useTransactions()

  const insights = [
    {
      title: 'Highest Spending Category',
      icon: PieChart,
      value: highestSpendingCategory?.name || 'N/A',
      subtitle: highestSpendingCategory
        ? formatCurrency(highestSpendingCategory.value)
        : 'No expenses recorded',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Monthly Comparison',
      icon: spendingChange >= 0 ? TrendingUp : TrendingDown,
      value: `${spendingChange >= 0 ? '+' : ''}${spendingChange.toFixed(1)}%`,
      subtitle: `${formatCurrency(thisMonthSpending)} vs ${formatCurrency(lastMonthSpending)} last month`,
      color: spendingChange >= 0 ? 'text-expense' : 'text-income',
      bgColor: spendingChange >= 0 ? 'bg-expense/10' : 'bg-income/10',
    },
    {
      title: 'Average Daily Spend',
      icon: DollarSign,
      value: formatCurrency(averageDailySpend),
      subtitle: 'Based on this month',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Insights</h2>
        <p className="text-muted-foreground">
          Analytics and trends from your transaction data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <Card key={insight.title} delay={index * 0.1}>
            <CardHeader className="mb-0">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {insight.title}
                </CardTitle>
                <div className={cn('p-2 rounded-lg', insight.bgColor)}>
                  <insight.icon className={cn('w-5 h-5', insight.color)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className={cn('text-3xl font-bold', insight.color)}>{insight.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{insight.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card delay={0.3}>
        <CardHeader>
          <CardTitle>Spending Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {highestSpendingCategory && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="p-2 rounded-lg bg-accent/10">
                  <PieChart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Watch your {highestSpendingCategory.name.toLowerCase()} spending
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This category accounts for{' '}
                    {formatCurrency(highestSpendingCategory.value)} of your expenses.
                    Consider setting a budget limit.
                  </p>
                </div>
              </div>
            )}

            {spendingChange > 10 && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-expense/5">
                <div className="p-2 rounded-lg bg-expense/10">
                  <TrendingUp className="w-5 h-5 text-expense" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Spending increased this month</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your spending is up {spendingChange.toFixed(1)}% compared to last month.
                    Review your recent transactions to identify areas to cut back.
                  </p>
                </div>
              </div>
            )}

            {spendingChange < -10 && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-income/5">
                <div className="p-2 rounded-lg bg-income/10">
                  <TrendingDown className="w-5 h-5 text-income" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Great job saving!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You&apos;ve reduced spending by {Math.abs(spendingChange).toFixed(1)}%
                    compared to last month. Keep up the good work!
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Daily spending awareness</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You&apos;re spending an average of {formatCurrency(averageDailySpend)} per day
                  this month. Small daily savings can add up significantly over time.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
