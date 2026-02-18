import { useState, useEffect } from 'react'
import NavBar from './Components/NavBar/NavBar'
import Jobs from './Components/JobDiv/Jobs'
import Value from './Components/ValueDiv/Value'
import Search from './Components/SearchDiv/Search'
import Footer from './Components/FooterDiv/FooterDiv'
import AuthModal from './Components/Auth/AuthModal'

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('seekjob-dark')
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [filters, setFilters] = useState({
    jobQuery: '',
    companyQuery: '',
    locationQuery: '',
    jobType: '',
    level: '',
    sortBy: '',
  })

  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
    localStorage.setItem('seekjob-dark', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDark = () => setDarkMode((prev) => !prev)
  const openLogin = () => setAuthModal({ open: true, mode: 'login' })
  const openRegister = () => setAuthModal({ open: true, mode: 'register' })
  const closeAuth = () => setAuthModal((a) => ({ ...a, open: false }))

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0d1117]' : 'bg-white'}`}>
      <NavBar
        darkMode={darkMode}
        toggleDark={toggleDark}
        onLogin={openLogin}
        onRegister={openRegister}
      />
      <Search darkMode={darkMode} onSearch={setFilters} />
      <Jobs darkMode={darkMode} filters={filters} />
      <Value darkMode={darkMode} />
      <Footer darkMode={darkMode} />

      <AuthModal
        isOpen={authModal.open}
        onClose={closeAuth}
        initialMode={authModal.mode}
        darkMode={darkMode}
      />
    </div>
  )
}

export default App