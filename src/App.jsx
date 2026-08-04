import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CalendarCheck2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Globe,
  Mail,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  Smartphone,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react'
import aboutPortrait from './assets/about-portrait.png'
import {
  aboutContent,
  blogPosts,
  industryPages,
  navigationItems,
  projects,
  servicePages,
} from './siteContent'
import brandLogoImage from './assets/logo.png'

const emailAddress = 'georgebrennan932@gmail.com'
const phoneNumber = '+44 7707 287340'
const phoneLink = 'tel:+447707287340'
const whatsappNumberInternational = '447707287340'
const whatsappNumberLocal = '07707 287340'
const whatsappPrefill =
  ' Hi George, I am interested in working with GB Digital Solutions. Can i have more information please?'
const whatsappLink = `https://wa.me/${whatsappNumberInternational}?text=${encodeURIComponent(whatsappPrefill)}`
const weekdayHours = '9:00am - 6:00pm'

const businessHours = [
  { day: 'Monday', hours: weekdayHours },
  { day: 'Tuesday', hours: weekdayHours },
  { day: 'Wednesday', hours: weekdayHours },
  { day: 'Thursday', hours: weekdayHours },
  { day: 'Friday', hours: weekdayHours },
  { day: 'Saturday', hours: '10:00am - 2:00pm' },
  { day: 'Sunday', hours: 'Closed' },
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const iconMap = {
  'Website Design': Globe,
  'Mobile App Development': Smartphone,
  'AI Chatbots': Bot,
  'Business Automation': Workflow,
  'Automated Call Systems': PhoneCall,
  'Smart Booking Systems': CalendarDays,
  'Custom Business Software': Code2,
}

const primaryDesktopNav = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}

function getServiceBySlug(slug) {
  return servicePages.find((service) => service.slug === slug)
}

function getIndustryBySlug(slug) {
  return industryPages.find((industry) => industry.slug === slug)
}

function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

function getRouteTitle(path) {
  if (path === '/') {
    return 'GB Digital Solutions | Websites, Apps and Automation'
  }

  if (path === '/about') {
    return 'About | GB Digital Solutions'
  }

  if (path === '/services') {
    return 'Services | GB Digital Solutions'
  }

  if (path === '/portfolio') {
    return 'Portfolio | GB Digital Solutions'
  }

  if (path === '/industries') {
    return 'Industries | GB Digital Solutions'
  }

  if (path === '/blog') {
    return 'Blog | GB Digital Solutions'
  }

  if (path === '/contact') {
    return 'Contact | GB Digital Solutions'
  }

  if (path === '/smart-booking-systems') {
    return 'Smart Booking Systems | GB Digital Solutions'
  }

  if (path.startsWith('/services/')) {
    return `${getServiceBySlug(path.split('/')[2])?.title ?? 'Service'} | GB Digital Solutions`
  }

  if (path.startsWith('/portfolio/')) {
    return `${getProjectBySlug(path.split('/')[2])?.title ?? 'Project'} | GB Digital Solutions`
  }

  if (path.startsWith('/industries/')) {
    return `${getIndustryBySlug(path.split('/')[2])?.title ?? 'Industry'} | GB Digital Solutions`
  }

  if (path.startsWith('/blog/')) {
    return `${getBlogPostBySlug(path.split('/')[2])?.title ?? 'Resource'} | GB Digital Solutions`
  }

  return 'GB Digital Solutions'
}

function matchRoute(path) {
  const currentPath = normalizePath(path)
  const segments = currentPath.split('/').filter(Boolean)

  if (segments.length === 0) {
    return { type: 'home' }
  }

  if (currentPath === '/about') {
    return { type: 'about' }
  }

  if (currentPath === '/services') {
    return { type: 'services-index' }
  }

  if (currentPath === '/portfolio') {
    return { type: 'portfolio-index' }
  }

  if (currentPath === '/industries') {
    return { type: 'industries-index' }
  }

  if (currentPath === '/blog') {
    return { type: 'blog-index' }
  }

  if (currentPath === '/contact') {
    return { type: 'contact' }
  }

  if (currentPath === '/smart-booking-systems') {
    return { type: 'booking-landing' }
  }

  if (segments[0] === 'services' && segments[1]) {
    return { type: 'service-detail', slug: segments[1] }
  }

  if (segments[0] === 'portfolio' && segments[1]) {
    return { type: 'project-detail', slug: segments[1] }
  }

  if (segments[0] === 'industries' && segments[1]) {
    return { type: 'industry-detail', slug: segments[1] }
  }

  if (segments[0] === 'blog' && segments[1]) {
    return { type: 'blog-detail', slug: segments[1] }
  }

  return { type: 'home' }
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#168BFF]">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description ? <p className="mt-4 text-base leading-8 text-[#C8D6E5] sm:text-lg">{description}</p> : null}
    </div>
  )
}

function BrandLogo({ className = '', large = false }) {
  const [useFallback, setUseFallback] = useState(false)

  if (!useFallback) {
    return (
      <img
        src={brandLogoImage}
        alt="GB Digital Solutions logo"
        className={className || (large ? 'h-24 w-24 object-contain' : 'h-11 w-11 object-contain')}
        onError={() => setUseFallback(true)}
      />
    )
  }

  return (
    <span className={`inline-flex items-center justify-center rounded-2xl bg-[#168BFF] text-sm font-bold tracking-[0.2em] text-white ${large ? 'h-24 w-24 text-2xl' : 'h-11 w-11'} ${className}`}>
      GB
    </span>
  )
}

function LinkButton({ to, navigate, children, variant = 'primary', className = '' }) {
  const styles = {
    primary:
      'bg-gradient-to-r from-[#0E5FA8] to-[#0B4B87] text-white shadow-lg shadow-[#0E5FA8]/30 hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(14,95,168,0.4)]',
    secondary:
      'border border-white/35 bg-transparent text-white hover:-translate-y-[3px] hover:border-[#4CC9FF]/50 hover:bg-white/5',
    dark: 'bg-gradient-to-r from-[#0E5FA8] to-[#0B4B87] text-white shadow-lg shadow-[#0E5FA8]/30 hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(14,95,168,0.4)]',
    ghost: 'text-[#C8D6E5] hover:text-[#169CFF]',
  }

  return (
    <a
      href={to}
      onClick={(event) => {
        if (to.startsWith('/')) {
          event.preventDefault()
          navigate(to)
        }
      }}
      className={`inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-semibold transition duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

function NavLink({ item, currentPath, navigate, className = '' }) {
  const isActive =
    currentPath === item.path ||
    (item.path !== '/' && currentPath.startsWith(item.path))

  return (
    <a
      href={item.path}
      aria-current={isActive ? 'page' : undefined}
      onClick={(event) => {
        event.preventDefault()
        navigate(item.path)
      }}
      className={className || `text-sm font-medium transition duration-300 ${isActive ? 'text-white' : 'text-[#C8D3E0] hover:text-[#169CFF] hover:drop-shadow-[0_0_12px_rgba(76,201,255,0.45)]'}`}
    >
      {item.label}
    </a>
  )
}

function BrowserFrame({ children }) {
  return (
    <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0D2345] shadow-[0_24px_60px_rgba(5,15,35,0.35)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_32px_72px_rgba(22,156,255,0.16)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#0D2345] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#4CC9FF]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#168BFF]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#0E5FA8]" />
      </div>
      <div className="bg-[#0D2345] p-4 sm:p-5">{children}</div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="mx-auto w-[220px] rounded-[2.2rem] border-[10px] border-slate-950 bg-[#081A33] p-2 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="mx-auto mb-2 h-1.5 w-20 rounded-full bg-slate-700" />
      <div className="overflow-hidden rounded-[1.5rem] bg-[#0D2345]">{children}</div>
    </div>
  )
}

function TabletFrame({ children }) {
  return (
    <div className="mx-auto rounded-[2rem] border-[8px] border-slate-900 bg-[#081A33] p-3 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="overflow-hidden rounded-[1.5rem] bg-[#0D2345]">{children}</div>
    </div>
  )
}

function ScreenshotImage({ image, onOpen }) {
  return (
    <div className="flex h-[220px] w-full items-center justify-center rounded-[1.2rem] bg-slate-100 p-3 sm:h-[260px]">
      <button
        type="button"
        onClick={() => onOpen?.(image)}
        className="h-full w-full cursor-zoom-in rounded-[0.9rem] outline-none transition hover:scale-[1.01] focus:ring-4 focus:ring-[#168BFF]/20"
        aria-label="Open project image full screen"
      >
        <img
          src={image}
          alt="Project screenshot"
          loading="lazy"
          className="h-full w-full rounded-[0.9rem] object-contain object-center"
        />
      </button>
    </div>
  )
}

function MockInterface({ mock }) {
  switch (mock) {
    case 'website-agency':
      return (
        <div className="space-y-4">
          <div className="rounded-[1.4rem] bg-blue-50 p-5">
            <div className="h-3 w-28 rounded-full bg-blue-200" />
            <div className="mt-4 h-8 w-2/3 rounded-2xl bg-[#0D2345]" />
            <div className="mt-3 h-3 w-full rounded-full bg-[#0D2345]" />
            <div className="mt-2 h-3 w-4/5 rounded-full bg-[#0D2345]" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-[#0D2345] p-4">
                <div className="h-10 rounded-2xl bg-slate-200" />
                <div className="mt-3 h-3 w-2/3 rounded-full bg-slate-200" />
                <div className="mt-2 h-3 w-full rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      )
    case 'website-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-blue-50 p-4">
            <div className="h-3 w-16 rounded-full bg-blue-200" />
            <div className="mt-3 h-5 w-4/5 rounded-full bg-[#0D2345]" />
            <div className="mt-2 h-3 w-full rounded-full bg-[#0D2345]" />
          </div>
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-[1.1rem] bg-[#0D2345] p-3">
              <div className="h-3 w-20 rounded-full bg-slate-200" />
              <div className="mt-2 h-3 w-full rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      )
    case 'clinic-site':
      return (
        <div className="space-y-4">
          <div className="rounded-[1.4rem] bg-rose-50 p-5">
            <div className="h-3 w-24 rounded-full bg-rose-200" />
            <div className="mt-4 h-8 w-3/5 rounded-2xl bg-[#0D2345]" />
            <div className="mt-3 h-3 w-full rounded-full bg-[#0D2345]" />
            <div className="mt-2 h-3 w-4/5 rounded-full bg-[#0D2345]" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['Anti-wrinkle', 'Skin boosters', 'Consultation', 'Aftercare'].map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-[#0D2345] p-4">
                <div className="h-20 rounded-[1rem] bg-rose-100" />
                <div className="mt-3 text-sm font-semibold text-[#d6e2ef]">{item}</div>
              </div>
            ))}
          </div>
        </div>
      )
    case 'clinic-services':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {['Consultation', 'Treatment guide', 'Book appointment', 'Aftercare notes'].map((item) => (
            <div key={item} className="rounded-[1.2rem] bg-rose-50 p-4">
              <div className="h-3 w-20 rounded-full bg-rose-200" />
              <div className="mt-3 text-sm font-semibold text-[#d6e2ef]">{item}</div>
            </div>
          ))}
        </div>
      )
    case 'clinic-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-rose-50 p-4">
            <div className="text-sm font-semibold text-white">Choose a treatment</div>
            <div className="mt-3 space-y-2">
              {['Lip filler consultation', 'Botox review', 'Skin booster'].map((item) => (
                <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#d0dbea]">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 text-sm text-[#C8D3E0]">Tap to book consultation</div>
        </div>
      )
    case 'restaurant-site':
      return (
        <div className="space-y-4">
          <div className="rounded-[1.4rem] bg-amber-50 p-5">
            <div className="h-3 w-20 rounded-full bg-amber-200" />
            <div className="mt-4 h-8 w-3/5 rounded-2xl bg-[#0D2345]" />
            <div className="mt-3 h-3 w-full rounded-full bg-[#0D2345]" />
          </div>
          <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.2rem] bg-[#0D2345] p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">Book a table</div>
              <div className="mt-3 grid gap-2">
                {['Date', 'Time', 'Guests'].map((item) => (
                  <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] bg-[#0D2345] p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">Menu highlights</div>
              <div className="mt-3 space-y-2">
                {['Small plates', 'Mains', 'Desserts'].map((item) => (
                  <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    case 'restaurant-menu':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {['Starters', 'Mains', 'Sides', 'Drinks'].map((item) => (
            <div key={item} className="rounded-[1.2rem] bg-amber-50 p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">{item}</div>
              <div className="mt-2 h-3 w-full rounded-full bg-[#0D2345]" />
              <div className="mt-2 h-3 w-4/5 rounded-full bg-[#0D2345]" />
            </div>
          ))}
        </div>
      )
    case 'restaurant-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-amber-50 p-4 text-sm font-semibold text-[#d6e2ef]">Reserve tonight</div>
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 ring-1 ring-white/10">
            <div className="text-sm text-[#C8D3E0]">Time</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {['18:00', '19:30', '20:45'].map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-[#d0dbea]">{item}</span>
              ))}
            </div>
          </div>
        </div>
      )
    case 'trades-site':
      return (
        <div className="space-y-4">
          <div className="rounded-[1.4rem] bg-blue-50 p-5">
            <div className="h-3 w-24 rounded-full bg-blue-200" />
            <div className="mt-4 h-8 w-3/5 rounded-2xl bg-[#0D2345]" />
            <div className="mt-3 h-3 w-full rounded-full bg-[#0D2345]" />
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.2rem] bg-[#0D2345] p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">Request a quote</div>
              <div className="mt-3 space-y-2">
                {['Job type', 'Postcode', 'Best contact method'].map((item) => (
                  <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] bg-[#0D2345] p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">Proof of work</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-16 rounded-xl bg-slate-200" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    case 'trades-quote':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-blue-50 p-4 text-sm font-semibold text-[#d6e2ef]">Quote request details</div>
          {['Urgency', 'Photo upload', 'Preferred appointment'].map((item) => (
            <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-3 text-sm text-[#C8D3E0]">{item}</div>
          ))}
        </div>
      )
    case 'trades-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-blue-50 p-4 text-sm font-semibold text-white">Call now or request a quote</div>
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 ring-1 ring-white/10 text-sm text-[#C8D3E0]">Fast mobile enquiry flow</div>
        </div>
      )
    case 'booking-dashboard':
      return (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.2rem] bg-[#0D2345] p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">Working hours</div>
              <div className="mt-3 space-y-2">
                {['Mon-Fri', 'Break windows', 'Treatment lengths'].map((item) => (
                  <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] bg-blue-50 p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">Diary updates</div>
              <div className="mt-3 space-y-2">
                {['New booking confirmed', 'Reminder scheduled', 'Staff notified'].map((item) => (
                  <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">{item}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-[#d6e2ef]">Upcoming bookings</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {['Consultation', 'Treatment review', 'Botox follow-up'].map((item) => (
                <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-3 text-sm text-[#C8D3E0]">{item}</div>
              ))}
            </div>
          </div>
        </div>
      )
    case 'booking-calendar':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4">
            <div className="text-sm font-semibold text-[#d6e2ef]">Available slots</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {['09:30', '10:30', '12:15', '14:00', '15:45', '17:00'].map((item) => (
                <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-3 text-sm text-[#C8D3E0]">{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.2rem] bg-blue-50 p-4">
            <div className="text-sm font-semibold text-[#d6e2ef]">Booking rules</div>
            <div className="mt-3 space-y-2">
              {['Treatment duration', 'Breaks respected', 'Diary synced'].map((item) => (
                <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">{item}</div>
              ))}
            </div>
          </div>
        </div>
      )
    case 'booking-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-blue-50 p-4 text-sm font-semibold text-white">Choose a treatment</div>
          {['Botox consultation', 'Skin booster', 'Follow-up review'].map((item) => (
            <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-3 text-sm text-[#C8D3E0] ring-1 ring-white/10">{item}</div>
          ))}
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 text-sm text-[#C8D3E0]">Pick a valid appointment slot</div>
        </div>
      )
    case 'chatbot-desktop':
      return (
        <div className="space-y-3">
          <div className="max-w-[75%] rounded-[1.3rem] rounded-bl-md bg-slate-100 px-4 py-3 text-sm text-[#d0dbea]">
            I need help booking a service.
          </div>
          <div className="ml-auto max-w-[80%] rounded-[1.3rem] rounded-br-md bg-[#168BFF] px-4 py-3 text-sm text-white">
            I can help with that. Which treatment or service are you looking for?
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Consultation', 'Boiler service', 'Need a quote'].map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-[#C8D3E0]">{item}</span>
            ))}
          </div>
        </div>
      )
    case 'chatbot-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-slate-100 px-3 py-3 text-sm text-[#d0dbea]">Tell me what you need help with.</div>
          <div className="rounded-[1.2rem] bg-[#168BFF] px-3 py-3 text-sm text-white">I can guide the next step and collect details.</div>
          <div className="flex flex-wrap gap-2">
            {['Book', 'Ask a question', 'Get quote'].map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-[#d0dbea]">{item}</span>
            ))}
          </div>
        </div>
      )
    case 'chatbot-handoff':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 text-sm text-[#d0dbea]">Qualified lead summary</div>
          <div className="rounded-[1.2rem] bg-blue-50 p-4 text-sm text-[#d0dbea]">Send to team or booking flow</div>
        </div>
      )
    case 'automation-pipeline':
      return (
        <div className="grid gap-3 sm:grid-cols-4">
          {['Lead received', 'Quote sent', 'Reminder scheduled', 'Follow-up queued'].map((item) => (
            <div key={item} className="rounded-[1.2rem] bg-[#0D2345] p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">{item}</div>
              <div className="mt-2 h-3 w-full rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      )
    case 'automation-board':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {['New leads', 'Waiting review', 'Completed actions'].map((item) => (
            <div key={item} className="rounded-[1.2rem] bg-[#0D2345] p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">{item}</div>
              <div className="mt-3 space-y-2">
                {[1, 2, 3].map((value) => (
                  <div key={value} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">Task item</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    case 'automation-mobile':
      return (
        <div className="space-y-3 p-4">
          {['Lead captured', 'Reminder ready', 'Awaiting reply'].map((item) => (
            <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-3 text-sm text-[#C8D3E0]">{item}</div>
          ))}
        </div>
      )
    case 'call-system':
      return (
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4">
            <div className="text-sm font-semibold text-[#d6e2ef]">Call queue</div>
            <div className="mt-3 space-y-2">
              {['Appointment reminder', 'Follow-up call', 'Service confirmation'].map((item) => (
                <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.2rem] bg-blue-50 p-4">
            <div className="text-sm font-semibold text-[#d6e2ef]">Call status</div>
            <div className="mt-3 space-y-2">
              {['Queued', 'Calling', 'Delivered'].map((item) => (
                <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">{item}</div>
              ))}
            </div>
          </div>
        </div>
      )
    case 'call-system-mobile':
      return (
        <div className="space-y-3 p-4">
          {['Reminder ready', 'Next call trigger', 'Delivery update'].map((item) => (
            <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-3 text-sm text-[#C8D3E0]">{item}</div>
          ))}
        </div>
      )
    case 'call-system-queue':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 text-sm text-[#d0dbea]">Reminder campaigns</div>
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 ring-1 ring-white/10 text-sm text-[#d0dbea]">Call reporting</div>
        </div>
      )
    case 'custom-software':
      return (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.2rem] bg-[#0D2345] p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">Workflow dashboard</div>
              <div className="mt-3 grid gap-2">
                {['Open tasks', 'Approvals', 'Jobs in progress'].map((item) => (
                  <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] bg-blue-50 p-4">
              <div className="text-sm font-semibold text-[#d6e2ef]">Role-based tools</div>
              <div className="mt-3 space-y-2">
                {['Admin', 'Operations', 'Staff'].map((item) => (
                  <div key={item} className="rounded-xl bg-[#0D2345] px-3 py-2 text-sm text-[#C8D3E0]">{item}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-[#d6e2ef]">Record view</div>
            <div className="mt-3 h-28 rounded-[1rem] bg-[#0D2345]" />
          </div>
        </div>
      )
    case 'custom-software-tablet':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 text-sm text-[#d0dbea]">Client records</div>
          <div className="rounded-[1.2rem] bg-blue-50 p-4 text-sm text-[#d0dbea]">Workflow approvals</div>
        </div>
      )
    case 'custom-software-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-xl bg-[#0D2345] px-3 py-3 text-sm text-[#d0dbea]">Assigned task</div>
          <div className="rounded-xl bg-[#0D2345] px-3 py-3 text-sm text-[#d0dbea] ring-1 ring-white/10">Status update</div>
        </div>
      )
    case 'nightpal-support':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 text-sm text-[#d0dbea]">Trusted contacts</div>
          <div className="rounded-[1.2rem] bg-blue-50 p-4 text-sm text-[#d0dbea]">Safety actions</div>
        </div>
      )
    case 'platemate-flow':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {['Log meal', 'Review guidance', 'Track progress'].map((item) => (
            <div key={item} className="rounded-[1.2rem] bg-[#0D2345] p-4 text-sm text-[#d0dbea]">{item}</div>
          ))}
        </div>
      )
    case 'vault-admin':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 text-sm text-[#d0dbea]">Catalogue management</div>
          <div className="rounded-[1.2rem] bg-[#0D2345] p-4 ring-1 ring-white/10 text-sm text-[#d0dbea]">Stock and order tools</div>
        </div>
      )
    default:
      return <div className="h-40 rounded-[1.4rem] bg-[#0D2345]" />
  }
}

function DeviceMock({ shot, onOpenImage }) {
  const content = shot.image ? <ScreenshotImage image={shot.image} onOpen={onOpenImage} /> : <MockInterface mock={shot.mock} />

  if (shot.device === 'phone') {
    return <PhoneFrame>{content}</PhoneFrame>
  }

  if (shot.device === 'tablet') {
    return <TabletFrame>{content}</TabletFrame>
  }

  return <BrowserFrame>{content}</BrowserFrame>
}

function MediaSlotLabel({ shot }) {
  if (shot.image || !shot.placeholderFileName) {
    return null
  }

  return (
    <div className="mb-3 inline-flex rounded-full border border-dashed border-[#168BFF]/40 bg-[#0D2345] px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-[#168BFF]">
      Add {shot.placeholderFileName}
    </div>
  )
}

function ServiceCard({ service, navigate, index, compact = false }) {
  const Icon = iconMap[service.title]

  return (
    <Reveal delay={index * 0.05}>
      <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#168BFF]">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="font-display text-xl font-semibold text-white">{service.title}</h2>
        </div>
        <p className="mt-4 text-sm leading-7 text-[#C8D3E0]">{service.summary}</p>
        {!compact ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9eb2c8]">Who it is for</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#C8D3E0]">
                {service.whoFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9eb2c8]">Problems it solves</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#C8D3E0]">
                {service.problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9eb2c8]">Benefits</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#C8D3E0]">
                {service.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        {service.flagshipPath ? (
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton to={service.flagshipPath} navigate={navigate} variant="ghost" className="px-0 py-3">
              Flagship booking journey
              <ChevronRight className="ml-2 h-4 w-4" />
            </LinkButton>
          </div>
        ) : null}
      </article>
    </Reveal>
  )
}

function ProjectCard({ project, navigate, index, compact = false, onOpenImage }) {
  const primaryShot = project.gallery[0]

  return (
    <Reveal delay={index * 0.04}>
      <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D2345] shadow-[0_20px_50px_rgba(5,15,35,0.35)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_30px_68px_rgba(22,156,255,0.16)]">
        <div className="bg-[#0D2345] p-4">
          <MediaSlotLabel shot={primaryShot} />
          <DeviceMock shot={primaryShot} onOpenImage={onOpenImage} />
        </div>
        <div className="p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BFF]">{project.industry}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-white">{project.title}</h2>
          <p className="mt-3 text-sm leading-7 text-[#C8D3E0]">{project.overview}</p>
          {!compact ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9eb2c8]">Problem</p>
                <p className="mt-2 text-sm leading-7 text-[#C8D3E0]">{project.problem}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9eb2c8]">Features</p>
                <ul className="mt-2 space-y-2 text-sm leading-7 text-[#C8D3E0]">
                  {project.features.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          <div className="mt-6">
            <LinkButton to={`/portfolio/${project.slug}`} navigate={navigate} variant="secondary" className="px-5 py-3">
              View Case Study
            </LinkButton>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function PortfolioPreviewTile({ project, navigate, index, onOpenImage }) {
  const primaryShot = project.gallery[0]

  return (
    <Reveal delay={index * 0.05}>
      <article className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0D2345] shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
        <div className="bg-[#0D2345] p-3">
          <MediaSlotLabel shot={primaryShot} />
          <DeviceMock shot={primaryShot} onOpenImage={onOpenImage} />
        </div>
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#168BFF]">{project.industry}</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-white">{project.title}</h2>
          </div>
          <LinkButton to={`/portfolio/${project.slug}`} navigate={navigate} variant="ghost" className="px-0 py-2">
            Open
            <ChevronRight className="ml-1 h-4 w-4" />
          </LinkButton>
        </div>
      </article>
    </Reveal>
  )
}

function ArticleCard({ post, navigate, index }) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BFF]">{post.category}</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-white">{post.title}</h2>
        <p className="mt-3 text-sm leading-7 text-[#C8D3E0]">{post.excerpt}</p>
        <div className="mt-6">
          <LinkButton to={`/blog/${post.slug}`} navigate={navigate} variant="secondary" className="px-5 py-3">
            Read Article
          </LinkButton>
        </div>
      </article>
    </Reveal>
  )
}

function IndustryCard({ industry, navigate, index }) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BFF]">Industry focus</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-white">{industry.title}</h2>
        <p className="mt-3 text-sm leading-7 text-[#C8D3E0]">{industry.summary}</p>
        <div className="mt-6">
          <LinkButton to={`/industries/${industry.slug}`} navigate={navigate} variant="secondary" className="px-5 py-3">
            See Industry Detail
          </LinkButton>
        </div>
      </article>
    </Reveal>
  )
}

function QuoteForm() {
  const [formState, setFormState] = useState({
    name: '',
    business: '',
    email: '',
    service: servicePages[0].title,
    brief: '',
  })

  function handleChange(field) {
    return (event) => {
      setFormState((current) => ({ ...current, [field]: event.target.value }))
    }
  }

  const whatsappMessage = [
    'Hi George, I want a quote.',
    `Name: ${formState.name || '-'}`,
    `Business: ${formState.business || '-'}`,
    `Email: ${formState.email || '-'}`,
    `Service: ${formState.service || '-'}`,
    'Brief:',
    formState.brief || '-',
  ].join('\n')
  const whatsappFormLink = `https://wa.me/${whatsappNumberInternational}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <form
      action={`https://formsubmit.co/${emailAddress}`}
      method="POST"
      className="rounded-[2rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_20px_50px_rgba(5,15,35,0.35)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_30px_68px_rgba(22,156,255,0.16)] sm:p-7"
    >
      <input type="hidden" name="_subject" value="New GB Digital Solutions enquiry" />
      <input type="hidden" name="_captcha" value="false" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BFF]">Get free quote</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-white">Tell George what you need</h2>
        </div>
        <BriefcaseBusiness className="mt-1 h-6 w-6 text-[#168BFF]" />
      </div>
      <p className="mt-4 text-sm leading-7 text-[#C8D3E0]">
        Send this form directly via FormSubmit or use WhatsApp with the same enquiry details.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[#d0dbea]">
          Name
          <input required name="name" type="text" value={formState.name} onChange={handleChange('name')} className="rounded-2xl border border-white/10 px-4 py-3 outline-none transition focus:border-[#168BFF]/60 focus:ring-4 focus:ring-[#168BFF]/20" placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#d0dbea]">
          Business
          <input required name="business" type="text" value={formState.business} onChange={handleChange('business')} className="rounded-2xl border border-white/10 px-4 py-3 outline-none transition focus:border-[#168BFF]/60 focus:ring-4 focus:ring-[#168BFF]/20" placeholder="Business name" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#d0dbea]">
          Email
          <input required name="email" type="email" value={formState.email} onChange={handleChange('email')} className="rounded-2xl border border-white/10 px-4 py-3 outline-none transition focus:border-[#168BFF]/60 focus:ring-4 focus:ring-[#168BFF]/20" placeholder="you@business.com" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#d0dbea]">
          Service
          <select name="service" value={formState.service} onChange={handleChange('service')} className="rounded-2xl border border-white/10 px-4 py-3 outline-none transition focus:border-[#168BFF]/60 focus:ring-4 focus:ring-[#168BFF]/20">
            {servicePages.map((service) => (
              <option key={service.slug} value={service.title}>{service.title}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#d0dbea] md:col-span-2">
          Brief
          <textarea required name="brief" rows={6} value={formState.brief} onChange={handleChange('brief')} className="rounded-2xl border border-white/10 px-4 py-3 outline-none transition focus:border-[#168BFF]/60 focus:ring-4 focus:ring-[#168BFF]/20" placeholder="What do you need, what is causing friction, and what would a better outcome look like?" />
        </label>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#0E5FA8] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#0E5FA8]/30 transition hover:bg-[#0B4B87]">
            Send Enquiry
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <a
            href={whatsappFormLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#0F7A45] px-6 py-4 text-sm font-semibold !text-white shadow-lg shadow-[#0F7A45]/30 transition hover:bg-[#0C6338]"
          >
            Send on WhatsApp ({whatsappNumberLocal})
            <PhoneCall className="ml-2 h-4 w-4" />
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#9eb2c8]">
          <Clock3 className="h-4 w-4" />
          FormSubmit sends to {emailAddress}.
        </div>
      </div>
    </form>
  )
}

function HomePage({ navigate, onOpenImage }) {
  const featuredProjects = ['restaurant-website', 'tradesman-website', 'booking-system']
    .map(getProjectBySlug)
    .filter(Boolean)

  const servicesPreview = [
    {
      title: 'Website Design',
      summary: 'Premium websites built for trust, speed and conversion.',
      icon: Globe,
    },
    {
      title: 'Mobile Apps',
      summary: 'iOS and Android experiences designed around real workflows.',
      icon: Smartphone,
    },
    {
      title: 'AI Integration',
      summary: 'Practical AI features for support, bookings and lead handling.',
      icon: Bot,
    },
    {
      title: 'Business Automation',
      summary: 'Automations that remove repetitive admin and manual follow-up.',
      icon: Workflow,
    },
  ]

  const whyPoints = ['Custom Built', 'Fast Performance', 'AI Powered', 'Ongoing Support']

  return (
    <>
      <section className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden bg-[#0B1220]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(22,139,255,0.32),transparent_30%),radial-gradient(circle_at_78%_78%,rgba(22,139,255,0.18),transparent_32%),linear-gradient(160deg,#0b1220_0%,#121b30_60%,#0b1220_100%)]" />
        <motion.div
          className="pointer-events-none absolute -left-20 top-14 h-60 w-60 rounded-full bg-[#168BFF]/25 blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#168BFF]/20 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex w-fit items-center justify-center rounded-[2rem] border border-white/15 bg-[#0D2345]/5 p-4 shadow-[0_22px_60px_rgba(22,139,255,0.3)]">
              <BrandLogo large className="h-24 w-24 rounded-[1.5rem]" />
            </div>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Websites, Apps and AI that help businesses grow.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#C8D3E0] sm:text-lg">
              We build premium websites, mobile apps, AI tools and automation designed to save time, win customers and simplify your business.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton to="/contact" navigate={navigate} variant="primary" className="px-7 py-4">
                Get Free Quote
              </LinkButton>
              <LinkButton to="/portfolio" navigate={navigate} variant="secondary" className="border-white/25 bg-[#0D2345]/10 text-white hover:bg-[#0D2345]/15 hover:text-white">
                View Portfolio
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="Featured Work"
              title="Featured Projects"
              description="A quick look at polished build quality before you dive into the full portfolio."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 xl:grid-cols-3">
            {featuredProjects.map((project, index) => {
              const primaryShot = project.gallery[0]

              return (
                <Reveal key={project.slug} delay={index * 0.05}>
                  <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D2345] shadow-[0_20px_50px_rgba(5,15,35,0.35)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_30px_68px_rgba(22,156,255,0.16)]">
                    <div className="bg-[#0D2345] p-4">
                      <DeviceMock shot={primaryShot} onOpenImage={onOpenImage} />
                    </div>
                    <div className="p-6">
                      <h2 className="font-display text-2xl font-semibold text-white">{project.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-[#C8D3E0]">{project.overview}</p>
                      <div className="mt-6">
                        <LinkButton to={`/portfolio/${project.slug}`} navigate={navigate} variant="secondary" className="px-5 py-3">
                          View Project
                        </LinkButton>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.12} className="mt-10 flex justify-center sm:justify-start">
            <LinkButton to="/portfolio" navigate={navigate} variant="primary" className="px-6 py-4">
              View Full Portfolio
            </LinkButton>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0D2345] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="Services"
              title="Services Preview"
              description="A concise overview of the core build capabilities."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {servicesPreview.map((item, index) => {
              const Icon = item.icon

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#168BFF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-5 font-display text-xl font-semibold text-white">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[#C8D3E0]">{item.summary}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="Why GB Digital Solutions"
              title="Built for growth"
              description=""
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {whyPoints.map((point, index) => (
              <Reveal key={point} delay={index * 0.04}>
                <div className="flex items-center gap-3 rounded-[1.3rem] border border-white/10 bg-[#0D2345] px-5 py-4 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-[#d6e2ef]">{point}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12} className="mt-8">
            <LinkButton to="/about" navigate={navigate} variant="secondary" className="px-6 py-4">
              About George
            </LinkButton>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[2.2rem] border border-[#1d2c4a] bg-[#0B1220] px-6 py-12 text-white shadow-[0_35px_90px_rgba(11,18,32,0.4)] sm:px-10">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#7eb8ff]">Ready to build your next project?</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Start with a focused conversation.</h2>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <LinkButton to="/contact" navigate={navigate} variant="primary" className="px-6 py-4">
                  Get Free Quote
                </LinkButton>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#0F7A45] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0C6338]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function AboutPage({ navigate }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow={aboutContent.hero.eyebrow} title={aboutContent.hero.title} description={aboutContent.hero.description} />
      </Reveal>
      <div className="mt-12 grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D2345] shadow-[0_24px_60px_rgba(5,15,35,0.35)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_32px_72px_rgba(22,156,255,0.16)]">
            <img src={aboutPortrait} alt="Professional headshot" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <div className="grid gap-6">
          <Reveal delay={0.04}>
            <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
              <h2 className="font-display text-2xl font-semibold text-white">Who I am</h2>
              <p className="mt-4 text-base leading-8 text-[#C8D3E0]">{aboutContent.whoIAm}</p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6">
              <h2 className="font-display text-2xl font-semibold text-white">My journey</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {aboutContent.journey.map((item) => (
                  <div key={item} className="rounded-[1.2rem] bg-[#0D2345] p-4 shadow-sm ring-1 ring-white/10 text-sm text-[#d0dbea]">{item}</div>
                ))}
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.12}>
            <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
              <h2 className="font-display text-2xl font-semibold text-white">Why I started GB Digital Solutions</h2>
              <p className="mt-4 text-base leading-8 text-[#C8D3E0]">{aboutContent.whyStarted}</p>
            </article>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">My values</h2>
            <div className="mt-4 space-y-4">
              {aboutContent.values.map((item) => (
                <div key={item.title} className="rounded-[1.2rem] bg-[#0D2345] p-4">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#C8D3E0]">{item.description}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">How I work with clients</h2>
            <div className="mt-4 space-y-4">
              {aboutContent.workStyle.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.2rem] bg-[#0D2345] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#168BFF]" />
                  <p className="text-sm leading-7 text-[#C8D3E0]">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-10">
        <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6">
          <h2 className="font-display text-2xl font-semibold text-white">Timeline of experience</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            {aboutContent.timeline.map((item) => (
              <div key={item.label} className="rounded-[1.3rem] bg-[#0D2345] p-5 shadow-sm ring-1 ring-white/10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BFF]">{item.label}</p>
                <p className="mt-3 text-sm leading-7 text-[#C8D3E0]">{item.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.12} className="mt-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold text-white">See how that experience translates into real build work.</h2>
              <p className="mt-3 text-base leading-8 text-[#C8D3E0]">The strongest next step is to look at the case studies and see how the thinking shows up in real project outputs.</p>
            </div>
            <LinkButton to={aboutContent.cta.path} navigate={navigate} variant="dark">
              {aboutContent.cta.label}
            </LinkButton>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function PortfolioIndexPage({ navigate, onOpenImage }) {
  const visualProjects = projects.slice(0, 4)
  const remainingProjects = projects.slice(visualProjects.length)

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <Reveal>
        <SectionTitle eyebrow="Portfolio" title="See the software, interfaces and journeys behind the pitch." description="Every case study leads with the business problem, then shows the solution, the build approach and what needs to be verified as more projects go live." />
      </Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4 sm:mt-10">
        {visualProjects.map((project, index) => (
          <PortfolioPreviewTile key={`${project.slug}-preview`} project={project} navigate={navigate} index={index} onOpenImage={onOpenImage} />
        ))}
      </div>
      {remainingProjects.length > 0 && (
        <div className="mt-8 grid gap-8 xl:grid-cols-2 sm:mt-10">
          {remainingProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} navigate={navigate} index={index} onOpenImage={onOpenImage} />
          ))}
        </div>
      )}
    </div>
  )
}

function CaseStudyPage({ navigate, project, onOpenImage }) {
  if (!project) {
    return <NotFoundPage navigate={navigate} />
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow={project.industry} title={project.title} description={project.overview} />
      </Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-4">
        {[
          ['Client', project.client],
          ['Industry', project.industry],
          ['Status', project.status],
          ['Technologies', project.technologies.join(', ')],
        ].map(([label, value], index) => (
          <Reveal key={label} delay={index * 0.04}>
            <article className="rounded-[1.6rem] border border-white/10 bg-[#0D2345] p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168BFF]">{label}</p>
              <p className="mt-3 text-sm leading-7 text-[#C8D3E0]">{value}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Problem</h2>
            <p className="mt-4 text-base leading-8 text-[#C8D3E0]">{project.problem}</p>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Solution</h2>
            <p className="mt-4 text-base leading-8 text-[#C8D3E0]">{project.solution}</p>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-10">
        <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6">
          <h2 className="font-display text-2xl font-semibold text-white">Features</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.features.map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-[#0D2345] p-4 shadow-sm ring-1 ring-white/10 text-sm text-[#d0dbea]">{item}</div>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
          <h2 className="font-display text-2xl font-semibold text-white">Image gallery</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {project.gallery.map((shot, index) => (
              <Reveal key={`${project.slug}-${index}`} delay={index * 0.05}>
                <DeviceMock shot={shot} onOpenImage={onOpenImage} />
              </Reveal>
            ))}
          </div>
        </article>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Results</h2>
            <ul className="mt-4 space-y-3">
              {project.results.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#C8D3E0]">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#168BFF]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Lessons learned</h2>
            <ul className="mt-4 space-y-3">
              {project.lessons.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#C8D3E0]">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#168BFF]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#081A33] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold">Start a similar project with a clearer first step.</h2>
              <p className="mt-3 text-base leading-8 text-[#C8D3E0]">The next conversation can focus on the customer journey, operational bottleneck or product idea that matters most right now.</p>
            </div>
            <LinkButton to="/contact" navigate={navigate} variant="secondary">
              Get Free Quote
            </LinkButton>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function ServicesIndexPage({ navigate }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow="Services" title="Choose the service that fixes the friction holding the business back." description="Each service has its own detail page so visitors can understand fit, benefits, process and next steps without wading through unrelated content." />
      </Reveal>
      <div className="mt-12 grid gap-6">
        {servicePages.map((service, index) => (
          <ServiceCard key={service.slug} service={service} navigate={navigate} index={index} />
        ))}
      </div>
    </div>
  )
}

function ServiceDetailPage({ navigate, service, onOpenImage }) {
  if (!service) {
    return <NotFoundPage navigate={navigate} />
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow="Service" title={service.title} description={service.summary} />
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Reveal>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Who it is for</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#C8D3E0]">
              {service.whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#168BFF]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Problems it solves</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#C8D3E0]">
              {service.problems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Benefits</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#C8D3E0]">
              {service.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-10">
        <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6">
          <h2 className="font-display text-2xl font-semibold text-white">Example screenshots</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {service.gallery.map((shot, index) => (
              <Reveal key={`${service.slug}-${index}`} delay={index * 0.05}>
                <DeviceMock shot={shot} onOpenImage={onOpenImage} />
              </Reveal>
            ))}
          </div>
        </article>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Process</h2>
            <div className="mt-4 space-y-3">
              {service.process.map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.2rem] bg-[#0D2345] p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#168BFF] text-sm font-semibold text-white">{index + 1}</div>
                  <p className="text-sm leading-7 text-[#C8D3E0]">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Frequently asked questions</h2>
            <div className="mt-4 space-y-4">
              {service.faqs.map((item) => (
                <div key={item.q} className="rounded-[1.2rem] bg-[#0D2345] p-4">
                  <h3 className="text-base font-semibold text-white">{item.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#C8D3E0]">{item.a}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#081A33] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold">Turn this service into a concrete project brief.</h2>
              <p className="mt-3 text-base leading-8 text-[#C8D3E0]">The next step is a direct conversation about fit, scope and the fastest useful version to build first.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/contact" navigate={navigate} variant="secondary">
                Get Free Quote
              </LinkButton>
              {service.flagshipPath ? (
                <LinkButton to={service.flagshipPath} navigate={navigate} variant="ghost" className="text-white hover:text-[#7eb8ff]">
                  View Flagship Journey
                  <ChevronRight className="ml-2 h-4 w-4" />
                </LinkButton>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function BookingLandingPage({ navigate, onOpenImage }) {
  const service = getServiceBySlug('smart-booking-systems')

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow="Flagship service" title="Let clients book the right appointment without the back-and-forth." description="Working hours, breaks, appointment durations, treatment lengths and reminder steps can all be built into one smoother booking journey." />
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <article className="rounded-[2rem] border border-white/10 bg-[#081A33] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#7eb8ff]">Workflow</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">From settings to confirmed booking</h2>
              </div>
              <CalendarCheck2 className="h-6 w-6 text-[#7eb8ff]" />
            </div>
            <div className="mt-6 space-y-4">
              {[
                'Clinician enters working hours, breaks, appointment durations and treatment lengths.',
                'Customer chooses a treatment.',
                'The system automatically finds valid appointment slots.',
                'Customer books a suitable slot.',
                'Confirmation is sent.',
                'Reminder is sent.',
                'Diary is updated.',
                'Staff are notified.',
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-[1.3rem] border border-white/10 bg-[#0D2345]/5 px-4 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#168BFF]/20 text-sm font-semibold text-[#8fc2ff]">{index + 1}</div>
                  <p className="text-sm leading-7 text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <div className="grid gap-6">
          <Reveal delay={0.05}>
            <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
              <h2 className="font-display text-2xl font-semibold text-white">Interactive workflow diagram</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {['Treatment selected', 'Valid slot found', 'Confirmation sent', 'Reminder queued'].map((item) => (
                  <div key={item} className="rounded-[1.2rem] bg-[#0D2345] p-4 text-sm font-medium text-[#d0dbea]">{item}</div>
                ))}
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6">
              <h2 className="font-display text-2xl font-semibold text-white">Mock booking screens and calendar UI</h2>
              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {service.gallery.map((shot, index) => (
                  <Reveal key={`booking-${index}`} delay={index * 0.04}>
                    <DeviceMock shot={shot} onOpenImage={onOpenImage} />
                  </Reveal>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Reveal>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Client booking journey</h2>
            <p className="mt-4 text-sm leading-7 text-[#C8D3E0]">Customers choose the right treatment, see only valid slots and move smoothly into confirmation without needing staff to manually check the diary.</p>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Admin dashboard</h2>
            <p className="mt-4 text-sm leading-7 text-[#C8D3E0]">Staff can manage availability rules, working patterns, confirmations and reminder behaviour without relying on awkward manual workarounds.</p>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Next step</h2>
            <p className="mt-4 text-sm leading-7 text-[#C8D3E0]">Start with the appointment rules, treatment list and current diary process, then shape the booking system around how the business actually runs.</p>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#081A33] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold">Turn booking friction into a cleaner client journey.</h2>
              <p className="mt-3 text-base leading-8 text-[#C8D3E0]">The first conversation can focus on treatments, diary rules and where the current booking process slows the team down.</p>
            </div>
            <LinkButton to="/contact" navigate={navigate} variant="secondary">
              Get Free Quote
            </LinkButton>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function IndustriesIndexPage({ navigate }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow="Industries" title="Choose the industry problems that match how your business actually operates." description="Different industries need different blends of trust, speed, booking, follow-up and operational clarity. Start with the sector that looks most like yours." />
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {industryPages.map((industry, index) => (
          <IndustryCard key={industry.slug} industry={industry} navigate={navigate} index={index} />
        ))}
      </div>
    </div>
  )
}

function IndustryDetailPage({ navigate, industry }) {
  if (!industry) {
    return <NotFoundPage navigate={navigate} />
  }

  const relevantServices = industry.serviceSlugs.map(getServiceBySlug).filter(Boolean)

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow="Industry focus" title={industry.title} description={industry.summary} />
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">Common pain points</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#C8D3E0]">
              {industry.painPoints.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#168BFF]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
            <h2 className="font-display text-2xl font-semibold text-white">How GB Digital Solutions helps</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#C8D3E0]">
              {industry.help.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-10">
        <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6">
          <h2 className="font-display text-2xl font-semibold text-white">Relevant services</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {relevantServices.map((service, index) => (
              <ServiceCard key={service.slug} service={service} navigate={navigate} index={index} compact />
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#081A33] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold">Shape a more useful digital journey for this industry.</h2>
              <p className="mt-3 text-base leading-8 text-[#C8D3E0]">The first step is identifying where trust, speed, booking or follow-up is currently leaking value.</p>
            </div>
            <LinkButton to="/contact" navigate={navigate} variant="secondary">
              Get Free Quote
            </LinkButton>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function BlogIndexPage({ navigate }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow="Resources" title="Read practical ideas for websites, automation, AI and search visibility." description="The goal is simple: useful guidance that helps a business make better digital decisions, even before a build starts." />
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {blogPosts.map((post, index) => (
          <ArticleCard key={post.slug} post={post} navigate={navigate} index={index} />
        ))}
      </div>
    </div>
  )
}

function BlogDetailPage({ navigate, post }) {
  if (!post) {
    return <NotFoundPage navigate={navigate} />
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow={post.category} title={post.title} description={post.excerpt} />
      </Reveal>
      <div className="mt-12 space-y-6">
        {post.sections.map((section, index) => (
          <Reveal key={section.heading} delay={index * 0.05}>
            <article className="rounded-[1.8rem] border border-white/10 bg-[#0D2345] p-6 shadow-[0_18px_40px_rgba(5,15,35,0.32)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_26px_60px_rgba(22,156,255,0.14)]">
              <h2 className="font-display text-2xl font-semibold text-white">{section.heading}</h2>
              <p className="mt-4 text-base leading-8 text-[#C8D3E0]">{section.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15} className="mt-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#0D2345] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white">Need this turned into a practical project?</h2>
              <p className="mt-3 text-base leading-8 text-[#C8D3E0]">Move from idea to scope by starting a direct conversation about the problem that matters most right now.</p>
            </div>
            <LinkButton to="/contact" navigate={navigate} variant="dark">
              Get Free Quote
            </LinkButton>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function ImageLightbox({ image, onClose }) {
  if (!image) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#081A33]/88 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label="Full screen project image">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0D2345]/10 text-white transition hover:bg-[#0D2345]/20"
        aria-label="Close full screen image"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="max-h-[92vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
        <img src={image} alt="Full screen project screenshot" className="max-h-[92vh] w-full rounded-[1.5rem] bg-[#0D2345] object-contain" />
      </div>
    </div>
  )
}

function FloatingWhatsAppButton() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open WhatsApp chat ${whatsappNumberLocal}`}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0F7A45] text-white shadow-[0_14px_30px_rgba(15,122,69,0.35)] transition hover:bg-[#0C6338] focus:outline-none focus:ring-4 focus:ring-[#89E4B6]/45"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.57 2 2.13 6.43 2.13 11.9c0 1.75.46 3.47 1.33 4.99L2 22l5.26-1.38a9.86 9.86 0 0 0 4.73 1.21h.01c5.46 0 9.9-4.43 9.9-9.9 0-2.64-1.03-5.12-2.85-7.02zm-7.02 15.24h-.01a8.14 8.14 0 0 1-4.16-1.14l-.3-.18-3.12.82.84-3.04-.2-.31a8.18 8.18 0 0 1-1.25-4.37c0-4.52 3.67-8.2 8.2-8.2 2.19 0 4.24.85 5.79 2.41a8.15 8.15 0 0 1 2.39 5.8c0 4.53-3.68 8.21-8.18 8.21zm4.5-6.14c-.25-.13-1.48-.73-1.71-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.15.17-.29.19-.54.06-.25-.13-1.04-.38-1.97-1.22-.73-.65-1.22-1.46-1.37-1.71-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.08.41 1.45.52.61.19 1.16.16 1.59.1.49-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.22-.17-.47-.29z" />
      </svg>
    </a>
  )
}

function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow="Contact" title="Start with a clear enquiry and know what happens next." description="Use the form, WhatsApp, email or phone. The first response should clarify the need, narrow the scope and point to the right next step." />
      </Reveal>
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <div className="rounded-[2rem] border border-white/10 bg-[#081A33] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:p-7">
            <h2 className="font-display text-2xl font-semibold">What happens after an enquiry</h2>
            <div className="mt-6 space-y-4">
              {['The brief is reviewed directly by George.', 'A reply follows with questions, fit notes or a suggested call.', 'The next recommendation focuses on the clearest useful scope first.'].map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-[1.3rem] border border-white/10 bg-[#0D2345]/5 px-4 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#168BFF]/20 text-sm font-semibold text-[#8fc2ff]">{index + 1}</div>
                  <p className="text-sm leading-7 text-slate-100">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-[1.3rem] border border-emerald-400/40 bg-emerald-500/20 px-5 py-4 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/30">
                <span className="flex items-center gap-3"><PhoneCall className="h-5 w-5 text-emerald-200" />WhatsApp {whatsappNumberLocal}</span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <a href={`mailto:${emailAddress}`} className="flex items-center justify-between rounded-[1.3rem] border border-white/10 bg-[#0D2345]/5 px-5 py-4 text-sm font-medium transition hover:bg-[#0D2345]/10">
                <span className="flex items-center gap-3"><Mail className="h-5 w-5 text-[#7eb8ff]" />{emailAddress}</span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <a href={phoneLink} className="flex items-center justify-between rounded-[1.3rem] border border-white/10 bg-[#0D2345]/5 px-5 py-4 text-sm font-medium transition hover:bg-[#0D2345]/10">
                <span className="flex items-center gap-3"><Phone className="h-5 w-5 text-[#7eb8ff]" />{phoneNumber}</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.3rem] border border-white/10 bg-[#0D2345]/5 p-6 min-h-[270px] sm:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7eb8ff]">Business hours</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-[#d6e2ef]">
                  {businessHours.map((item) => (
                    <li key={item.day} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-white/8 pb-1 last:border-b-0 last:pb-0">
                      <span>{item.day}</span>
                      <span className="whitespace-nowrap text-right">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-[#0D2345]/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7eb8ff]">Service area</p>
                <p className="mt-2 text-sm leading-7 text-[#d6e2ef]">UK-wide remote delivery for businesses that need stronger digital systems.</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <QuoteForm />
        </Reveal>
      </div>
    </div>
  )
}

function NotFoundPage({ navigate }) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Not found" title="Choose a working route from the main navigation." description="The best next step is to jump back into the portfolio, services or contact flow." align="center" />
      <div className="mt-8 flex justify-center">
        <LinkButton to="/" navigate={navigate} variant="dark">
          Return Home
        </LinkButton>
      </div>
    </div>
  )
}

function SiteHeader({ currentPath, navigate, mobileMenuOpen, setMobileMenuOpen, isScrolled }) {
  return (
    <header className={`sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl transition-colors duration-300 ${isScrolled ? 'bg-[#07162E]/94' : 'bg-[#07162E]/62'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
        <a href="/" onClick={(event) => { event.preventDefault(); navigate('/') }} className="flex items-center gap-3">
          <BrandLogo className="h-10 w-10 rounded-xl" />
          <div>
            <p className="font-display text-base font-semibold text-white">GB Digital Solutions</p>
            <p className="text-xs text-[#C8D6E5]">Websites, apps and automation</p>
          </div>
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {primaryDesktopNav.map((item) => (
            <NavLink key={item.path} item={item} currentPath={currentPath} navigate={navigate} />
          ))}
        </nav>
        <button type="button" aria-expanded={mobileMenuOpen} aria-controls="mobile-nav" aria-label="Toggle navigation" onClick={() => setMobileMenuOpen((open) => !open)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-[#d0dbea] lg:hidden">
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileMenuOpen ? (
        <div id="mobile-nav" className="border-t border-white/10 px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path))

              return (
                <NavLink
                  key={item.path}
                  item={item}
                  currentPath={currentPath}
                  navigate={(path) => {
                    setMobileMenuOpen(false)
                    navigate(path)
                  }}
                  className={`rounded-full border-l-[3px] px-4 py-3 text-sm transition-colors duration-300 ease-out ${isActive ? 'border-l-white/90 bg-[#0E5FA8] !text-white font-semibold' : 'border-l-transparent bg-[#0B2D63] text-[#C8D6E5] font-medium hover:bg-[#0E5FA8]/30'}`}
                />
              )
            })}
            <LinkButton to="/portfolio" navigate={(path) => { setMobileMenuOpen(false); navigate(path) }} variant="secondary" className="mt-2 px-4 py-3">View Portfolio</LinkButton>
            <LinkButton to="/contact" navigate={(path) => { setMobileMenuOpen(false); navigate(path) }} variant="primary" className="px-4 py-3">Get Free Quote</LinkButton>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#0F7A45] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0C6338]"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function SiteFooter({ navigate }) {
  return (
    <footer className="bg-[#07162E] text-[#C8D6E5]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1fr_0.7fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-11 w-11 rounded-xl" />
            <div>
              <p className="font-display text-lg font-semibold text-white">GB Digital Solutions</p>
              <p className="text-sm text-[#C8D6E5]">Professional websites, apps and automation</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-base leading-7 text-[#C8D6E5]">Professional digital systems designed to help businesses save time, win customers and operate with more clarity.</p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-white">Navigation</p>
          <div className="mt-4 flex flex-col gap-3">
            {navigationItems.map((item) => (
              <a key={item.path} href={item.path} onClick={(event) => { event.preventDefault(); navigate(item.path) }} className="text-sm text-[#C8D6E5] transition hover:text-white">{item.label}</a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-white">Contact</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href={`mailto:${emailAddress}`} className="transition hover:text-white">{emailAddress}</a>
            <a href={phoneLink} className="transition hover:text-white">{phoneNumber}</a>
            <a href={whatsappLink} className="transition hover:text-white">WhatsApp</a>
            <div className="flex items-center gap-2 text-[#C8D6E5]"><MapPin className="h-4 w-4" />UK-wide remote service</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function renderRoute(path, navigate, onOpenImage) {
  const route = matchRoute(path)

  switch (route.type) {
    case 'about':
      return <AboutPage navigate={navigate} />
    case 'services-index':
      return <ServicesIndexPage navigate={navigate} />
    case 'service-detail':
      return <ServiceDetailPage navigate={navigate} service={getServiceBySlug(route.slug)} onOpenImage={onOpenImage} />
    case 'portfolio-index':
      return <PortfolioIndexPage navigate={navigate} onOpenImage={onOpenImage} />
    case 'project-detail':
      return <CaseStudyPage navigate={navigate} project={getProjectBySlug(route.slug)} onOpenImage={onOpenImage} />
    case 'booking-landing':
      return <BookingLandingPage navigate={navigate} onOpenImage={onOpenImage} />
    case 'industries-index':
      return <IndustriesIndexPage navigate={navigate} />
    case 'industry-detail':
      return <IndustryDetailPage navigate={navigate} industry={getIndustryBySlug(route.slug)} />
    case 'blog-index':
      return <BlogIndexPage navigate={navigate} />
    case 'blog-detail':
      return <BlogDetailPage navigate={navigate} post={getBlogPostBySlug(route.slug)} />
    case 'contact':
      return <ContactPage />
    case 'home':
      return <HomePage navigate={navigate} onOpenImage={onOpenImage} />
    default:
      return <NotFoundPage navigate={navigate} />
  }
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname))
      setMobileMenuOpen(false)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.title = getRouteTitle(currentPath)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [currentPath])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!lightboxImage) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxImage(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxImage])

  function navigate(path) {
    const nextPath = normalizePath(path)
    if (nextPath !== currentPath) {
      window.history.pushState({}, '', nextPath)
      setCurrentPath(nextPath)
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="relative bg-[#07162E] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_20%,rgba(76,201,255,0.14),transparent_32%),radial-gradient(circle_at_84%_78%,rgba(22,156,255,0.1),transparent_34%),linear-gradient(180deg,#07162E_0%,#0B2D63_58%,#07162E_100%)]" />
      <SiteHeader currentPath={currentPath} navigate={navigate} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} isScrolled={isScrolled} />
      <main className="relative site-main">{renderRoute(currentPath, navigate, setLightboxImage)}</main>
      <SiteFooter navigate={navigate} />
      {currentPath === '/' ? <FloatingWhatsAppButton /> : null}
      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  )
}

export default App



