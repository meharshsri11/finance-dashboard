import { Layout } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { Transactions } from './components/Transactions'
import { Insights } from './components/Insights'
import { useApp } from './context/FinanceContext'

function App() {
  const { state } = useApp()
  const { activeSection } = state

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'transactions':
        return <Transactions />
      case 'insights':
        return <Insights />
      default:
        return <Dashboard />
    }
  }

  return (
    <Layout>
      {renderSection()}
    </Layout>
  )
}

export default App
