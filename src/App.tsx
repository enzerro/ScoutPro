import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './components/app-provider'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import HomePage from './pages/HomePage'
import PlayersPage from './pages/PlayersPage'
import PlayerProfilePage from './pages/PlayerProfilePage'
import ComparePage from './pages/ComparePage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/players/:id" element={<PlayerProfilePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App
