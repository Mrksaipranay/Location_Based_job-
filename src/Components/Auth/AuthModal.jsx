import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiCheck, FiGithub } from 'react-icons/fi'
import { AiOutlineGoogle } from 'react-icons/ai'

const inputBase = (darkMode, error) =>
    `w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200 ${error
        ? 'border-red-400 bg-red-50'
        : darkMode
            ? 'bg-[#1a1f2e] border-[#2d3748] text-gray-200 placeholder-gray-500 focus:border-blue-500'
            : 'bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:bg-white'
    }`

const validate = (mode, fields) => {
    const errs = {}
    if (!fields.email) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(fields.email)) errs.email = 'Enter a valid email'
    if (!fields.password) errs.password = 'Password is required'
    else if (fields.password.length < 6) errs.password = 'Minimum 6 characters'
    if (mode === 'register') {
        if (!fields.name) errs.name = 'Full name is required'
        if (!fields.confirmPassword) errs.confirmPassword = 'Please confirm your password'
        else if (fields.password !== fields.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    }
    return errs
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login', darkMode }) => {
    const [mode, setMode] = useState(initialMode)
    const [fields, setFields] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setFields((f) => ({ ...f, [e.target.name]: e.target.value }))
        setErrors((err) => ({ ...err, [e.target.name]: '' }))
    }

    const switchMode = (m) => {
        setMode(m)
        setFields({ name: '', email: '', password: '', confirmPassword: '' })
        setErrors({})
        setSuccess(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate(mode, fields)
        if (Object.keys(errs).length > 0) { setErrors(errs); return }
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
        }, 1200)
    }

    const handleClose = () => {
        onClose()
        setTimeout(() => {
            setSuccess(false)
            setFields({ name: '', email: '', password: '', confirmPassword: '' })
            setErrors({})
            setMode(initialMode)
        }, 300)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Full-screen backdrop — flex centers the modal */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        {/* Modal card — stopPropagation prevents backdrop click from firing */}
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 30 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative w-full max-w-md rounded-2xl shadow-2xl p-8 ${darkMode ? 'bg-[#161b27] border border-[#2d3748]' : 'bg-white'
                                }`}
                        >
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${darkMode ? 'text-gray-400 hover:bg-[#1a1f2e]' : 'text-gray-400 hover:bg-gray-100'
                                    }`}
                            >
                                <HiX size={20} />
                            </button>

                            <AnimatePresence mode="wait">
                                {success ? (
                                    /* ── Success Screen ── */
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                                            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-500/30"
                                        >
                                            <FiCheck className="text-white text-3xl" strokeWidth={3} />
                                        </motion.div>
                                        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                            {mode === 'login' ? 'Welcome back! 👋' : 'Account Created! 🎉'}
                                        </h2>
                                        <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {mode === 'login'
                                                ? 'You have successfully logged in to SeekJob.'
                                                : 'Your account has been created. Start exploring jobs!'}
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.96 }}
                                            onClick={handleClose}
                                            className="px-10 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                                        >
                                            {mode === 'login' ? 'Browse Jobs' : 'Get Started'}
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    /* ── Form ── */
                                    <motion.div
                                        key={mode}
                                        initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {/* Header */}
                                        <div className="mb-6">
                                            <h2 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                                {mode === 'login' ? 'Welcome back' : 'Create account'}
                                            </h2>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {mode === 'login'
                                                    ? 'Sign in to access your SeekJob account'
                                                    : 'Join thousands finding their dream jobs'}
                                            </p>
                                        </div>

                                        {/* Tab Switcher */}
                                        <div className={`flex rounded-xl p-1 mb-6 ${darkMode ? 'bg-[#1a1f2e]' : 'bg-gray-100'}`}>
                                            {['login', 'register'].map((m) => (
                                                <button
                                                    key={m}
                                                    onClick={() => switchMode(m)}
                                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${mode === m
                                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                                            : darkMode
                                                                ? 'text-gray-400 hover:text-gray-200'
                                                                : 'text-gray-500 hover:text-gray-700'
                                                        }`}
                                                >
                                                    {m}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Social Buttons */}
                                        <div className="grid grid-cols-2 gap-3 mb-5">
                                            {[
                                                { icon: AiOutlineGoogle, label: 'Google', color: '#EA4335' },
                                                { icon: FiGithub, label: 'GitHub', color: darkMode ? '#fff' : '#333' },
                                            ].map(({ icon: Icon, label, color }) => (
                                                <motion.button
                                                    key={label}
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all ${darkMode
                                                            ? 'border-[#2d3748] text-gray-300 hover:bg-[#1a1f2e]'
                                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <Icon style={{ color }} size={18} />
                                                    {label}
                                                </motion.button>
                                            ))}
                                        </div>

                                        {/* Divider */}
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className={`flex-1 h-px ${darkMode ? 'bg-[#2d3748]' : 'bg-gray-200'}`} />
                                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>or continue with email</span>
                                            <div className={`flex-1 h-px ${darkMode ? 'bg-[#2d3748]' : 'bg-gray-200'}`} />
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                                            {/* Name — register only */}
                                            <AnimatePresence>
                                                {mode === 'register' && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <div className="relative">
                                                            <FiUser className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg ${errors.name ? 'text-red-400' : 'text-gray-400'}`} />
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                value={fields.name}
                                                                onChange={handleChange}
                                                                placeholder="Full Name"
                                                                className={`${inputBase(darkMode, errors.name)} pl-10`}
                                                            />
                                                        </div>
                                                        {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Email */}
                                            <div>
                                                <div className="relative">
                                                    <FiMail className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={fields.email}
                                                        onChange={handleChange}
                                                        placeholder="Email address"
                                                        className={`${inputBase(darkMode, errors.email)} pl-10`}
                                                    />
                                                </div>
                                                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                                            </div>

                                            {/* Password */}
                                            <div>
                                                <div className="relative">
                                                    <FiLock className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        value={fields.password}
                                                        onChange={handleChange}
                                                        placeholder="Password"
                                                        className={`${inputBase(darkMode, errors.password)} pl-10 pr-10`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword((v) => !v)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                                    </button>
                                                </div>
                                                {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>}
                                            </div>

                                            {/* Confirm Password — register only */}
                                            <AnimatePresence>
                                                {mode === 'register' && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <div className="relative">
                                                            <FiLock className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`} />
                                                            <input
                                                                type={showConfirm ? 'text' : 'password'}
                                                                name="confirmPassword"
                                                                value={fields.confirmPassword}
                                                                onChange={handleChange}
                                                                placeholder="Confirm Password"
                                                                className={`${inputBase(darkMode, errors.confirmPassword)} pl-10 pr-10`}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowConfirm((v) => !v)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                            >
                                                                {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                                            </button>
                                                        </div>
                                                        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Forgot Password */}
                                            {mode === 'login' && (
                                                <div className="text-right">
                                                    <button type="button" className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                                                        Forgot password?
                                                    </button>
                                                </div>
                                            )}

                                            {/* Submit */}
                                            <motion.button
                                                type="submit"
                                                disabled={loading}
                                                whileHover={!loading ? { scale: 1.02, boxShadow: '0 10px 30px rgba(42,104,255,0.4)' } : {}}
                                                whileTap={!loading ? { scale: 0.98 } : {}}
                                                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <>
                                                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                        </svg>
                                                        {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                                                    </>
                                                ) : (
                                                    mode === 'login' ? 'Sign In' : 'Create Account'
                                                )}
                                            </motion.button>
                                        </form>

                                        {/* Switch mode link */}
                                        <p className={`text-center text-xs mt-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                                            <button
                                                onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                                                className="text-blue-500 hover:text-blue-600 font-semibold"
                                            >
                                                {mode === 'login' ? 'Register' : 'Sign In'}
                                            </button>
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default AuthModal
