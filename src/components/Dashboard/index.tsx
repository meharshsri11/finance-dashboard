import { SummaryCards } from './SummaryCards'
import { BalanceChart } from './BalanceChart'
import { SpendingChart } from './SpendingChart'

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Dashboard Overview</h2>
        <p className="text-muted-foreground">Track your financial health at a glance</p>
      </div>
      
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart />
        <SpendingChart />
      </div>
    </div>
  )
}

export { SummaryCards } from './SummaryCards'
export { BalanceChart } from './BalanceChart'
export { SpendingChart } from './SpendingChart'
