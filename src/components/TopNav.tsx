import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Command } from "lucide-react"

interface TopNavProps {
  setIsCommandMenuOpen: (isOpen: boolean) => void
}

export function TopNav({ setIsCommandMenuOpen }: TopNavProps) {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">📝 NoPro</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <Link to="/notes" className="text-muted-foreground hover:text-primary">My Notes</Link>
            <a href="#features" className="text-muted-foreground hover:text-primary">Features</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex"
              onClick={() => setIsCommandMenuOpen(true)}
            >
              <Command className="mr-2 h-4 w-4" />
              Search...
            </Button>
            <Button asChild>
              <Link to="/notes">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
