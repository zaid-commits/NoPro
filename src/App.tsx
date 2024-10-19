import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CategoryList } from '@/components/CategoryList'
import { NotesList } from '@/components/NotesList'
import { NoteEditor } from '@/components/NoteEditor'
import { NoteView } from '@/components/NoteView'

export default function App() {
  const [categories, setCategories] = useState(['Work', 'Personal', 'Projects'])
  const [notes, setNotes] = useState([
    { id: '1', title: 'Welcome to NotesPro', content: 'Start organizing your thoughts today!', category: 'Personal' },
    { id: '2', title: 'Project Ideas', content: 'List of potential project ideas...', category: 'Projects' },
  ])

  return (
    <Router>
      <div className="flex h-screen bg-background text-foreground">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="absolute top-4 left-4 lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col h-full">
              <CategoryList categories={categories} />
            </nav>
          </SheetContent>
        </Sheet>

        <nav className="hidden lg:flex w-64 border-r p-4 flex-col">
          <Link to="/" className="text-2xl font-bold mb-4">NotesPro</Link>
          <CategoryList categories={categories} />
        </nav>

        <main className="flex-1 p-4 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">All Notes</h1>
                    <Link to="/new">
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> New Note
                      </Button>
                    </Link>
                  </div>
                  <NotesList notes={notes} />
                </>
              } />
              <Route path="/new" element={<NoteEditor categories={categories} onSave={(note) => setNotes([...notes, note])} />} />
              <Route path="/edit/:id" element={<NoteEditor categories={categories} notes={notes} onSave={(editedNote) => {
                setNotes(notes.map(note => note.id === editedNote.id ? editedNote : note))
              }} />} />
              <Route path="/note/:id" element={<NoteView notes={notes} onDelete={(id) => setNotes(notes.filter(note => note.id !== id))} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}