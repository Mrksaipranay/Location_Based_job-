import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import simple from '../../assets/simple.png'
import val from '../../assets/val.png'
import update from '../../assets/update.png'
import { FiZap, FiShield, FiRefreshCw, FiArrowRight } from 'react-icons/fi'

// Rotating 3D cube for value section
const RotatingCube = ({ color }) => {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.7
    }
  })
  return (
    <Float speed={2} floatIntensity={1}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} transparent opacity={0.85} />
      </mesh>
    </Float>
  )
}

const values = [
  {
    icon: simple,
    iconComponent: FiZap,
    title: 'Simplicity',
    desc: 'We believe in keeping things simple. Our clean interface makes job searching effortless and enjoyable.',
    color: '#2a68ff',
    bg: '#dedef8',
    darkBg: 'rgba(42, 104, 255, 0.1)',
    cubeColor: '#2a68ff',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: val,
    iconComponent: FiShield,
    title: 'Reliability',
    desc: 'We verify every job listing and company profile to ensure you only see legitimate opportunities.',
    color: '#a855f7',
    bg: '#f7edf5',
    darkBg: 'rgba(168, 85, 247, 0.1)',
    cubeColor: '#a855f7',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: update,
    iconComponent: FiRefreshCw,
    title: 'Always Updated',
    desc: 'Real-time job listings updated every hour from thousands of companies worldwide. Never miss an opportunity.',
    color: '#10b981',
    bg: '#fcfae3',
    darkBg: 'rgba(16, 185, 129, 0.1)',
    cubeColor: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
  },
]

const ValueCard = ({ value, index, darkMode }) => {
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-2xl p-6 overflow-hidden transition-all duration-300 ${darkMode
          ? 'bg-[#161b27] border border-[#2d3748] hover:border-blue-500/30'
          : 'bg-white border border-gray-100 shadow-lg hover:shadow-xl'
        }`}
      style={{ perspective: '1000px' }}
    >
      {/* Background gradient blob */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl"
        style={{ background: value.color }}
      />

      {/* Mini 3D Canvas */}
      <div className="h-20 mb-4">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <RotatingCube color={value.cubeColor} />
        </Canvas>
      </div>

      {/* Icon + Title */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center`}
          style={{ background: darkMode ? value.darkBg : value.bg }}
        >
          <img src={value.icon} alt={value.title} className="w-6 h-6 object-contain" />
        </div>
        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-textColor'}`}>
          {value.title}
        </h3>
      </div>

      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {value.desc}
      </p>

      {/* Bottom gradient line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient} rounded-b-2xl`} />
    </motion.div>
  )
}

const Value = ({ darkMode }) => {
  const ctaRef = useRef()
  const ctaInView = useInView(ctaRef, { once: true })

  return (
    <div className={`py-16 px-8 ${darkMode ? 'bg-[#0d1117]' : 'bg-white'}`}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="badge badge-purple mb-3 inline-block">Our Values</span>
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-textColor'}`}>
          The values that hold us{' '}
          <span className="gradient-text">true and accountable</span>
        </h2>
        <p className={`text-base max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          We're committed to building a platform that genuinely helps people find meaningful work.
        </p>
      </motion.div>

      {/* Value Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        {values.map((value, i) => (
          <ValueCard key={value.title} value={value} index={i} darkMode={darkMode} />
        ))}
      </div>

      {/* CTA Banner */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-10 w-32 h-32 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-4 right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Ready to switch careers?
            </h2>
            <p className="text-blue-100 text-base">
              Join 2M+ professionals who found their dream job on SeekJob.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl shadow-lg"
            >
              Get Started <FiArrowRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 border-2 border-white/50 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Value