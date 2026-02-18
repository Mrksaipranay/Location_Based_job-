import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BiTimeFive } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'
import { FiBookmark, FiShare2, FiExternalLink } from 'react-icons/fi'
import { BsBriefcase } from 'react-icons/bs'
import logo1 from '../../assets/apple.png'
import logo2 from '../../assets/google.png'
import logo3 from '../../assets/amazon.png'
import logo4 from '../../assets/adobe2.png'
import logo5 from '../../assets/x.png'
import logo6 from '../../assets/amazon.png'
import logo7 from '../../assets/hu.png'
import logo8 from '../../assets/intel.png'
import logo9 from '../../assets/samsung.png'
import logo10 from '../../assets/tiktok.png'
import logo11 from '../../assets/ms.png'
import logo12 from '../../assets/nike.png'

const allData = [
  { id: 1, image: logo1, title: 'Web Developer', time: 'Now', location: 'Bengaluru, KA', desc: 'We want a front-end developer for our company. You must be experienced in developing visually appealing websites with React and modern CSS.', company: 'Apple Inc.', type: 'full-time', level: 'mid', salary: '₹18L - ₹28L', tags: ['React', 'CSS', 'TypeScript'], featured: true },
  { id: 2, image: logo2, title: 'UI/UX Designer', time: '1 day', location: 'Hyderabad, TS', desc: 'Google wants to hire UI/UX designers for a secret project. You must be experienced in Figma and Adobe XD with a strong portfolio.', company: 'Google', type: 'full-time', level: 'senior', salary: '₹22L - ₹35L', tags: ['Figma', 'Adobe XD', 'Prototyping'], featured: true },
  { id: 3, image: logo3, title: 'Software Engineer', time: '14 Hrs', location: 'Pune, MH', desc: 'Amazon wants to hire Software Engineers. You must be experienced in JavaScript (MERN stack) and Python programming languages.', company: 'Amazon', type: 'full-time', level: 'senior', salary: '₹25L - ₹40L', tags: ['Node.js', 'Python', 'AWS'], featured: false },
  { id: 4, image: logo4, title: 'Product Manager', time: '2 Hrs', location: 'Bengaluru, KA', desc: 'Adobe wants to hire a highly experienced Product Manager who can manage the whole team to succeed in delivering world-class products.', company: 'Adobe', type: 'full-time', level: 'lead', salary: '₹30L - ₹50L', tags: ['Agile', 'Roadmapping', 'Analytics'], featured: false },
  { id: 5, image: logo5, title: 'CTO', time: 'Now', location: 'Mumbai, MH', desc: 'X wants a CTO for our company. You must be experienced in developing scalable systems and leading engineering teams.', company: 'X Corp.', type: 'full-time', level: 'lead', salary: '₹60L - ₹1.2Cr', tags: ['Leadership', 'Architecture', 'Strategy'], featured: true },
  { id: 6, image: logo6, title: 'Game Developer', time: 'Now', location: 'Noida, UP', desc: 'EA wants a Game Developer. You must be experienced in Unity and Unreal Engine with shipped game titles.', company: 'Electronic Arts', type: 'full-time', level: 'mid', salary: '₹15L - ₹25L', tags: ['Unity', 'Unreal', 'C++'], featured: false },
  { id: 7, image: logo7, title: 'App Developer', time: 'Now', location: 'Chennai, TN', desc: 'Huawei wants a Mobile and Desktop App Developer. You must be experienced in developing visually appealing cross-platform apps.', company: 'Huawei', type: 'full-time', level: 'mid', salary: '₹14L - ₹22L', tags: ['Flutter', 'React Native', 'Swift'], featured: false },
  { id: 8, image: logo8, title: 'Data Scientist', time: 'Now', location: 'Hyderabad, TS', desc: 'We want a Data Scientist for our company. You must be experienced in developing and analyzing large datasets using ML/AI techniques.', company: 'Intel', type: 'full-time', level: 'senior', salary: '₹20L - ₹35L', tags: ['Python', 'TensorFlow', 'SQL'], featured: false },
  { id: 9, image: logo9, title: 'Tech Analyst', time: '12 Hrs', location: 'Gurugram, HR', desc: 'We want a Tech Analyst for our company. Strong analytical skills and experience with market research and competitive analysis required.', company: 'Samsung', type: 'contract', level: 'mid', salary: '₹12L - ₹20L', tags: ['Research', 'Excel', 'Power BI'], featured: false },
  { id: 10, image: logo10, title: 'React Developer', time: '5 days', location: 'Remote (India)', desc: 'We want a React Developer with strong experience in building scalable web applications and component libraries.', company: 'TikTok', type: 'remote', level: 'mid', salary: '₹16L - ₹26L', tags: ['React', 'Redux', 'GraphQL'], featured: false },
  { id: 11, image: logo11, title: 'C/C++ Developer', time: 'Now', location: 'Bengaluru, KA', desc: 'Microsoft wants a C/C++ Developer for our company. Experience with low-level systems programming and performance optimization required.', company: 'Microsoft', type: 'full-time', level: 'senior', salary: '₹24L - ₹38L', tags: ['C++', 'Systems', 'Performance'], featured: false },
  { id: 12, image: logo12, title: 'Brand Designer', time: '2 days', location: 'Mumbai, MH', desc: 'We want a Brand Designer for our company. Strong portfolio in brand identity, visual design, and creative direction required.', company: 'Nike', type: 'full-time', level: 'mid', salary: '₹12L - ₹20L', tags: ['Branding', 'Illustrator', 'Photoshop'], featured: false },
]

const typeColors = {
  'full-time': 'badge-blue',
  'part-time': 'badge-orange',
  'remote': 'badge-green',
  'contract': 'badge-purple',
  'internship': 'badge-orange',
}

const categories = ['All', 'Technology', 'Design', 'Management', 'Remote', 'Featured']

const JobCard = ({ job, darkMode, index, onSave, saved }) => {
  const [hovered, setHovered] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleSave = () => {
    onSave(job.id)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`singleJob relative rounded-2xl p-5 cursor-pointer ${darkMode
        ? 'bg-[#161b27] border border-[#2d3748] hover:border-blue-500/50'
        : 'bg-white border border-gray-100 shadow-md'
        }`}
      style={{ perspective: '1000px' }}
    >
      {/* Featured Badge */}
      {job.featured && (
        <div className="featured-badge absolute top-4 right-4">⭐ Featured</div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <motion.div
          animate={{ rotate: hovered ? 5 : 0 }}
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-[#1a1f2e]' : 'bg-gray-50'
            }`}
        >
          <img src={job.image} alt={job.company} className="w-8 h-8 object-contain" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-base truncate ${darkMode ? 'text-white' : 'text-textColor'}`}>
            {job.title}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{job.company}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`badge ${typeColors[job.type] || 'badge-blue'} text-[11px]`}>
          {job.type}
        </span>
        <span className={`flex items-center gap-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          <CiLocationOn /> {job.location}
        </span>
        <span className={`flex items-center gap-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          <BiTimeFive /> {job.time}
        </span>
      </div>

      {/* Description */}
      <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {job.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${darkMode ? 'bg-[#1a1f2e] text-gray-400' : 'bg-gray-100 text-gray-500'
              }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Salary */}
      <div className={`text-sm font-bold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
        {job.salary}
        <span className={`text-xs font-normal ml-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>/year</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-blue-500/30 hover:shadow-lg transition-shadow"
        >
          Apply Now
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSave}
          className={`p-2.5 rounded-xl border transition-all ${saved
            ? 'bg-blue-500 border-blue-500 text-white'
            : darkMode
              ? 'border-[#2d3748] text-gray-400 hover:border-blue-500 hover:text-blue-400'
              : 'border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500'
            }`}
        >
          <FiBookmark size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2.5 rounded-xl border transition-all ${darkMode
            ? 'border-[#2d3748] text-gray-400 hover:border-purple-500 hover:text-purple-400'
            : 'border-gray-200 text-gray-400 hover:border-purple-400 hover:text-purple-500'
            }`}
        >
          <FiShare2 size={16} />
        </motion.button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-10"
          >
            {saved ? '✓ Saved!' : '✓ Removed'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Jobs = ({ darkMode, filters }) => {
  const [savedJobs, setSavedJobs] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [visibleCount, setVisibleCount] = useState(8)

  const toggleSave = (id) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    )
  }

  const filteredJobs = useMemo(() => {
    let jobs = [...allData]

    // Apply search filters
    if (filters) {
      if (filters.jobQuery) {
        const q = filters.jobQuery.toLowerCase()
        jobs = jobs.filter((j) =>
          j.title.toLowerCase().includes(q) ||
          j.tags.some((t) => t.toLowerCase().includes(q)) ||
          j.desc.toLowerCase().includes(q)
        )
      }
      if (filters.companyQuery) {
        const q = filters.companyQuery.toLowerCase()
        jobs = jobs.filter((j) => j.company.toLowerCase().includes(q))
      }
      if (filters.locationQuery) {
        const q = filters.locationQuery.toLowerCase()
        jobs = jobs.filter((j) => j.location.toLowerCase().includes(q))
      }
      if (filters.jobType) {
        jobs = jobs.filter((j) => j.type === filters.jobType)
      }
      if (filters.level) {
        jobs = jobs.filter((j) => j.level === filters.level)
      }
    }

    // Category filter
    if (activeCategory === 'Featured') jobs = jobs.filter((j) => j.featured)
    else if (activeCategory === 'Remote') jobs = jobs.filter((j) => j.type === 'remote')
    else if (activeCategory === 'Design') jobs = jobs.filter((j) => j.title.toLowerCase().includes('design'))
    else if (activeCategory === 'Management') jobs = jobs.filter((j) => ['Product Manager', 'CTO'].includes(j.title))
    else if (activeCategory === 'Technology') jobs = jobs.filter((j) => !['Brand Designer', 'UI/UX Designer'].includes(j.title))

    if (showSavedOnly) jobs = jobs.filter((j) => savedJobs.includes(j.id))

    return jobs
  }, [filters, activeCategory, showSavedOnly, savedJobs])

  return (
    <div className={`py-12 px-8 ${darkMode ? 'bg-[#0d1117]' : 'bg-gray-50'}`}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-textColor'}`}>
          Latest <span className="gradient-text">Job Listings</span>
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {filteredJobs.length} opportunities found
        </p>
      </motion.div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat)}
            className={`category-pill text-sm ${activeCategory === cat
              ? 'active'
              : darkMode
                ? 'bg-[#161b27] text-gray-400 border-[#2d3748]'
                : 'bg-white text-gray-500 border-gray-200'
              }`}
          >
            {cat}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSavedOnly(!showSavedOnly)}
          className={`category-pill text-sm flex items-center gap-1 ${showSavedOnly
            ? 'active'
            : darkMode
              ? 'bg-[#161b27] text-gray-400 border-[#2d3748]'
              : 'bg-white text-gray-500 border-gray-200'
            }`}
        >
          <FiBookmark size={12} /> Saved ({savedJobs.length})
        </motion.button>
      </div>

      {/* Job Grid */}
      <AnimatePresence mode="popLayout">
        {filteredJobs.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BsBriefcase className={`text-6xl mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`text-lg font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No jobs found
            </p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              Try adjusting your search filters
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto"
          >
            {filteredJobs.slice(0, visibleCount).map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                darkMode={darkMode}
                index={i}
                onSave={toggleSave}
                saved={savedJobs.includes(job.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load More */}
      {filteredJobs.length > visibleCount && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(42,104,255,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisibleCount((v) => v + 4)}
            className="btn-primary px-10 py-3 rounded-xl"
          >
            Load More Jobs
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default Jobs
