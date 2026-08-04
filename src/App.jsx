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
  ChevronDown,
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
  Star,
  Workflow,
  X,
} from 'lucide-react'
import aboutPortrait from './assets/about-portrait.png'
import {
  aboutContent,
  blogPosts,
  homeContent,
  industryPages,
  navigationItems,
  projects,
  servicePages,
} from './siteContent'

const emailAddress = 'georgebrennan932@gmail.com'
const phoneNumber = '+44 7707 287340'
const phoneLink = 'tel:+447707287340'
const whatsappNumberInternational = '447707287340'
const whatsappNumberLocal = '07707 287340'
const whatsappPrefill =
  ' Hi George, I am interested in working with GB Digital Solutions. Can i have more information please?'
const whatsappLink = `https://wa.me/${whatsappNumberInternational}?text=${encodeURIComponent(whatsappPrefill)}`
const businessHours = 'Business hours placeholder'

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

const serviceDropdownItems = [
  { label: 'Website Design', path: '/services/website-design' },
  { label: 'Mobile Apps', path: '/services/mobile-app-development' },
  { label: 'AI Chatbots', path: '/services/ai-chatbots' },
  { label: 'Business Automation', path: '/services/business-automation' },
  { label: 'Booking Systems', path: '/smart-booking-systems' },
  { label: 'CRM Systems', path: '/services/custom-business-software' },
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
      <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
    </div>
  )
}

function LinkButton({ to, navigate, children, variant = 'primary', className = '' }) {
  const styles = {
    primary:
      'bg-sky-600 text-white shadow-lg shadow-sky-200 hover:bg-sky-700',
    secondary:
      'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
    dark: 'bg-sky-600 text-white shadow-lg shadow-sky-200 hover:bg-sky-700',
    ghost: 'text-slate-950 hover:text-sky-700',
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
      className={`inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-semibold transition ${styles[variant]} ${className}`}
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
      className={className || `text-sm font-medium transition ${isActive ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'}`}
    >
      {item.label}
    </a>
  )
}

function BrowserFrame({ children }) {
  return (
    <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
      </div>
      <div className="bg-white p-4 sm:p-5">{children}</div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="mx-auto w-[220px] rounded-[2.2rem] border-[10px] border-slate-950 bg-slate-950 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="mx-auto mb-2 h-1.5 w-20 rounded-full bg-slate-700" />
      <div className="overflow-hidden rounded-[1.5rem] bg-white">{children}</div>
    </div>
  )
}

function TabletFrame({ children }) {
  return (
    <div className="mx-auto rounded-[2rem] border-[8px] border-slate-900 bg-slate-900 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="overflow-hidden rounded-[1.5rem] bg-white">{children}</div>
    </div>
  )
}

function ScreenshotImage({ image, onOpen }) {
  return (
    <div className="flex h-[220px] w-full items-center justify-center rounded-[1.2rem] bg-slate-100 p-3 sm:h-[260px]">
      <button
        type="button"
        onClick={() => onOpen?.(image)}
        className="h-full w-full cursor-zoom-in rounded-[0.9rem] outline-none transition hover:scale-[1.01] focus:ring-4 focus:ring-sky-100"
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
          <div className="rounded-[1.4rem] bg-sky-50 p-5">
            <div className="h-3 w-28 rounded-full bg-sky-200" />
            <div className="mt-4 h-8 w-2/3 rounded-2xl bg-white" />
            <div className="mt-3 h-3 w-full rounded-full bg-white" />
            <div className="mt-2 h-3 w-4/5 rounded-full bg-white" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-slate-50 p-4">
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
          <div className="rounded-[1.2rem] bg-sky-50 p-4">
            <div className="h-3 w-16 rounded-full bg-sky-200" />
            <div className="mt-3 h-5 w-4/5 rounded-full bg-white" />
            <div className="mt-2 h-3 w-full rounded-full bg-white" />
          </div>
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-[1.1rem] bg-slate-50 p-3">
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
            <div className="mt-4 h-8 w-3/5 rounded-2xl bg-white" />
            <div className="mt-3 h-3 w-full rounded-full bg-white" />
            <div className="mt-2 h-3 w-4/5 rounded-full bg-white" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['Anti-wrinkle', 'Skin boosters', 'Consultation', 'Aftercare'].map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-slate-50 p-4">
                <div className="h-20 rounded-[1rem] bg-rose-100" />
                <div className="mt-3 text-sm font-semibold text-slate-800">{item}</div>
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
              <div className="mt-3 text-sm font-semibold text-slate-800">{item}</div>
            </div>
          ))}
        </div>
      )
    case 'clinic-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-rose-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Choose a treatment</div>
            <div className="mt-3 space-y-2">
              {['Lip filler consultation', 'Botox review', 'Skin booster'].map((item) => (
                <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.2rem] bg-slate-50 p-4 text-sm text-slate-600">Tap to book consultation</div>
        </div>
      )
    case 'restaurant-site':
      return (
        <div className="space-y-4">
          <div className="rounded-[1.4rem] bg-amber-50 p-5">
            <div className="h-3 w-20 rounded-full bg-amber-200" />
            <div className="mt-4 h-8 w-3/5 rounded-2xl bg-white" />
            <div className="mt-3 h-3 w-full rounded-full bg-white" />
          </div>
          <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.2rem] bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Book a table</div>
              <div className="mt-3 grid gap-2">
                {['Date', 'Time', 'Guests'].map((item) => (
                  <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Menu highlights</div>
              <div className="mt-3 space-y-2">
                {['Small plates', 'Mains', 'Desserts'].map((item) => (
                  <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">{item}</div>
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
              <div className="text-sm font-semibold text-slate-800">{item}</div>
              <div className="mt-2 h-3 w-full rounded-full bg-white" />
              <div className="mt-2 h-3 w-4/5 rounded-full bg-white" />
            </div>
          ))}
        </div>
      )
    case 'restaurant-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-amber-50 p-4 text-sm font-semibold text-slate-800">Reserve tonight</div>
          <div className="rounded-[1.2rem] bg-white p-4 ring-1 ring-slate-100">
            <div className="text-sm text-slate-600">Time</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {['18:00', '19:30', '20:45'].map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{item}</span>
              ))}
            </div>
          </div>
        </div>
      )
    case 'trades-site':
      return (
        <div className="space-y-4">
          <div className="rounded-[1.4rem] bg-sky-50 p-5">
            <div className="h-3 w-24 rounded-full bg-sky-200" />
            <div className="mt-4 h-8 w-3/5 rounded-2xl bg-white" />
            <div className="mt-3 h-3 w-full rounded-full bg-white" />
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.2rem] bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Request a quote</div>
              <div className="mt-3 space-y-2">
                {['Job type', 'Postcode', 'Best contact method'].map((item) => (
                  <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Proof of work</div>
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
          <div className="rounded-[1.2rem] bg-sky-50 p-4 text-sm font-semibold text-slate-800">Quote request details</div>
          {['Urgency', 'Photo upload', 'Preferred appointment'].map((item) => (
            <div key={item} className="rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-600">{item}</div>
          ))}
        </div>
      )
    case 'trades-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-sky-50 p-4 text-sm font-semibold text-slate-900">Call now or request a quote</div>
          <div className="rounded-[1.2rem] bg-white p-4 ring-1 ring-slate-100 text-sm text-slate-600">Fast mobile enquiry flow</div>
        </div>
      )
    case 'booking-dashboard':
      return (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.2rem] bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Working hours</div>
              <div className="mt-3 space-y-2">
                {['Mon-Fri', 'Break windows', 'Treatment lengths'].map((item) => (
                  <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] bg-sky-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Diary updates</div>
              <div className="mt-3 space-y-2">
                {['New booking confirmed', 'Reminder scheduled', 'Staff notified'].map((item) => (
                  <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">{item}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[1.2rem] bg-white p-4 ring-1 ring-slate-100">
            <div className="text-sm font-semibold text-slate-800">Upcoming bookings</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {['Consultation', 'Treatment review', 'Botox follow-up'].map((item) => (
                <div key={item} className="rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-600">{item}</div>
              ))}
            </div>
          </div>
        </div>
      )
    case 'booking-calendar':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.2rem] bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-800">Available slots</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {['09:30', '10:30', '12:15', '14:00', '15:45', '17:00'].map((item) => (
                <div key={item} className="rounded-xl bg-white px-3 py-3 text-sm text-slate-600">{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.2rem] bg-sky-50 p-4">
            <div className="text-sm font-semibold text-slate-800">Booking rules</div>
            <div className="mt-3 space-y-2">
              {['Treatment duration', 'Breaks respected', 'Diary synced'].map((item) => (
                <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">{item}</div>
              ))}
            </div>
          </div>
        </div>
      )
    case 'booking-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-sky-50 p-4 text-sm font-semibold text-slate-900">Choose a treatment</div>
          {['Botox consultation', 'Skin booster', 'Follow-up review'].map((item) => (
            <div key={item} className="rounded-xl bg-white px-3 py-3 text-sm text-slate-600 ring-1 ring-slate-100">{item}</div>
          ))}
          <div className="rounded-[1.2rem] bg-slate-50 p-4 text-sm text-slate-600">Pick a valid appointment slot</div>
        </div>
      )
    case 'chatbot-desktop':
      return (
        <div className="space-y-3">
          <div className="max-w-[75%] rounded-[1.3rem] rounded-bl-md bg-slate-100 px-4 py-3 text-sm text-slate-700">
            I need help booking a service.
          </div>
          <div className="ml-auto max-w-[80%] rounded-[1.3rem] rounded-br-md bg-sky-600 px-4 py-3 text-sm text-white">
            I can help with that. Which treatment or service are you looking for?
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Consultation', 'Boiler service', 'Need a quote'].map((item) => (
              <span key={item} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600">{item}</span>
            ))}
          </div>
        </div>
      )
    case 'chatbot-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-[1.2rem] bg-slate-100 px-3 py-3 text-sm text-slate-700">Tell me what you need help with.</div>
          <div className="rounded-[1.2rem] bg-sky-600 px-3 py-3 text-sm text-white">I can guide the next step and collect details.</div>
          <div className="flex flex-wrap gap-2">
            {['Book', 'Ask a question', 'Get quote'].map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{item}</span>
            ))}
          </div>
        </div>
      )
    case 'chatbot-handoff':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-[1.2rem] bg-slate-50 p-4 text-sm text-slate-700">Qualified lead summary</div>
          <div className="rounded-[1.2rem] bg-sky-50 p-4 text-sm text-slate-700">Send to team or booking flow</div>
        </div>
      )
    case 'automation-pipeline':
      return (
        <div className="grid gap-3 sm:grid-cols-4">
          {['Lead received', 'Quote sent', 'Reminder scheduled', 'Follow-up queued'].map((item) => (
            <div key={item} className="rounded-[1.2rem] bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">{item}</div>
              <div className="mt-2 h-3 w-full rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      )
    case 'automation-board':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {['New leads', 'Waiting review', 'Completed actions'].map((item) => (
            <div key={item} className="rounded-[1.2rem] bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">{item}</div>
              <div className="mt-3 space-y-2">
                {[1, 2, 3].map((value) => (
                  <div key={value} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">Task item</div>
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
            <div key={item} className="rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-600">{item}</div>
          ))}
        </div>
      )
    case 'call-system':
      return (
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.2rem] bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-800">Call queue</div>
            <div className="mt-3 space-y-2">
              {['Appointment reminder', 'Follow-up call', 'Service confirmation'].map((item) => (
                <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.2rem] bg-sky-50 p-4">
            <div className="text-sm font-semibold text-slate-800">Call status</div>
            <div className="mt-3 space-y-2">
              {['Queued', 'Calling', 'Delivered'].map((item) => (
                <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">{item}</div>
              ))}
            </div>
          </div>
        </div>
      )
    case 'call-system-mobile':
      return (
        <div className="space-y-3 p-4">
          {['Reminder ready', 'Next call trigger', 'Delivery update'].map((item) => (
            <div key={item} className="rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-600">{item}</div>
          ))}
        </div>
      )
    case 'call-system-queue':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-[1.2rem] bg-slate-50 p-4 text-sm text-slate-700">Reminder campaigns</div>
          <div className="rounded-[1.2rem] bg-white p-4 ring-1 ring-slate-100 text-sm text-slate-700">Call reporting</div>
        </div>
      )
    case 'custom-software':
      return (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.2rem] bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Workflow dashboard</div>
              <div className="mt-3 grid gap-2">
                {['Open tasks', 'Approvals', 'Jobs in progress'].map((item) => (
                  <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] bg-sky-50 p-4">
              <div className="text-sm font-semibold text-slate-800">Role-based tools</div>
              <div className="mt-3 space-y-2">
                {['Admin', 'Operations', 'Staff'].map((item) => (
                  <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-600">{item}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[1.2rem] bg-white p-4 ring-1 ring-slate-100">
            <div className="text-sm font-semibold text-slate-800">Record view</div>
            <div className="mt-3 h-28 rounded-[1rem] bg-slate-50" />
          </div>
        </div>
      )
    case 'custom-software-tablet':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-[1.2rem] bg-slate-50 p-4 text-sm text-slate-700">Client records</div>
          <div className="rounded-[1.2rem] bg-sky-50 p-4 text-sm text-slate-700">Workflow approvals</div>
        </div>
      )
    case 'custom-software-mobile':
      return (
        <div className="space-y-3 p-4">
          <div className="rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-700">Assigned task</div>
          <div className="rounded-xl bg-white px-3 py-3 text-sm text-slate-700 ring-1 ring-slate-100">Status update</div>
        </div>
      )
    case 'nightpal-support':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-[1.2rem] bg-slate-50 p-4 text-sm text-slate-700">Trusted contacts</div>
          <div className="rounded-[1.2rem] bg-sky-50 p-4 text-sm text-slate-700">Safety actions</div>
        </div>
      )
    case 'platemate-flow':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {['Log meal', 'Review guidance', 'Track progress'].map((item) => (
            <div key={item} className="rounded-[1.2rem] bg-slate-50 p-4 text-sm text-slate-700">{item}</div>
          ))}
        </div>
      )
    case 'vault-admin':
      return (
        <div className="grid gap-3 p-4 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.2rem] bg-slate-50 p-4 text-sm text-slate-700">Catalogue management</div>
          <div className="rounded-[1.2rem] bg-white p-4 ring-1 ring-slate-100 text-sm text-slate-700">Stock and order tools</div>
        </div>
      )
    default:
      return <div className="h-40 rounded-[1.4rem] bg-slate-50" />
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
    <div className="mb-3 inline-flex rounded-full border border-dashed border-sky-300 bg-white px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-sky-700">
      Add {shot.placeholderFileName}
    </div>
  )
}

function ServiceCard({ service, navigate, index, compact = false }) {
  const Icon = iconMap[service.title]

  return (
    <Reveal delay={index * 0.05}>
      <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="font-display text-xl font-semibold text-slate-950">{service.title}</h2>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">{service.summary}</p>
        {!compact ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Who it is for</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                {service.whoFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Problems it solves</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                {service.problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Benefits</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                {service.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton to={`/services/${service.slug}`} navigate={navigate} variant="secondary" className="px-5 py-3">
            Learn More
          </LinkButton>
          {service.flagshipPath ? (
            <LinkButton to={service.flagshipPath} navigate={navigate} variant="ghost" className="px-0 py-3">
              Flagship booking journey
              <ChevronRight className="ml-2 h-4 w-4" />
            </LinkButton>
          ) : null}
        </div>
      </article>
    </Reveal>
  )
}

function ProjectCard({ project, navigate, index, compact = false, onOpenImage }) {
  const primaryShot = project.gallery[0]

  return (
    <Reveal delay={index * 0.04}>
      <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
        <div className="bg-slate-50 p-4">
          <MediaSlotLabel shot={primaryShot} />
          <DeviceMock shot={primaryShot} onOpenImage={onOpenImage} />
        </div>
        <div className="p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">{project.industry}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950">{project.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{project.overview}</p>
          {!compact ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Problem</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{project.problem}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Features</p>
                <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-600">
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
      <article className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="bg-slate-50 p-3">
          <MediaSlotLabel shot={primaryShot} />
          <DeviceMock shot={primaryShot} onOpenImage={onOpenImage} />
        </div>
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{project.industry}</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-slate-950">{project.title}</h2>
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
      <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">{post.category}</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-slate-950">{post.title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
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
      <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">Industry focus</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-slate-950">{industry.title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{industry.summary}</p>
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
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-7"
    >
      <input type="hidden" name="_subject" value="New GB Digital Solutions enquiry" />
      <input type="hidden" name="_captcha" value="false" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">Get free quote</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-slate-950">Tell George what you need</h2>
        </div>
        <BriefcaseBusiness className="mt-1 h-6 w-6 text-sky-600" />
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        Send this form directly via FormSubmit or use WhatsApp with the same enquiry details.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Name
          <input required name="name" type="text" value={formState.name} onChange={handleChange('name')} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Business
          <input required name="business" type="text" value={formState.business} onChange={handleChange('business')} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="Business name" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Email
          <input required name="email" type="email" value={formState.email} onChange={handleChange('email')} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="you@business.com" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Service
          <select name="service" value={formState.service} onChange={handleChange('service')} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100">
            {servicePages.map((service) => (
              <option key={service.slug} value={service.title}>{service.title}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Brief
          <textarea required name="brief" rows={6} value={formState.brief} onChange={handleChange('brief')} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="What do you need, what is causing friction, and what would a better outcome look like?" />
        </label>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700">
            Send Enquiry
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <a
            href={whatsappFormLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-4 text-sm font-semibold !text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600"
          >
            Send on WhatsApp ({whatsappNumberLocal})
            <PhoneCall className="ml-2 h-4 w-4" />
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock3 className="h-4 w-4" />
          FormSubmit sends to {emailAddress}.
        </div>
      </div>
    </form>
  )
}

function HomePage({ navigate, onOpenImage }) {
  const featuredServices = homeContent.featuredServiceSlugs.map(getServiceBySlug).filter(Boolean)
  const featuredProjects = homeContent.featuredProjectSlugs.map(getProjectBySlug).filter(Boolean)
  const latestProject = getProjectBySlug(homeContent.latestProjectSlug)

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-20">
          <Reveal className="max-w-2xl self-center">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">{homeContent.hero.eyebrow}</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">{homeContent.hero.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-xl">{homeContent.hero.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton to={homeContent.hero.primaryCta.path} navigate={navigate} variant="primary">
                {homeContent.hero.primaryCta.label}
              </LinkButton>
              <LinkButton to={homeContent.hero.secondaryCta.path} navigate={navigate} variant="secondary">
                {homeContent.hero.secondaryCta.label}
              </LinkButton>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="self-center">
            <BrowserFrame>
              <MockInterface mock="website-agency" />
            </BrowserFrame>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle eyebrow="Introduction" title={homeContent.intro.title} description={homeContent.intro.description} />
          </Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {homeContent.intro.points.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <article className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                  <CheckCircle2 className="h-6 w-6 text-sky-600" />
                  <p className="mt-4 text-base leading-8 text-slate-600">{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionTitle eyebrow="Featured services" title="Choose the right build for the bottleneck slowing growth." description="Start with the clearest need now, then expand into automation, booking or software when the business is ready." />
            </Reveal>
            <Reveal delay={0.06}>
              <LinkButton to="/services" navigate={navigate} variant="ghost" className="px-0 py-3">
                View All Services
                <ChevronRight className="ml-2 h-4 w-4" />
              </LinkButton>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {featuredServices.map((service, index) => (
              <ServiceCard key={service.slug} service={service} navigate={navigate} index={index} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionTitle eyebrow="Featured portfolio" title="See real examples before starting the conversation." description="Proof of capability matters more than filler, so the work is easy to reach and easy to scan." />
            </Reveal>
            <Reveal delay={0.06}>
              <LinkButton to="/portfolio" navigate={navigate} variant="ghost" className="px-0 py-3">
                View All Case Studies
                <ChevronRight className="ml-2 h-4 w-4" />
              </LinkButton>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-8 xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} navigate={navigate} index={index} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle eyebrow="Why choose us" title="Work directly with a developer focused on useful outcomes, not agency theatre." description="Every part of the engagement stays tied to clarity, execution and a practical next step for the business." />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {homeContent.whyChooseUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                  <h2 className="font-display text-2xl font-semibold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle eyebrow="Testimonials" title="Client feedback belongs here once approved, not invented for decoration." description="Approved testimonials or message screenshots can be dropped into these slots without changing the structure." />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {homeContent.testimonials.map((item, index) => (
              <Reveal key={`${item.title}-${index}`} delay={index * 0.05}>
                <article className="rounded-[1.8rem] border border-dashed border-slate-300 bg-slate-50 p-6">
                  <div className="flex items-center gap-1 text-slate-300">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star key={value} className="h-4 w-4" />
                    ))}
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {latestProject ? (
        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Reveal>
              <SectionTitle eyebrow="Latest project" title={latestProject.title} description={latestProject.overview} />
            </Reveal>
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <Reveal>
                <BrowserFrame>
                  <DeviceMock shot={latestProject.gallery[0]} onOpenImage={onOpenImage} />
                </BrowserFrame>
              </Reveal>
              <Reveal delay={0.06} className="self-center">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">{latestProject.industry}</p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-slate-950">{latestProject.title}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{latestProject.solution}</p>
                  <div className="mt-6">
                    <LinkButton to={`/portfolio/${latestProject.slug}`} navigate={navigate} variant="dark">
                      View Case Study
                    </LinkButton>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[2.3rem] border border-slate-200 bg-slate-950 px-6 py-12 text-white shadow-[0_35px_90px_rgba(15,23,42,0.18)] sm:px-10 lg:px-14">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Get started</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{homeContent.finalCta.title}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">{homeContent.finalCta.description}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <LinkButton to={homeContent.finalCta.primaryCta.path} navigate={navigate} variant="secondary" className="px-6 py-4">
                    {homeContent.finalCta.primaryCta.label}
                  </LinkButton>
                  <LinkButton to={homeContent.finalCta.secondaryCta.path} navigate={navigate} variant="ghost" className="px-0 py-4 text-white hover:text-cyan-300">
                    {homeContent.finalCta.secondaryCta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </LinkButton>
                </div>
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
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <img src={aboutPortrait} alt="Professional headshot" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <div className="grid gap-6">
          <Reveal delay={0.04}>
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <h2 className="font-display text-2xl font-semibold text-slate-950">Who I am</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{aboutContent.whoIAm}</p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="font-display text-2xl font-semibold text-slate-950">My journey</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {aboutContent.journey.map((item) => (
                  <div key={item} className="rounded-[1.2rem] bg-white p-4 shadow-sm ring-1 ring-slate-100 text-sm text-slate-700">{item}</div>
                ))}
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.12}>
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <h2 className="font-display text-2xl font-semibold text-slate-950">Why I started GB Digital Solutions</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{aboutContent.whyStarted}</p>
            </article>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">My values</h2>
            <div className="mt-4 space-y-4">
              {aboutContent.values.map((item) => (
                <div key={item.title} className="rounded-[1.2rem] bg-slate-50 p-4">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">How I work with clients</h2>
            <div className="mt-4 space-y-4">
              {aboutContent.workStyle.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.2rem] bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-10">
        <article className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Timeline of experience</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            {aboutContent.timeline.map((item) => (
              <div key={item.label} className="rounded-[1.3rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">{item.label}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.12} className="mt-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold text-slate-950">See how that experience translates into real build work.</h2>
              <p className="mt-3 text-base leading-8 text-slate-600">The strongest next step is to look at the case studies and see how the thinking shows up in real project outputs.</p>
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
            <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">{label}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{value}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Problem</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{project.problem}</p>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Solution</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{project.solution}</p>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-10">
        <article className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Features</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.features.map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-white p-4 shadow-sm ring-1 ring-slate-100 text-sm text-slate-700">{item}</div>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Image gallery</h2>
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
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Results</h2>
            <ul className="mt-4 space-y-3">
              {project.results.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Lessons learned</h2>
            <ul className="mt-4 space-y-3">
              {project.lessons.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-10">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold">Start a similar project with a clearer first step.</h2>
              <p className="mt-3 text-base leading-8 text-slate-300">The next conversation can focus on the customer journey, operational bottleneck or product idea that matters most right now.</p>
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
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Who it is for</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {service.whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Problems it solves</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {service.problems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Benefits</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {service.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-10">
        <article className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Example screenshots</h2>
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
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Process</h2>
            <div className="mt-4 space-y-3">
              {service.process.map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.2rem] bg-slate-50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-semibold text-white">{index + 1}</div>
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Frequently asked questions</h2>
            <div className="mt-4 space-y-4">
              {service.faqs.map((item) => (
                <div key={item.q} className="rounded-[1.2rem] bg-slate-50 p-4">
                  <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-10">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold">Turn this service into a concrete project brief.</h2>
              <p className="mt-3 text-base leading-8 text-slate-300">The next step is a direct conversation about fit, scope and the fastest useful version to build first.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/contact" navigate={navigate} variant="secondary">
                Get Free Quote
              </LinkButton>
              {service.flagshipPath ? (
                <LinkButton to={service.flagshipPath} navigate={navigate} variant="ghost" className="text-white hover:text-cyan-300">
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
          <article className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Workflow</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">From settings to confirmed booking</h2>
              </div>
              <CalendarCheck2 className="h-6 w-6 text-cyan-300" />
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
                <div key={item} className="flex items-start gap-4 rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-semibold text-cyan-200">{index + 1}</div>
                  <p className="text-sm leading-7 text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <div className="grid gap-6">
          <Reveal delay={0.05}>
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <h2 className="font-display text-2xl font-semibold text-slate-950">Interactive workflow diagram</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {['Treatment selected', 'Valid slot found', 'Confirmation sent', 'Reminder queued'].map((item) => (
                  <div key={item} className="rounded-[1.2rem] bg-slate-50 p-4 text-sm font-medium text-slate-700">{item}</div>
                ))}
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="font-display text-2xl font-semibold text-slate-950">Mock booking screens and calendar UI</h2>
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
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Client booking journey</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Customers choose the right treatment, see only valid slots and move smoothly into confirmation without needing staff to manually check the diary.</p>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Admin dashboard</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Staff can manage availability rules, working patterns, confirmations and reminder behaviour without relying on awkward manual workarounds.</p>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Next step</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Start with the appointment rules, treatment list and current diary process, then shape the booking system around how the business actually runs.</p>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-10">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold">Turn booking friction into a cleaner client journey.</h2>
              <p className="mt-3 text-base leading-8 text-slate-300">The first conversation can focus on treatments, diary rules and where the current booking process slows the team down.</p>
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
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">Common pain points</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {industry.painPoints.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.05}>
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <h2 className="font-display text-2xl font-semibold text-slate-950">How GB Digital Solutions helps</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {industry.help.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-10">
        <article className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Relevant services</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {relevantServices.map((service, index) => (
              <ServiceCard key={service.slug} service={service} navigate={navigate} index={index} compact />
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold">Shape a more useful digital journey for this industry.</h2>
              <p className="mt-3 text-base leading-8 text-slate-300">The first step is identifying where trust, speed, booking or follow-up is currently leaking value.</p>
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
            <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <h2 className="font-display text-2xl font-semibold text-slate-950">{section.heading}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{section.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15} className="mt-10">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Need this turned into a practical project?</h2>
              <p className="mt-3 text-base leading-8 text-slate-600">Move from idea to scope by starting a direct conversation about the problem that matters most right now.</p>
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/88 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label="Full screen project image">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Close full screen image"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="max-h-[92vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
        <img src={image} alt="Full screen project screenshot" className="max-h-[92vh] w-full rounded-[1.5rem] bg-white object-contain" />
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
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_14px_30px_rgba(16,185,129,0.35)] transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200"
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
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:p-7">
            <h2 className="font-display text-2xl font-semibold">What happens after an enquiry</h2>
            <div className="mt-6 space-y-4">
              {['The brief is reviewed directly by George.', 'A reply follows with questions, fit notes or a suggested call.', 'The next recommendation focuses on the clearest useful scope first.'].map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-semibold text-cyan-200">{index + 1}</div>
                  <p className="text-sm leading-7 text-slate-100">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-[1.3rem] border border-emerald-400/40 bg-emerald-500/20 px-5 py-4 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/30">
                <span className="flex items-center gap-3"><PhoneCall className="h-5 w-5 text-emerald-200" />WhatsApp {whatsappNumberLocal}</span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <a href={`mailto:${emailAddress}`} className="flex items-center justify-between rounded-[1.3rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium transition hover:bg-white/10">
                <span className="flex items-center gap-3"><Mail className="h-5 w-5 text-cyan-300" />{emailAddress}</span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <a href={phoneLink} className="flex items-center justify-between rounded-[1.3rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium transition hover:bg-white/10">
                <span className="flex items-center gap-3"><Phone className="h-5 w-5 text-cyan-300" />{phoneNumber}</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Business hours</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{businessHours}</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Service area</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">UK-wide remote delivery for businesses that need stronger digital systems.</p>
              </div>
            </div>
            <div className="mt-8 rounded-[1.6rem] border border-dashed border-white/15 bg-white/5 p-6 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-cyan-300" />
                Map placeholder
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

function SiteHeader({ currentPath, navigate, mobileMenuOpen, setMobileMenuOpen }) {
  const servicesActive = currentPath === '/services' || currentPath.startsWith('/services/') || currentPath === '/smart-booking-systems'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <a href="/" onClick={(event) => { event.preventDefault(); navigate('/') }} className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-sm font-bold tracking-[0.2em] text-white shadow-lg shadow-sky-200">GB</span>
          <div>
            <p className="font-display text-base font-semibold text-slate-950">GB Digital Solutions</p>
            <p className="text-sm text-slate-500">Software agency for growth-focused businesses</p>
          </div>
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navigationItems.map((item) => {
            if (item.path === '/services') {
              return (
                <div key={item.path} className="group relative">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1 text-sm font-medium transition ${servicesActive ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'}`}
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    Services
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="invisible absolute left-0 top-full z-40 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {serviceDropdownItems.map((serviceItem) => (
                      <a
                        key={serviceItem.path}
                        href={serviceItem.path}
                        onClick={(event) => {
                          event.preventDefault()
                          navigate(serviceItem.path)
                        }}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                      >
                        {serviceItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <NavLink key={item.path} item={item} currentPath={currentPath} navigate={navigate} />
            )
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LinkButton to="/portfolio" navigate={navigate} variant="secondary" className="px-5 py-3">View Portfolio</LinkButton>
          <LinkButton to="/contact" navigate={navigate} variant="primary" className="px-5 py-3">Get Free Quote</LinkButton>
        </div>
        <button type="button" aria-expanded={mobileMenuOpen} aria-controls="mobile-nav" aria-label="Toggle navigation" onClick={() => setMobileMenuOpen((open) => !open)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 lg:hidden">
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileMenuOpen ? (
        <div id="mobile-nav" className="border-t border-slate-200 px-5 py-4 lg:hidden">
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
                  className={`rounded-full border-l-[3px] px-4 py-3 text-sm transition-colors duration-300 ease-out ${isActive ? 'border-l-white/90 bg-sky-600 !text-white font-semibold' : 'border-l-transparent bg-white text-slate-800 font-medium hover:bg-slate-50'}`}
                />
              )
            })}
            <LinkButton to="/portfolio" navigate={(path) => { setMobileMenuOpen(false); navigate(path) }} variant="secondary" className="mt-2 px-4 py-3">View Portfolio</LinkButton>
            <LinkButton to="/contact" navigate={(path) => { setMobileMenuOpen(false); navigate(path) }} variant="primary" className="px-4 py-3">Get Free Quote</LinkButton>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
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
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1fr_0.7fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-sm font-bold tracking-[0.2em] text-white">GB</span>
            <div>
              <p className="font-display text-lg font-semibold text-white">GB Digital Solutions</p>
              <p className="text-sm text-slate-400">Professional websites, apps and automation</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-400">Professional digital systems designed to help businesses save time, win customers and operate with more clarity.</p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-white">Navigation</p>
          <div className="mt-4 flex flex-col gap-3">
            {navigationItems.map((item) => (
              <a key={item.path} href={item.path} onClick={(event) => { event.preventDefault(); navigate(item.path) }} className="text-sm text-slate-400 transition hover:text-white">{item.label}</a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-white">Contact</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href={`mailto:${emailAddress}`} className="transition hover:text-white">{emailAddress}</a>
            <a href={phoneLink} className="transition hover:text-white">{phoneNumber}</a>
            <a href={whatsappLink} className="transition hover:text-white">WhatsApp</a>
            <div className="flex items-center gap-2 text-slate-400"><MapPin className="h-4 w-4" />UK-wide remote service</div>
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
    <div className="bg-white text-slate-900">
      <SiteHeader currentPath={currentPath} navigate={navigate} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main>{renderRoute(currentPath, navigate, setLightboxImage)}</main>
      <SiteFooter navigate={navigate} />
      {currentPath === '/' ? <FloatingWhatsAppButton /> : null}
      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  )
}

export default App
