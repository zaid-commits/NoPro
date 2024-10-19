import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { v4 as uuidv4 } from 'uuid'


interface Note {
  id: string
  title: string
  content: string
  category: string
}

interface NoteEditorProps {
  categories: string[]
  notes?: Note[]
  onSave: (note: Note) => void
}

export function NoteEditor({ categories, notes, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(categories[0])
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id && notes) {
      const note = notes.find(n => n.id === id)
      if (note) {
        setTitle(note.title)
        setContent(note.content)
        setCategory(note.category)
      }
    }
  }, [id, notes])

  const handleSave = () => {
    const note = {
      id: id || uuidv4(),
      title,
      content,
      category
    }
    onSave(note)
    navigate('/')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{id ? 'Edit Note' : 'New Note'}</h1>
      <Input
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[200px]"
      />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleSave}>Save Note</Button>
    </div>
  )
}