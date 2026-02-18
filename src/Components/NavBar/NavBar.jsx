import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { BsSun, BsMoon } from 'react-icons/bs'
import { FiBriefcase } from 'react-icons/fi'

const NavBar = ({ darkMode, toggleDark, onLogin, onRegister }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['Jobs', 'Companies', 'About', 'Blog', 'Contact']

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`navBar flex justify-between items-center px-8 py-4 transition-all duration-300 ${scrolled
          ? darkMode
            ? 'bg-[#0d1117]/95 backdrop-blur-xl shadow-2xl border-b border-[#2d3748]'
            : 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100'
          : darkMode
            ? 'bg-transparent'
            : 'bg-white'
          }`}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="logoDiv flex items-center gap-2 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <FiBriefcase className="text-white text-lg" />
          </div>
          <h1 className="text-[22px] font-bold">
            <span className="gradient-text">Seek</span>
            <span className={darkMode ? 'text-white' : 'text-textColor'}>Job</span>
          </h1>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="menu hidden md:flex gap-8 items-center">
          {navLinks.map((link, i) => (
            <motion.li
              key={link}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.3 }}
              className={`menuList font-medium text-sm transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-[#6f6f6f] hover:text-blueColor'
                }`}
            >
              {link}
            </motion.li>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDark}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
          >
            <motion.div
              animate={{ x: darkMode ? 24 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-5 h-5 rounded-full bg-white absolute top-0.5 flex items-center justify-center shadow-md"
            >
              {darkMode ? (
                <BsMoon className="text-blue-600 text-[8px]" />
              ) : (
                <BsSun className="text-yellow-500 text-[8px]" />
              )}
            </motion.div>
          </motion.button>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogin}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${darkMode
                ? 'text-gray-300 hover:text-white hover:bg-white/10 border border-[#2d3748]'
                : 'text-textColor hover:text-blueColor border border-gray-200 hover:border-blueColor'
                }`}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(42,104,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegister}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
            >
              Register
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-xl ${darkMode ? 'text-white' : 'text-textColor'}`}
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed top-0 right-0 h-full w-72 z-50 p-8 flex flex-col gap-6 ${darkMode ? 'bg-[#161b27] border-l border-[#2d3748]' : 'bg-white shadow-2xl'
                }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-textColor'}`}>Menu</h2>
                <button onClick={() => setMobileOpen(false)}>
                  <HiX size={24} className={darkMode ? 'text-white' : 'text-textColor'} />
                </button>
              </div>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                  className={`text-lg font-medium py-2 border-b ${darkMode ? 'text-gray-300 border-[#2d3748]' : 'text-textColor border-gray-100'
                    }`}
                >
                  {link}
                </motion.li>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <button onClick={onLogin} className={`py-3 rounded-xl font-semibold border ${darkMode ? 'border-[#2d3748] text-white' : 'border-gray-200 text-textColor'}`}>Login</button>
                <button onClick={onRegister} className="py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white">Register</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavBar