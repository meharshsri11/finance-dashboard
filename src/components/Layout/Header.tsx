import { Moon, Sun, Menu } from 'lucide-react'
import { Button, Select } from '../shared'
import { useApp } from '../../context/FinanceContext'
import type { Role } from '../../types'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { state, setRole, toggleDarkMode } = useApp()
  const { role, darkMode } = state

  const roleOptions = [
    { value: 'Viewer', label: 'Viewer' },
    { value: 'Admin', label: 'Admin' },
  ]

  return (
    <header className="sticky top-0 z-40 h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden p-2"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground hidden sm:block">Finance Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">Role:</span>
          <Select
            options={roleOptions}
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-28"
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="p-2"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  )
}
