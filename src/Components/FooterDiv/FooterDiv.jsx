import { motion } from 'framer-motion'
import { AiFillInstagram, AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai'
import { FiLinkedin, FiBriefcase, FiMail, FiPhone } from 'react-icons/fi'

const footerLinks = {
   Resources: ['Account', 'Support', 'Feedback', 'Contact Us', 'Documentation'],
   Support: ['Events', 'Promotions', 'Request Demo', 'Careers', 'Status'],
   Company: ['About Us', 'Features', 'News', 'FAQ', 'Privacy Policy'],
}

const socialLinks = [
   { icon: AiFillInstagram, href: '#', label: 'Instagram', color: '#E1306C' },
   { icon: AiOutlineGithub, href: '#', label: 'GitHub', color: '#fff' },
   { icon: AiOutlineTwitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
   { icon: FiLinkedin, href: 'https://www.linkedin.com/in/saipranayk/', label: 'LinkedIn', color: '#0077B5' },
]

const contactInfo = [
   { icon: FiMail, text: 'k.saipranay6705@gmail.com', href: 'mailto:k.saipranay6705@gmail.com' },
   { icon: FiPhone, text: '+91 93475 00000', href: 'tel:+919347500000' },
   { icon: FiLinkedin, text: 'linkedin.com/in/saipranayk', href: 'https://www.linkedin.com/in/saipranayk/' },
]

const FooterDiv = ({ darkMode }) => {
   return (
      <footer className={`mt-4 ${darkMode ? 'bg-[#0d1117] border-t border-[#2d3748]' : 'bg-white border-t border-gray-100'}`}>
         {/* Main Footer */}
         <div className="max-w-7xl mx-auto px-8 py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
               {/* Brand Column */}
               <div className="lg:col-span-2">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="mb-6"
                  >
                     <div className="flex items-center gap-2 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                           <FiBriefcase className="text-white text-lg" />
                        </div>
                        <h2 className="text-2xl font-bold">
                           <span className="gradient-text">Seek</span>
                           <span className={darkMode ? 'text-white' : 'text-textColor'}>Job</span>
                        </h2>
                     </div>
                     <p className={`text-sm leading-relaxed mb-6 max-w-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        We always make our seekers and companies find the best jobs and employers find the best candidates. Your career journey starts here.
                     </p>

                     {/* Contact Info */}
                     <div className="space-y-3">
                        {contactInfo.map(({ icon: Icon, text, href }) => (
                           <a
                              key={text}
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className={`flex items-center gap-2 text-sm transition-colors hover:text-blue-500 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                           >
                              <Icon className="text-blue-500 flex-shrink-0" />
                              <span>{text}</span>
                           </a>
                        ))}
                     </div>
                  </motion.div>

                  {/* Social Links */}
                  <div className="flex gap-3">
                     {socialLinks.map(({ icon: Icon, href, label, color }) => (
                        <motion.a
                           key={label}
                           href={href}
                           target="_blank"
                           rel="noreferrer"
                           whileHover={{ scale: 1.15, y: -3 }}
                           whileTap={{ scale: 0.9 }}
                           aria-label={label}
                           className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${darkMode
                                 ? 'bg-[#161b27] border border-[#2d3748] hover:border-blue-500/50'
                                 : 'bg-gray-100 hover:bg-gray-200'
                              }`}
                        >
                           <Icon style={{ color }} className="text-lg" />
                        </motion.a>
                     ))}
                  </div>
               </div>

               {/* Link Columns */}
               {Object.entries(footerLinks).map(([title, links], colIdx) => (
                  <motion.div
                     key={title}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: colIdx * 0.1 }}
                  >
                     <h3 className={`font-bold text-base mb-5 ${darkMode ? 'text-white' : 'text-textColor'}`}>
                        {title}
                     </h3>
                     <ul className="space-y-3">
                        {links.map((link) => (
                           <li key={link}>
                              <motion.a
                                 href="#"
                                 whileHover={{ x: 4 }}
                                 className={`text-sm transition-colors duration-200 ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
                                    }`}
                              >
                                 {link}
                              </motion.a>
                           </li>
                        ))}
                     </ul>
                  </motion.div>
               ))}
            </div>
         </div>

         {/* Newsletter */}
         <div className={`border-t ${darkMode ? 'border-[#2d3748]' : 'border-gray-100'}`}>
            <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
               <div>
                  <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-textColor'}`}>
                     Stay updated with new jobs
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                     Get weekly job alerts directly to your inbox.
                  </p>
               </div>
               <div className="flex gap-2 w-full md:w-auto">
                  <input
                     type="email"
                     placeholder="Enter your email"
                     className={`flex-1 md:w-64 px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
                           ? 'bg-[#161b27] border-[#2d3748] text-gray-200 placeholder-gray-500'
                           : 'bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                  />
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="btn-primary px-6 py-2.5 rounded-xl text-sm whitespace-nowrap"
                  >
                     Subscribe
                  </motion.button>
               </div>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className={`border-t ${darkMode ? 'border-[#2d3748] bg-[#080c12]' : 'border-gray-100 bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
               <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  © 2025 SeekJob. All rights reserved.
               </p>
               <div className="flex gap-6">
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                     <a
                        key={item}
                        href="#"
                        className={`text-xs transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                           }`}
                     >
                        {item}
                     </a>
                  ))}
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterDiv