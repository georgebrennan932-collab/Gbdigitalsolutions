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

const servicePages = [
  {
    slug: 'website-development',
    path: '/services/website-development',
    navTitle: 'Website Development',
    cardTitle: 'Website Development',
    icon: Layers,
    whoFor: 'Businesses that need a premium website that clearly communicates value and drives enquiries or sales.',
    typicalProjects: [
      'Service-led business websites',
      'Company profile and authority sites',
      'Conversion-focused landing page systems',
    ],
    features: [
      'Responsive design for mobile and desktop',
      'Fast page performance and clear content hierarchy',
      'Enquiry funnels and analytics-ready setup',
    ],
    technologies: ['React', 'Vite', 'Modern CSS', 'Analytics'],
    startingPrice: 'Estimated starting price: from GBP 2,500',
    faq: [
      {
        q: 'How long does a business website take?',
        a: 'Most website projects are delivered in 3 to 6 weeks depending on page count and integrations.',
      },
      {
        q: 'Can you improve my existing site instead of rebuilding?',
        a: 'Yes. A focused redesign can often improve conversion without starting from scratch.',
      },
    ],
  },
  {
    slug: 'mobile-app-development',
    path: '/services/mobile-app-development',
    navTitle: 'Mobile App Development',
    cardTitle: 'Mobile App Development',
    icon: Smartphone,
    whoFor: 'Founders and teams building customer-facing or internal mobile experiences for iOS and Android.',
    typicalProjects: [
      'On-demand service applications',
      'Safety and field-operational apps',
      'Member and community platforms',
    ],
    features: [
      'Cross-platform mobile build with native-feeling UX',
      'Secure authentication and real-time data integration',
      'Scalable architecture for future releases',
    ],
    technologies: ['React Native', 'Firebase', 'REST APIs', 'Push Notifications'],
    startingPrice: 'Estimated starting price: from GBP 8,000',
    faq: [
      {
        q: 'Do you build for both Android and iOS?',
        a: 'Yes. The delivery approach supports both platforms from one product codebase.',
      },
      {
        q: 'Can you help with app launch planning?',
        a: 'Yes. Launch preparation, QA and release support are included in project planning.',
      },
    ],
  },
  {
    slug: 'ai-automation',
    path: '/services/ai-automation',
    navTitle: 'AI & Automation',
    cardTitle: 'AI & Automation',
    icon: Bot,
    whoFor: 'Businesses that want to reduce manual workload and embed practical AI into operations.',
    typicalProjects: [
      'AI-assisted customer support workflows',
      'Document and data processing automations',
      'Internal assistant tools for repetitive tasks',
    ],
    features: [
      'Automation mapped to real operational bottlenecks',
      'AI workflows with human review points where needed',
      'Monitoring for quality, reliability and ROI',
    ],
    technologies: ['OpenAI APIs', 'Python', 'Node.js', 'Workflow Engines'],
    startingPrice: 'Estimated starting price: from GBP 3,500',
    faq: [
      {
        q: 'Will AI replace my existing workflow?',
        a: 'Not necessarily. Most projects improve the current process in stages to reduce risk.',
      },
      {
        q: 'Can automation connect to our existing tools?',
        a: 'Yes. Integrations are designed around your current systems where possible.',
      },
    ],
  },
  {
    slug: 'custom-software',
    path: '/services/custom-software',
    navTitle: 'Custom Software',
    cardTitle: 'Custom Software',
    icon: Code2,
    whoFor: 'Companies that have outgrown off-the-shelf tools and need software designed around their operations.',
    typicalProjects: [
      'Operations dashboards and internal portals',
      'Custom CRM and workflow systems',
      'Multi-role business management platforms',
    ],
    features: [
      'Software architecture tailored to your processes',
      'Secure role-based access and auditable workflows',
      'Incremental delivery with clear milestones',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Cloud Infrastructure'],
    startingPrice: 'Estimated starting price: from GBP 10,000',
    faq: [
      {
        q: 'Can this integrate with current systems?',
        a: 'Yes. Integrations are planned from the outset to avoid disruption.',
      },
      {
        q: 'How do we control scope and cost?',
        a: 'Projects are split into milestones with clear deliverables and transparent pricing.',
      },
    ],
  },
]

const servicesPreview = servicePages.map((service) => ({
  title: service.cardTitle,
  icon: service.icon,
  path: service.path,
}))

const projects = [
  {
    slug: 'platemate',
    path: '/projects/platemate',
    name: 'PlateMate',
    shortDescription: 'An AI nutrition and lifestyle app built for everyday meal tracking and coaching.',
    overview:
      'PlateMate is a cross-platform mobile app designed to help users track nutrition quickly, understand progress clearly, and stay consistent with healthier habits.',
    challenge:
      'Most nutrition apps rely on manual entry and disconnected tools, making it hard for users to log meals consistently and follow practical guidance.',
    solution:
      'Built meal logging with barcode scanning, photo logging and voice input, then paired it with AI coaching, macro and calorie tracking, and progress dashboards inside one mobile experience.',
    technologies: ['React Native', 'Node.js', 'OpenAI API', 'Firebase', 'Nutrition Data APIs'],
    screenshots: ['platemate-case.png'],
    outcome: [
      'Users can log meals in seconds using barcode, photo or voice.',
      'AI coaching gives clearer daily guidance based on nutrition patterns.',
      'Progress dashboards make macro and calorie trends easier to act on.',
    ],
    heroImage: 'platemate-case.png',
  },
  {
    slug: 'nightpal',
    path: '/projects/nightpal',
    name: 'NightPal',
    shortDescription: 'A personal safety app built for rapid emergency alerts and location sharing.',
    overview:
      'NightPal is a personal safety app focused on fast help access and trusted-contact communication in urgent situations.',
    challenge:
      'People in distress need immediate actions, but many safety apps add too many steps before help can be reached.',
    solution:
      'Created a streamlined emergency alert system with trusted-contact notifications, live location sharing, and quick access paths to emergency services.',
    technologies: ['React Native', 'Firebase', 'Realtime Messaging', 'Location Services', 'Maps API'],
    screenshots: ['nightpal-case.png', 'hero.png'],
    outcome: [
      'Emergency actions can be triggered in fewer steps during high-stress moments.',
      'Trusted contacts receive faster context and location updates.',
      'The app provides safer solo travel confidence through rapid response design.',
    ],
    heroImage: 'nightpal-case.png',
  },
  {
    slug: 'vault',
    path: '/projects/vault',
    name: 'Vault by James',
    shortDescription: 'A custom Pokemon e-commerce website with operational tools for daily store management.',
    overview:
      'Vault by James is a custom Pokemon e-commerce platform built to handle product visibility, stock control, and mobile-first purchasing.',
    challenge:
      'The business needed a purpose-built online store that could handle fast-changing inventory while keeping checkout simple on mobile.',
    solution:
      'Delivered a custom product catalogue, stock management workflows, secure checkout flow, and an admin dashboard for day-to-day updates.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Admin Dashboard Tooling'],
    screenshots: ['vault-case.png', 'hero.png'],
    outcome: [
      'Customers can browse Pokemon products through a clearer mobile-first catalogue.',
      'Stock changes are easier to manage through the admin dashboard.',
      'Secure checkout provides a more reliable buying experience.',
    ],
    heroImage: 'vault-case.png',
  },
]

function getProjectByPath(pathname) {
  return projects.find((project) => project.path === pathname) ?? null
}

function getServiceByPath(pathname) {
  return servicePages.find((service) => service.path === pathname) ?? null
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
  const activeService = useMemo(() => getServiceByPath(path), [path])

  const navigateTo = (to) => {
    const nextPath = normalizePath(to)

    if (nextPath === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    setMenuOpen(false)
    setFormStatus('idle')
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
            path === item.path ||
            (item.path === '/projects' && path.startsWith('/projects/')) ||
            (item.path === '/services' && path.startsWith('/services/'))

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
    <main className="home-main">
      <section className="hero shell">
        <motion.p
          className="eyebrow"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45 }}
        >
          GB Digital Solutions
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          Custom Software Built Around Your Business
        </motion.h1>
        <motion.p
          className="hero-copy"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          Websites, mobile apps and business systems designed to solve real problems, not just look
          good.
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
        <h2>Why Choose GB Digital</h2>
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
                href={service.path}
                onClick={(event) => handleNavigate(event, service.path)}
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
        <h1>Built for Business Outcomes, Not Generic Templates</h1>
        <p>
          Choose a service below to view detailed delivery scope, technologies, pricing guidance,
          and FAQs.
        </p>
      </section>

      <section className="service-grid full-service-grid">
        {servicePages.map((service) => {
          const Icon = service.icon
          return (
            <a
              key={service.slug}
              href={service.path}
              onClick={(event) => handleNavigate(event, service.path)}
              className="service-card service-link-card"
            >
              <Icon size={20} />
              <h3>{service.cardTitle}</h3>
              <p>View service details</p>
            </a>
          )
        })}
      </section>
    </main>
  )

  const renderServiceDetailPage = (service) => (
    <main className="page shell">
      <section className="page-hero project-hero">
        <p className="eyebrow">Service</p>
        <h1>{service.navTitle}</h1>
        <a
          href="/services"
          onClick={(event) => handleNavigate(event, '/services')}
          className="text-link"
        >
          Back to Services <ArrowRight size={16} />
        </a>
      </section>

      <section className="detail-card service-detail-card">
        <p>
          <strong>Who it is for:</strong> {service.whoFor}
        </p>
        <p>
          <strong>{service.startingPrice}</strong>
        </p>

        <div className="detail-columns">
          <div>
            <h3>Typical Projects</h3>
            <ul>
              {service.typicalProjects.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Features</h3>
            <ul>
              {service.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <h3>Technologies</h3>
        <div className="tag-list">
          {service.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <h3>FAQ</h3>
        <div className="faq-block service-faq-block">
          {service.faq.map((faq) => (
            <article key={faq.q} className="faq-item">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>

        <div className="inline-actions">
          {renderLinkButton({
            to: '/contact',
            className: 'btn btn-primary',
            children: 'Start This Service',
          })}
        </div>
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

        <section className="detail-card split">
          <div>
            <h2>The Challenge</h2>
            <p>{project.challenge}</p>
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
          <h2>Outcome</h2>
          <ul>
            {project.outcome.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="inline-actions">
            {renderLinkButton({
              to: '/contact',
              className: 'btn btn-primary',
              children: 'Start Your Project',
            })}
          </div>
        </section>
      </main>
    )
  }

  const renderAboutPage = () => {
    const portrait = getAsset('about-portrait.png')

    return (
      <main className="page shell">
        <section className="page-hero about-hero about-page-flow">
          <p className="eyebrow">About</p>
          <h1>Meet George Brennan</h1>
          <p>
            I am George Brennan, founder of GB Digital Solutions. My path from the British Army and
            NHS nursing into software development shaped how I build solutions: practical,
            disciplined, and outcome-focused.
          </p>

          <div className="portrait-wrap about-portrait-top">
            {portrait ? (
              <img src={portrait} alt="Professional portrait placeholder" loading="lazy" />
            ) : (
              <div className="image-placeholder tall">Professional Photo Placeholder</div>
            )}
          </div>
        </section>

        <section className="detail-card about-section-card">
          <h2>Background</h2>
          <ul>
            <li>Former British Army soldier</li>
            <li>Former NHS Nurse</li>
            <li>Self-taught software developer</li>
          </ul>
        </section>

        <section className="detail-card about-section-card">
          <h2>Why I Started GB Digital Solutions</h2>
          <p>
            I founded GB Digital Solutions because too many businesses are forced to adapt their
            processes around generic software. I prefer building software around how your business
            actually works.
          </p>
        </section>

        <section className="detail-card about-section-card">
          <h2>My Approach</h2>
          <ul>
            <li>Clear communication</li>
            <li>Honest advice</li>
            <li>Practical solutions</li>
            <li>Direct access to the developer</li>
            <li>No unnecessary features</li>
            <li>Focus on measurable business outcomes</li>
          </ul>
        </section>

        <section className="detail-card about-cta-card">
          <h2>Let's Build Something Together</h2>
          <p>
            Whether you need a website, mobile app or custom business software, I'd love to hear
            about your project.
          </p>
          <div className="inline-actions">
            {renderLinkButton({ to: '/contact', className: 'btn btn-primary', children: 'Start Your Project' })}
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
          <p>Describe your idea and I will help you shape the right next step.</p>
        </section>

        <section className="detail-card contact-grid">
          <div className="contact-info-column">
            <div className="inline-actions">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                Start on WhatsApp
              </a>
            </div>

            <p>
              <strong>Business phone:</strong> 07707 287340
            </p>
            <p>
              <strong>Business email:</strong> georgebrennan932@gmail.com
            </p>
            <p>
              <strong>Average response:</strong> within a few hours
            </p>
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

    if (activeService) {
      return renderServiceDetailPage(activeService)
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
