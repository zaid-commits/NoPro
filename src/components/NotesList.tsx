import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Note {
  id: string
  title: string
  content: string
  category: string
}

export function NotesList({ notes }: { notes: Note[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Link key={note.id} to={`/note/${note.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{note.content.substring(0, 100)}...</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}