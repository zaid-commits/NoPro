import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { NoteEditor } from './components/NoteEditor'
import { NoteView } from './components/NoteView'
import { TopNav } from './components/TopNav'
import { CommandMenu } from './components/CommandMenu'
import { TagManager } from './components/TagManager'
import { NotesList } from './components/NotesList'
import { Toaster, toast } from 'react-hot-toast'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { PlusCircle } from 'lucide-react'
import { LandingPage } from './components/LandingPage'
import { Footer } from './components/Footer'

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: number
  updatedAt: number
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false)

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    const savedTags = localStorage.getItem('tags')
    if (savedNotes) setNotes(JSON.parse(savedNotes))
    if (savedTags) setTags(JSON.parse(savedTags))
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags))
  }, [tags])

  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setNotes([newNote, ...notes])
    toast.success('Note added successfully!')
  }

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? { ...updatedNote, updatedAt: Date.now() } : note
    ))
    toast.success('Note updated successfully!')
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    toast.success('Note deleted successfully!')
  }

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary">
        <TopNav setIsCommandMenuOpen={setIsCommandMenuOpen} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
              <LandingPage/>
              </>
            } />
            <Route path="/notes" element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                  <h1 className="text-4xl font-bold text-primary">My Notes</h1>
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <Input
                      type="text"
                      placeholder="Search notes..."
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64"
                    />
                    <Button asChild>
                      <Link to="/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> New Note
                      </Link>
                    </Button>
                  </div>
                </div>
                <TagManager tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
                <NotesList notes={filteredNotes} />
              </div>
            } />
            <Route path="/new" element={<NoteEditor tags={tags} onSave={addNote} onAddTag={addTag} />} />
            <Route path="/edit/:id" element={<NoteEditor tags={tags} notes={notes} onSave={(note) => updateNote({ ...note as Note, updatedAt: Date.now() })} onAddTag={addTag} />} />
            <Route path="/note/:id" element={<NoteView notes={notes} onDelete={deleteNote} />} />
          </Routes>
        </main>
        <Footer />
        <CommandMenu 
          isOpen={isCommandMenuOpen} 
          setIsOpen={setIsCommandMenuOpen}
          notes={notes}
          tags={tags}
        />
        <Toaster position="top-center" />
      </div>
    </Router>
  )
}
