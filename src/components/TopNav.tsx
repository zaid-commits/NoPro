import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Command } from "lucide-react"

interface TopNavProps {
  setIsCommandMenuOpen: (isOpen: boolean) => void
}

export function TopNav({ setIsCommandMenuOpen }: TopNavProps) {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">📝 NoPro</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-full justify-start text-sm text-muted-foreground sm:w-40"
            onClick={() => setIsCommandMenuOpen(true)}
          >
            <Command className="mr-2 h-4 w-4" />
            Search...
          </Button>
        </div>
      </div>
    </nav>
  )
}