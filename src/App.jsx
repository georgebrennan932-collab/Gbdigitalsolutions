import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  Layers,
  Menu,
  Smartphone,
  X,
} from 'lucide-react'
import './App.css'

const imageModules = import.meta.glob('./assets/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const assetMap = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => {
    const fileName = path.split('/').pop()?.toLowerCase() ?? ''
    return [fileName, url]
  }),
)

function getAsset(fileName) {
  return assetMap[fileName.toLowerCase()] ?? null
}

function normalizePath(pathname) {
  if (!pathname) {
    return '/'
  }

  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed.length === 0 ? '/' : trimmed
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const whatsappPrefill =
  "Hi George, I found GB Digital Solutions and I'd like to discuss a project."
const whatsappLink = `https://wa.me/447707287340?text=${encodeURIComponent(whatsappPrefill)}`

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const sellingPoints = [
  'Former British Army',
  'Former NHS Nurse',
  'Published Commercial Apps',
]

const servicesPreview = [
  { title: 'Websites', icon: Layers },
  { title: 'Mobile Apps', icon: Smartphone },
  { title: 'AI & Automation', icon: Bot },
  { title: 'Custom Software', icon: Code2 },
]

const projects = [
  {
    slug: 'platemate',
    path: '/projects/platemate',
    name: 'PlateMate',
    shortDescription: 'A conversion-focused food ordering platform with cleaner mobile checkout.',
    overview:
      'PlateMate was rebuilt as a high-performance ordering experience focused on faster decisions, less friction, and stronger repeat usage.',
    problem:
      'The old journey overloaded users with options and unclear steps, causing significant drop-off before payment.',
    solution:
      'The flow was restructured into a guided path with clearer actions, simplified navigation, and stronger feedback during checkout.',
    technologies: ['React', 'Node.js', 'Stripe', 'Analytics'],
    results: [
      'Smoother checkout journey with fewer abandoned sessions.',
      'Improved mobile usability and faster path to purchase.',
      'Clear reporting for marketing and product decisions.',
    ],
    externalLinks: [
      { label: 'Book Similar Build', href: '/contact' },
      { label: 'View All Projects', href: '/projects' },
    ],
    heroImage: 'platemate-case.png',
    screenshots: ['platemate-case.png', 'hero.png', 'vault-case.png'],
    gallery: ['platemate-case.png', 'nightpal-case.png', 'vault-case.png'],
  },
  {
    slug: 'nightpal',
    path: '/projects/nightpal',
    name: 'NightPal',
    shortDescription: 'A personal safety app built for rapid emergency alerts and location sharing.',
    overview:
      'NightPal is a mobile-first safety product designed to reduce response time when users feel at risk.',
    problem:
      'Many safety apps bury emergency actions behind multiple screens, delaying critical support in high-stress moments.',
    solution:
      'NightPal introduced one-tap emergency actions, instant trusted-contact alerts, and live location sharing with a clearer interaction model.',
    technologies: ['React Native', 'Firebase', 'Realtime Messaging', 'Maps'],
    results: [
      'Faster emergency activation flow with fewer taps.',
      'Improved confidence during solo travel and late shifts.',
      'A scalable architecture for future safety features.',
    ],
    externalLinks: [
      { label: 'Discuss a Safety Product', href: '/contact' },
      { label: 'Back to Projects', href: '/projects' },
    ],
    heroImage: 'nightpal-case.png',
    screenshots: ['nightpal-case.png', 'hero.png', 'platemate-case.png'],
    gallery: ['nightpal-case.png', 'vault-case.png', 'platemate-case.png'],
  },
  {
    slug: 'vault',
    path: '/projects/vault',
    name: 'Vault by James',
    shortDescription: 'A secure members platform for premium content and protected digital assets.',
    overview:
      'Vault by James is a gated platform that balances premium brand experience with enterprise-grade access control.',
    problem:
      'The business needed a secure way to deliver paid content without creating login friction for customers.',
    solution:
      'A role-based system was implemented with streamlined sign-in, protected content zones, and clear account journeys.',
    technologies: ['Next.js', 'Authentication', 'Cloud Hosting', 'Payments'],
    results: [
      'Reliable access control for paid member content.',
      'Reduced support requests related to account access.',
      'A platform foundation ready for further growth.',
    ],
    externalLinks: [
      { label: 'Start Your Platform', href: '/contact' },
      { label: 'Browse More Work', href: '/projects' },
    ],
    heroImage: 'vault-case.png',
    screenshots: ['vault-case.png', 'hero.png', 'nightpal-case.png'],
    gallery: ['vault-case.png', 'platemate-case.png', 'nightpal-case.png'],
  },
]

const services = [
  {
    name: 'Websites',
    forWho: 'Businesses that need a premium digital presence and clear conversion path.',
    benefits: [
      'Fast, responsive user experience across devices.',
      'Clear service messaging and stronger conversion journeys.',
      'Scalable structure ready for growth.',
    ],
    timeline: 'Typical delivery: 3 to 6 weeks',
    technologies: ['React', 'Vite', 'Modern CSS', 'Analytics'],
  },
  {
    name: 'Mobile Apps',
    forWho: 'Founders and teams launching iOS and Android experiences.',
    benefits: [
      'Consistent cross-platform experience.',
      'Performance-focused architecture for production use.',
      'App journeys designed for real-world usage.',
    ],
    timeline: 'Typical delivery: 8 to 14 weeks',
    technologies: ['React Native', 'Firebase', 'REST APIs', 'Push Notifications'],
  },
  {
    name: 'AI Solutions',
    forWho: 'Teams looking to embed practical AI into customer or internal products.',
    benefits: [
      'Smarter workflows with measurable value.',
      'AI features designed around operational needs.',
      'Clear governance and maintainable implementation.',
    ],
    timeline: 'Typical delivery: 4 to 10 weeks',
    technologies: ['OpenAI APIs', 'Python', 'Node.js', 'Vector Search'],
  },
  {
    name: 'Business Automation',
    forWho: 'Businesses losing time to repetitive manual tasks.',
    benefits: [
      'Reduced admin effort and handover delays.',
      'More reliable internal processes.',
      'Operational visibility through automation dashboards.',
    ],
    timeline: 'Typical delivery: 3 to 8 weeks',
    technologies: ['Zapier', 'Make', 'Custom APIs', 'Workflow Engines'],
  },
  {
    name: 'Custom Software',
    forWho: 'Companies that need internal systems built around their exact workflow.',
    benefits: [
      'Software aligned to business operations.',
      'Improved team productivity and consistency.',
      'Future-proof architecture for additional modules.',
    ],
    timeline: 'Typical delivery: 6 to 16 weeks',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Cloud Infrastructure'],
  },
]

const faqs = [
  {
    q: 'How quickly can we start?',
    a: 'Most projects can begin within 1 to 2 weeks after scoping.',
  },
  {
    q: 'Do you work with small businesses?',
    a: 'Yes. Projects are scoped to fit growth-stage teams and established businesses.',
  },
  {
    q: 'Can you improve an existing product?',
    a: 'Yes. Audits, redesigns, and phased rebuilds are all available.',
  },
]

function getProjectByPath(pathname) {
  return projects.find((project) => project.path === pathname) ?? null
}

function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')

  useEffect(() => {
    const onPopState = () => {
      setPath(normalizePath(window.location.pathname))
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const activeProject = useMemo(() => getProjectByPath(path), [path])

  const navigateTo = (to) => {
    const nextPath = normalizePath(to)

    if (nextPath === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const handleNavigate = (event, to) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }

    event.preventDefault()
    navigateTo(to)
  }

  const renderLinkButton = ({ to, children, className = 'btn btn-primary' }) => (
    <a href={to} className={className} onClick={(event) => handleNavigate(event, to)}>
      {children}
    </a>
  )

  const renderHeader = () => (
    <header className="topbar shell">
      <a className="brand" href="/" onClick={(event) => handleNavigate(event, '/')}>
        <span className="brand-mark" aria-hidden="true" />
        GB Digital Solutions
      </a>

      <button
        type="button"
        className="nav-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive =
            path === item.path || (item.path === '/projects' && path.startsWith('/projects/'))

          return (
            <a
              key={item.path}
              href={item.path}
              className={isActive ? 'active' : ''}
              onClick={(event) => handleNavigate(event, item.path)}
            >
              {item.label}
            </a>
          )
        })}
      </nav>
    </header>
  )

  const renderHomePage = () => (
    <main>
      <section className="hero shell">
        <motion.p
          className="eyebrow"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45 }}
        >
          Boutique Software Consultancy
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          Bespoke Software That Moves Your Business Forward
        </motion.h1>
        <motion.p
          className="hero-copy"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          Premium websites, mobile apps, and custom systems designed for ambitious companies.
        </motion.p>
        <motion.div
          className="hero-actions"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.24 }}
        >
          {renderLinkButton({ to: '/contact', children: 'Start Your Project' })}
          {renderLinkButton({
            to: '/projects',
            className: 'btn btn-ghost',
            children: 'View Projects',
          })}
        </motion.div>
      </section>

      <section className="section shell compact-section">
        <h2>Why Choose GB Digital Solutions</h2>
        <div className="ticks-grid">
          {sellingPoints.map((point) => (
            <article key={point} className="tick-card">
              <CheckCircle2 size={18} />
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-head-row">
          <h2>Services Preview</h2>
          <a
            href="/services"
            onClick={(event) => handleNavigate(event, '/services')}
            className="text-link"
          >
            Explore Services <ArrowRight size={16} />
          </a>
        </div>
        <div className="service-grid">
          {servicesPreview.map((service) => {
            const Icon = service.icon
            return (
              <a
                key={service.title}
                href="/services"
                onClick={(event) => handleNavigate(event, '/services')}
                className="service-card"
              >
                <Icon size={20} />
                <h3>{service.title}</h3>
              </a>
            )
          })}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-head-row">
          <h2>Featured Projects</h2>
          <a
            href="/projects"
            onClick={(event) => handleNavigate(event, '/projects')}
            className="text-link"
          >
            Full Portfolio <ArrowRight size={16} />
          </a>
        </div>

        <div className="project-grid">
          {projects.map((project) => {
            const projectImage = getAsset(project.heroImage)

            return (
              <article key={project.slug} className="project-card">
                <div className="project-thumb">
                  {projectImage ? (
                    <img src={projectImage} alt={`${project.name} preview`} loading="lazy" />
                  ) : (
                    <div className="image-placeholder">Project Preview</div>
                  )}
                </div>
                <h3>{project.name}</h3>
                <p>{project.shortDescription}</p>
                <a
                  href={project.path}
                  onClick={(event) => handleNavigate(event, project.path)}
                  className="btn btn-secondary"
                >
                  View Case Study
                </a>
              </article>
            )
          })}
        </div>
      </section>

      <section className="cta shell">
        <h2>Ready to build your project?</h2>
        {renderLinkButton({ to: '/contact', children: 'Start Your Project' })}
      </section>
    </main>
  )

  const renderServicesPage = () => (
    <main className="page shell">
      <section className="page-hero">
        <p className="eyebrow">Services</p>
        <h1>Software Services Built Around Business Outcomes</h1>
        <p>
          Each service is structured for practical delivery, measurable value, and long-term
          maintainability.
        </p>
      </section>

      <section className="stacked-sections">
        {services.map((service) => (
          <article key={service.name} className="detail-card">
            <h2>{service.name}</h2>
            <p>
              <strong>Who it is for:</strong> {service.forWho}
            </p>
            <p>
              <strong>Typical delivery time:</strong> {service.timeline}
            </p>
            <div className="detail-columns">
              <div>
                <h3>Benefits</h3>
                <ul>
                  {service.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Technologies Used</h3>
                <div className="tag-list">
                  {service.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
            {renderLinkButton({
              to: '/contact',
              className: 'btn btn-secondary',
              children: 'Start This Service',
            })}
          </article>
        ))}
      </section>
    </main>
  )

  const renderProjectsPage = () => (
    <main className="page shell">
      <section className="page-hero">
        <p className="eyebrow">Projects</p>
        <h1>Portfolio</h1>
        <p>Selected client-facing software and product builds from GB Digital Solutions.</p>
      </section>

      <section className="project-grid full">
        {projects.map((project) => {
          const projectImage = getAsset(project.heroImage)

          return (
            <article key={project.slug} className="project-card">
              <div className="project-thumb">
                {projectImage ? (
                  <img src={projectImage} alt={`${project.name} hero`} loading="lazy" />
                ) : (
                  <div className="image-placeholder">Project Hero Image</div>
                )}
              </div>
              <h2>{project.name}</h2>
              <p>{project.shortDescription}</p>
              <a
                href={project.path}
                onClick={(event) => handleNavigate(event, project.path)}
                className="btn btn-secondary"
              >
                Open Project Page
              </a>
            </article>
          )
        })}
      </section>
    </main>
  )

  const renderProjectDetailPage = (project) => {
    const heroImage = getAsset(project.heroImage)

    return (
      <main className="page shell">
        <section className="page-hero project-hero">
          <p className="eyebrow">Case Study</p>
          <h1>{project.name}</h1>
          <p>{project.overview}</p>
          <a
            href="/projects"
            onClick={(event) => handleNavigate(event, '/projects')}
            className="text-link"
          >
            Back to Projects <ArrowRight size={16} />
          </a>
        </section>

        <section className="detail-card project-hero-image">
          {heroImage ? (
            <img src={heroImage} alt={`${project.name} hero visual`} loading="lazy" />
          ) : (
            <div className="image-placeholder tall">Hero Image Placeholder</div>
          )}
        </section>

        <section className="detail-card">
          <h2>Project Overview</h2>
          <p>{project.overview}</p>
        </section>

        <section className="detail-card split">
          <div>
            <h2>The Problem</h2>
            <p>{project.problem}</p>
          </div>
          <div>
            <h2>The Solution</h2>
            <p>{project.solution}</p>
          </div>
        </section>

        <section className="detail-card">
          <h2>Technologies Used</h2>
          <div className="tag-list">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </section>

        <section className="detail-card">
          <h2>Screenshots</h2>
          <div className="media-grid">
            {project.screenshots.map((shot, index) => {
              const image = getAsset(shot)
              return (
                <div key={`${project.slug}-shot-${index}`} className="media-card">
                  {image ? (
                    <img src={image} alt={`${project.name} screenshot ${index + 1}`} loading="lazy" />
                  ) : (
                    <div className="image-placeholder">Screenshot {index + 1}</div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section className="detail-card">
          <h2>Results</h2>
          <ul>
            {project.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </section>

        <section className="detail-card">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {project.gallery.map((assetName, index) => {
              const image = getAsset(assetName)
              return (
                <div key={`${project.slug}-gallery-${index}`} className="gallery-card">
                  {image ? (
                    <img src={image} alt={`${project.name} gallery image ${index + 1}`} loading="lazy" />
                  ) : (
                    <div className="image-placeholder">Gallery Image {index + 1}</div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section className="detail-card">
          <h2>Links</h2>
          <div className="inline-actions">
            {project.externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => handleNavigate(event, link.href)}
                className="btn btn-secondary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    )
  }

  const renderAboutPage = () => {
    const portrait = getAsset('about-portrait.png')

    return (
      <main className="page shell">
        <section className="page-hero about-hero">
          <p className="eyebrow">About</p>
          <h1>Who I Am</h1>
          <p>
            I am George Brennan, founder of GB Digital Solutions, focused on delivering practical,
            premium software for real business challenges.
          </p>
        </section>

        <section className="detail-card split about-intro">
          <div>
            <h2>Background</h2>
            <ul>
              <li>Former British Army</li>
              <li>Former NHS Nurse</li>
              <li>Software Developer and Founder</li>
            </ul>
            <h2>Why I Started GB Digital Solutions</h2>
            <p>
              I wanted to build a consultancy where software is delivered with discipline, clarity,
              and accountability from day one.
            </p>
            <h2>How I Approach Projects</h2>
            <p>
              Every project starts with understanding your operations, then delivering focused
              software in clear stages with direct communication throughout.
            </p>
          </div>
          <div className="portrait-wrap">
            {portrait ? (
              <img src={portrait} alt="Professional portrait placeholder" loading="lazy" />
            ) : (
              <div className="image-placeholder tall">Professional Photo Placeholder</div>
            )}
          </div>
        </section>
      </main>
    )
  }

  const renderContactPage = () => {
    const onSubmit = async (event) => {
      event.preventDefault()
      setFormStatus('submitting')

      const formElement = event.currentTarget
      const formData = new FormData(formElement)
      formData.append('_subject', 'New GB Digital Solutions Enquiry')
      formData.append('_template', 'table')
      formData.append('_captcha', 'false')

      try {
        const response = await fetch('https://formsubmit.co/ajax/georgebrennan932@gmail.com', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Form submission failed')
        }

        formElement.reset()
        setFormStatus('success')
      } catch {
        setFormStatus('error')
      }
    }

    return (
      <main className="page shell">
        <section className="page-hero">
          <p className="eyebrow">Contact</p>
          <h1>Start Your Project</h1>
          <p>Share your goals and timeline, and we can map out the best next step.</p>
        </section>

        <section className="detail-card contact-grid">
          <div className="contact-info-column">
            <h2>Direct Contact</h2>
            <p className="contact-intro">
              Send a quick WhatsApp message and simply describe your idea in plain language. I will
              help shape the right solution from there.
            </p>
            <div className="inline-actions">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                Start on WhatsApp
              </a>
            </div>
            <p>
              <strong>Phone:</strong> 07707 287340
            </p>
            <p>
              <strong>Email:</strong> georgebrennan932@gmail.com
            </p>

            <h3>Typical Response Time</h3>
            <p>Most enquiries receive a reply within a few hours.</p>
          </div>

          <form onSubmit={onSubmit} className="contact-form">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your full name" required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@company.com" required />

            <label htmlFor="project">Project Type</label>
            <select id="project" name="project" defaultValue="" required>
              <option value="" disabled>
                Select project type
              </option>
              <option value="Website">Website</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Mobile App">Mobile App</option>
              <option value="AI Solution">AI Solution</option>
              <option value="Business Automation">Business Automation</option>
              <option value="Unsure">Unsure</option>
            </select>

            <label htmlFor="message">Project Brief</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Tell me about the business problem you want to solve, what is currently slowing you down, and what a good outcome would look like."
              required
            />

            <button type="submit" className="btn btn-primary">
              {formStatus === 'submitting' ? 'Sending...' : 'Send Enquiry'}
            </button>

            <div className="reassurance-list" aria-label="Reassurance points">
              <p>✓ No obligation</p>
              <p>✓ No spam</p>
              <p>✓ You'll deal directly with the developer building your project.</p>
            </div>

            {formStatus === 'success' ? (
              <p className="success-note">
                Thanks! Your enquiry has been sent successfully. I'll review it personally and get
                back to you as soon as possible.
              </p>
            ) : null}

            {formStatus === 'error' ? (
              <p className="error-note">
                Something went wrong while sending your enquiry. Please try again or message on
                WhatsApp directly.
              </p>
            ) : null}
          </form>
        </section>

        <section className="detail-card faq-block">
          <h2>FAQ</h2>
          {faqs.map((faq) => (
            <article key={faq.q} className="faq-item">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </section>
      </main>
    )
  }

  const renderNotFoundPage = () => (
    <main className="page shell">
      <section className="page-hero">
        <p className="eyebrow">Not Found</p>
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        {renderLinkButton({ to: '/', className: 'btn btn-primary', children: 'Return Home' })}
      </section>
    </main>
  )

  const renderPage = () => {
    if (path === '/') {
      return renderHomePage()
    }

    if (path === '/services') {
      return renderServicesPage()
    }

    if (path === '/projects') {
      return renderProjectsPage()
    }

    if (activeProject) {
      return renderProjectDetailPage(activeProject)
    }

    if (path === '/about') {
      return renderAboutPage()
    }

    if (path === '/contact') {
      return renderContactPage()
    }

    return renderNotFoundPage()
  }

  return (
    <div className="site-shell">
      {renderHeader()}
      {renderPage()}
      <footer className="footer shell">
        <p>GB Digital Solutions</p>
        <div className="footer-links">
          {navItems.map((item) => (
            <a key={item.path} href={item.path} onClick={(event) => handleNavigate(event, item.path)}>
              {item.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default App
