import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TagManager } from './TagManager'

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
}

interface NoteEditorProps {
  tags: string[]
  notes?: Note[]
  onSave: (note: Omit<Note, 'id'>) => void
  onAddTag: (tag: string) => void
}

export function NoteEditor({  notes, onSave, onAddTag }: NoteEditorProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [noteTags, setNoteTags] = useState<string[]>([])
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id && notes) {
      const note = notes.find(n => n.id === id)
      if (note) {
        setTitle(note.title)
        setContent(note.content)
        setNoteTags(note.tags)
      }
    }
  }, [id, notes])

  const handleSave = () => {
    onSave({
      title,
      content,
      tags: noteTags,
    })
    navigate('/')
  }

  const handleAddTag = (tag: string) => {
    if (!noteTags.includes(tag)) {
      setNoteTags([...noteTags, tag])
    }
    onAddTag(tag)
  }

  const handleRemoveTag = (tag: string) => {
    setNoteTags(noteTags.filter(t => t !== tag))
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
      <TagManager
        tags={noteTags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
      />
      <Button onClick={handleSave}>Save Note</Button>
    </div>
  )
}