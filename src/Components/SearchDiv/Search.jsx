import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { HiAdjustmentsHorizontal } from 'react-icons/hi2'
import ThreeScene from '../ThreeScene/ThreeScene'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const stats = [
  { value: 12500, label: 'Jobs Posted', suffix: '+' },
  { value: 8400, label: 'Companies', suffix: '+' },
  { value: 95, label: 'Hired Rate', suffix: '%' },
  { value: 2, label: 'Million Users', suffix: 'M+' },
]

const StatCard = ({ value, label, suffix, darkMode }) => {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`stat-card ${darkMode ? 'bg-[#161b27] border-[#2d3748]' : ''}`}
    >
      <div className="text-3xl font-bold gradient-text">
        {inView ? <CountUp end={value} duration={2.5} separator="," suffix={suffix} /> : '0'}
      </div>
      <p className={`text-sm mt-1 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </motion.div>
  )
}

const Search = ({ darkMode, onSearch }) => {
  const [jobQuery, setJobQuery] = useState('')
  const [companyQuery, setCompanyQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [jobType, setJobType] = useState('')
  const [level, setLevel] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = () => {
    onSearch({ jobQuery, companyQuery, locationQuery, jobType, level, sortBy })
  }

  const handleClear = () => {
    setJobQuery('')
    setCompanyQuery('')
    setLocationQuery('')
    setJobType('')
    setLevel('')
    setSortBy('')
    onSearch({ jobQuery: '', companyQuery: '', locationQuery: '', jobType: '', level: '', sortBy: '' })
  }

  const inputClass = `bg-transparent focus:outline-none w-full text-sm font-medium ${darkMode ? 'text-gray-200 placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
    }`

  const selectClass = `text-sm font-medium focus:outline-none cursor-pointer rounded-lg px-3 py-2 border transition-all ${darkMode
      ? 'bg-[#1a1f2e] text-gray-200 border-[#2d3748] focus:border-blue-500'
      : 'bg-white text-gray-700 border-gray-200 focus:border-blue-400'
    }`

  return (
    <div className={`relative ${darkMode ? 'hero-bg-dark' : 'hero-bg'}`}>
      {/* 3D Background */}
      <div className="absolute inset-0 h-[600px] pointer-events-none overflow-hidden">
        <ThreeScene darkMode={darkMode} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 pt-16 pb-8 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block badge badge-blue mb-4 text-xs px-4 py-1.5"
          >
            🚀 #1 Job Platform in 2025
          </motion.span>

          <h1 className={`text-5xl md:text-6xl font-bold mb-4 leading-tight ${darkMode ? 'text-white' : 'text-textColor'}`}>
            Find Your{' '}
            <span className="gradient-text">Dream Job</span>
            <br />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Today</span>
          </h1>

          <p className={`text-lg mb-10 max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Discover thousands of opportunities from top companies worldwide. Your next career move starts here.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className={`max-w-4xl mx-auto rounded-2xl p-2 shadow-2xl ${darkMode
              ? 'bg-[#161b27] border border-[#2d3748]'
              : 'bg-white border border-gray-100'
            }`}
        >
          <div className="flex flex-col md:flex-row gap-2 p-2">
            {/* Job Search */}
            <div className={`flex items-center gap-3 flex-1 px-4 py-3 rounded-xl ${darkMode ? 'bg-[#1a1f2e]' : 'bg-gray-50'
              }`}>
              <AiOutlineSearch className="text-blue-500 text-xl flex-shrink-0" />
              <input
                type="text"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className={inputClass}
                placeholder="Job title, keywords..."
              />
              {jobQuery && (
                <IoCloseCircleOutline
                  onClick={() => setJobQuery('')}
                  className="text-gray-400 hover:text-red-400 text-xl cursor-pointer flex-shrink-0"
                />
              )}
            </div>

            {/* Company Search */}
            <div className={`flex items-center gap-3 flex-1 px-4 py-3 rounded-xl ${darkMode ? 'bg-[#1a1f2e]' : 'bg-gray-50'
              }`}>
              <BsHouseDoor className="text-purple-500 text-xl flex-shrink-0" />
              <input
                type="text"
                value={companyQuery}
                onChange={(e) => setCompanyQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className={inputClass}
                placeholder="Company name..."
              />
              {companyQuery && (
                <IoCloseCircleOutline
                  onClick={() => setCompanyQuery('')}
                  className="text-gray-400 hover:text-red-400 text-xl cursor-pointer flex-shrink-0"
                />
              )}
            </div>

            {/* Location Search */}
            <div className={`flex items-center gap-3 flex-1 px-4 py-3 rounded-xl ${darkMode ? 'bg-[#1a1f2e]' : 'bg-gray-50'
              }`}>
              <CiLocationOn className="text-green-500 text-xl flex-shrink-0" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className={inputClass}
                placeholder="City, remote..."
              />
              {locationQuery && (
                <IoCloseCircleOutline
                  onClick={() => setLocationQuery('')}
                  className="text-gray-400 hover:text-red-400 text-xl cursor-pointer flex-shrink-0"
                />
              )}
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(42,104,255,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSearch}
              className="btn-primary px-8 py-3 rounded-xl text-sm font-bold whitespace-nowrap"
            >
              Search Jobs
            </motion.button>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-3 px-4 pb-3 pt-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${darkMode
                  ? 'text-gray-400 hover:text-blue-400 hover:bg-[#1a1f2e]'
                  : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50'
                }`}
            >
              <HiAdjustmentsHorizontal />
              Filters
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-wrap gap-3"
                >
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClass}>
                    <option value="">Sort by</option>
                    <option value="relevance">Relevance</option>
                    <option value="recent">Most Recent</option>
                    <option value="salary">Salary</option>
                  </select>
                  <select value={jobType} onChange={(e) => setJobType(e.target.value)} className={selectClass}>
                    <option value="">Job Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="remote">Remote</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                  <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass}>
                    <option value="">Experience</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead / Manager</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {(jobQuery || companyQuery || locationQuery || jobType || level) && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleClear}
                className="text-sm text-red-400 hover:text-red-500 font-medium ml-auto"
              >
                Clear All
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Popular:</span>
          {['React Developer', 'UI/UX Designer', 'Data Scientist', 'Product Manager', 'Remote'].map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setJobQuery(tag); onSearch({ jobQuery: tag, companyQuery, locationQuery, jobType, level, sortBy }) }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${darkMode
                  ? 'border-[#2d3748] text-gray-400 hover:border-blue-500 hover:text-blue-400'
                  : 'border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-500'
                }`}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 px-8 pb-12 max-w-4xl mx-auto">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} darkMode={darkMode} />
        ))}
      </div>
    </div>
  )
}

export default Search