import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Layers,
  Mail,
  MessageSquare,
  Settings,
  Shield,
  Smartphone,
  Wallet,
  Workflow,
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

function getPageFromHash() {
  if (typeof window === 'undefined') {
    return 'home'
  }

  return window.location.hash === '#about' ? 'about' : 'home'
}

const services = [
  {
    title: 'Websites',
    description: 'Modern responsive websites built for speed, trust, and conversion.',
    icon: Layers,
  },
  {
    title: 'Mobile Apps',
    description: 'Cross-platform Android and iOS products with polished mobile UX.',
    icon: Smartphone,
  },
  {
    title: 'AI Solutions',
    description: 'Business automation, copilots, and intelligent workflows that scale.',
    icon: Bot,
  },
  {
    title: 'Custom Software',
    description: 'Internal systems, dashboards, and tools designed around your team.',
    icon: Code2,
  },
]

const heroShowcase = [
  {
    name: 'PlateMate',
    descriptor: 'Nutrition & Fitness App',
    image: 'platemate-case.png',
    device: 'phone',
    caseStudyIndex: 0,
  },
  {
    name: 'NightPal',
    descriptor: 'Personal Safety App',
    image: 'nightpal-case.png',
    device: 'phone',
    caseStudyIndex: 1,
  },
  {
    name: 'Vault by James',
    descriptor: 'E-commerce Platform',
    image: 'vault-case.png',
    device: 'laptop',
    caseStudyIndex: 2,
  },
]

const caseStudies = [
  {
    name: 'PlateMate Evolve',
    summary: 'Food platform UX focused on conversion and repeat ordering.',
    problem:
      'Users were dropping off before checkout because the journey felt busy and unclear on mobile.',
    solution:
      'Redesigned the purchase flow, simplified navigation, and introduced cleaner product discovery.',
    tags: ['React', 'Node', 'Stripe', 'Analytics'],
    image: 'platemate-case.png',
  },
  {
    name: 'NightPal',
    summary: 'Mobile safety app designed for rapid emergency response and trusted contact alerts.',
    problem:
      'In an emergency, every second counts. Many safety apps require multiple taps before users can get help.',
    solution:
      'Developed a mobile safety app focused on rapid emergency response, enabling users to alert trusted contacts, share their live location and access essential safety tools with minimal interaction.',
    tags: ['Mobile', 'Realtime', 'Maps', 'Firebase'],
    image: 'nightpal-case.png',
  },
  {
    name: 'Vault by James',
    summary: 'Secure content vault for premium members and protected assets.',
    problem:
      'Digital products and member resources needed secure access control without friction.',
    solution:
      'Created a gated architecture with role-based access and seamless login journeys.',
    tags: ['Next.js', 'Auth', 'Cloud', 'Payments'],
    image: 'vault-case.png',
  },
]

const aboutFeatureCards = [
  {
    title: 'Direct Communication',
    text: "You'll work directly with the developer from start to finish.",
    icon: MessageSquare,
  },
  {
    title: 'Tailored Solutions',
    text: 'Every website and application is built around your business requirements.',
    icon: Layers,
  },
  {
    title: 'Future Ready',
    text: 'Modern technologies including AI, automation, and scalable cloud solutions.',
    icon: Bot,
  },
  {
    title: 'Long-Term Support',
    text: 'Launch is only the beginning. Ongoing improvements and support are always available.',
    icon: Workflow,
  },
]

const aboutTimeline = [
  'British Army',
  'Registered Nurse',
  'Software Developer',
  'Founder of GB Digital Solutions',
]

const howIWorkSteps = [
  'Discovery Call',
  'Proposal',
  'Prototype',
  'Weekly Progress',
  'Testing',
  'Launch',
  'Support',
]

const trustReasons = [
  {
    title: 'Direct Communication',
    text: "You'll work directly with the person designing and building your project, ensuring clear communication and quick decisions from start to finish.",
    icon: MessageSquare,
  },
  {
    title: 'Built Around Your Business',
    text: 'No templates or one-size-fits-all solutions. Every website and application is designed around your goals, your customers and your workflow.',
    icon: Layers,
  },
  {
    title: 'Modern Technology',
    text: 'Built using current technologies including React, Node.js, AI integration, cloud hosting and responsive design to ensure your solution is ready for the future.',
    icon: Code2,
  },
  {
    title: 'Ongoing Support',
    text: 'Launching your website or application is just the beginning. Continued support, updates and future improvements are always available.',
    icon: Workflow,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const whatsappPrefill =
  'Hi George, I found your website and I\'m interested in discussing a project.'
const whatsappLink = `https://wa.me/447707287340?text=${encodeURIComponent(whatsappPrefill)}`
const businessPhone = '07707 287340'

const contactReasons = [
  {
    title: 'Direct Communication',
    text: "You'll always speak directly with the developer building your project.",
    icon: MessageSquare,
  },
  {
    title: 'Fast Response',
    text: 'Most enquiries receive a reply within a few hours.',
    icon: Workflow,
  },
  {
    title: 'Tailored Advice',
    text: 'Every project starts with understanding your business, not selling unnecessary features.',
    icon: Settings,
  },
  {
    title: 'No Obligation',
    text: 'Happy to discuss ideas, even if you are not ready to start yet.',
    icon: BriefcaseBusiness,
  },
]

const trustBannerItems = [
  {
    text: '10% Discount for UK Armed Forces & Veterans',
    icon: Shield,
  },
  {
    text: 'Free Initial Consultation',
    icon: MessageSquare,
  },
  {
    text: "Already have a quote? We'll happily review it and see if we can provide a better solution or better value.",
    icon: Wallet,
  },
]

function AboutPage({ aboutPortrait }) {
  return (
    <div className="site-shell">
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="network-bg" aria-hidden="true">
        <svg viewBox="0 0 1400 900" preserveAspectRatio="none">
          <path d="M80 180 L340 260 L620 180 L900 310 L1240 190" />
          <path d="M170 500 L420 420 L700 560 L1020 480 L1300 610" />
          <path d="M120 730 L360 640 L700 720 L1030 660 L1260 760" />
          <path d="M620 180 L700 560 L700 720" />
          <path d="M340 260 L420 420 L360 640" />
          <path d="M900 310 L1020 480 L1030 660" />
        </svg>
        {[...Array(14)].map((_, i) => (
          <span key={i} style={{ '--n': i }} />
        ))}
      </div>

      <header className="topbar section-wrap">
        <a className="brand" href="#home" aria-label="GB Digital Solutions Home">
          <span className="brand-dot" aria-hidden="true" />
          GB Digital Solutions
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="section-wrap about-page-header">
          <motion.p className="eyebrow" variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
            About George Brennan
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6, delay: 0.08 }}>
            Meet the Developer Behind GB Digital Solutions
          </motion.h1>
          <motion.p
            className="hero-subheading"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            Building websites, mobile apps and custom software designed around real business problems.
          </motion.p>
          <motion.div
            className="hero-actions"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            <a className="btn btn-primary" href="#contact">
              Start Your Project
            </a>
            <a className="btn btn-secondary" href="#home">
              Back to Home
            </a>
          </motion.div>
        </section>

        <section className="section-wrap about-section">
          <div className="about-layout">
            <motion.div
              className="about-visual"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
            >
              <div className="about-floating-icons" aria-hidden="true">
                <span>
                  <Bot size={16} /> AI
                </span>
                <span>
                  <Workflow size={16} /> Automation
                </span>
                <span>
                  <Shield size={16} /> Secure
                </span>
                <span>
                  <BarChart3 size={16} /> Growth
                </span>
              </div>
              <div className="about-portrait-card" role="img" aria-label="Professional portrait">
                {aboutPortrait ? (
                  <img className="about-portrait-image" src={aboutPortrait} alt="George Brennan" loading="lazy" />
                ) : (
                  <div className="about-portrait-fallback" aria-hidden="true" />
                )}
              </div>
            </motion.div>

            <motion.div
              className="about-content"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h2 className="section-title">Meet the Developer Behind GB Digital Solutions</h2>
              <p className="about-subheading">
                Building websites, mobile apps and custom software designed around real business problems.
              </p>
              <div className="about-identity">
                <p className="about-name">George Brennan</p>
                <p className="about-title">Founder, GB Digital Solutions</p>
              </div>

              <div className="about-copy">
                <p>Hi, I'm George Brennan, founder of GB Digital Solutions.</p>
                <p>
                  I build websites, mobile apps and custom software that help businesses work smarter,
                  improve customer experience and save time.
                </p>
                <p>
                  Before becoming a software developer, I served in the British Army and later worked
                  as a registered nurse within the NHS.
                </p>
                <p>
                  Those careers taught me how to solve problems under pressure, communicate effectively,
                  and build systems people can depend on.
                </p>
                <p>
                  Today I combine that real-world experience with modern software development to create
                  practical digital solutions rather than software for the sake of technology.
                </p>
                <p>
                  Whether you need a business website, booking platform, mobile app, AI integration,
                  or bespoke software, every project is designed around your goals rather than a
                  one-size-fits-all template.
                </p>
                <p>
                  I believe the best software starts with understanding the problem. Technology is simply
                  the tool used to solve it.
                </p>
              </div>

              <div className="about-feature-grid">
                {aboutFeatureCards.map((feature, index) => {
                  const Icon = feature.icon

                  return (
                    <motion.article
                      key={feature.title}
                      className="about-feature-card"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="about-feature-icon">
                        <Icon size={16} />
                      </div>
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </motion.article>
                  )
                })}
              </div>

              <a className="btn btn-primary" href="#contact">
                Start Your Project
              </a>
            </motion.div>
          </div>

          <motion.div
            className="about-timeline-wrap"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <h3>Problem-Solving Experience Timeline</h3>
            <div className="about-timeline">
              {aboutTimeline.map((item) => (
                <div key={item} className="about-timeline-item">
                  <span className="timeline-dot" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="section-wrap about-cta">
          <motion.h2
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Let's Build Something That Makes A Difference
          </motion.h2>
          <motion.p
            className="section-copy"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Whether you're starting a new business, modernizing an existing one or have an idea you'd
            like to bring to life, I'd love to hear about it.
          </motion.p>
          <motion.div
            className="about-cta-actions"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <a className="btn btn-primary" href="#contact">
              Start Your Project
            </a>
            <a className="btn btn-secondary" href="#home">
              Back to Home
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <p>© {new Date().getFullYear()} GB Digital Solutions. All rights reserved.</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="social-links" aria-label="Social links">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Workflow size={16} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <MessageSquare size={16} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Mail size={16} />
          </a>
        </div>
      </footer>
    </div>
  )
}

function App() {
  const [activePage, setActivePage] = useState(getPageFromHash)
  const [activeShowcase, setActiveShowcase] = useState(0)
  const [activeCaseStudy, setActiveCaseStudy] = useState(0)

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveShowcase((prev) => (prev + 1) % heroShowcase.length)
    }, 7000)

    return () => clearInterval(timer)
  }, [])

  const showcaseItem = heroShowcase[activeShowcase]
  const activeStudy = caseStudies[activeCaseStudy]
  const aboutPortrait = getAsset('about-portrait.png')
  const caseImage = getAsset(activeStudy.image)

  if (activePage === 'about') {
    return <AboutPage aboutPortrait={aboutPortrait} />
  }

  return (
    <div className="site-shell">
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="network-bg" aria-hidden="true">
        <svg viewBox="0 0 1400 900" preserveAspectRatio="none">
          <path d="M80 180 L340 260 L620 180 L900 310 L1240 190" />
          <path d="M170 500 L420 420 L700 560 L1020 480 L1300 610" />
          <path d="M120 730 L360 640 L700 720 L1030 660 L1260 760" />
          <path d="M620 180 L700 560 L700 720" />
          <path d="M340 260 L420 420 L360 640" />
          <path d="M900 310 L1020 480 L1030 660" />
        </svg>
        {[...Array(14)].map((_, i) => (
          <span key={i} style={{ '--n': i }} />
        ))}
      </div>

      <motion.div
        className="announcement-shell"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="section-wrap announcement-bar" aria-label="Trust highlights">
          {trustBannerItems.map((item) => {
            const Icon = item.icon

            return (
              <p key={item.text} className="announcement-item">
                <Icon size={15} />
                <span>{item.text}</span>
              </p>
            )
          })}
        </div>
      </motion.div>

      <header className="topbar section-wrap">
        <a className="brand" href="#home" aria-label="GB Digital Solutions Home">
          <span className="brand-dot" aria-hidden="true" />
          GB Digital Solutions
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#what-we-build">What We Build</a>
          <a href="#case-studies">Case Studies</a>
          <a href="#how-i-work">How I Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-particles" aria-hidden="true">
            {[...Array(14)].map((_, i) => (
              <span key={i} style={{ '--i': i }} />
            ))}
          </div>

          <div className="hero-layout">
            <div className="hero-left">
              <motion.p className="eyebrow" variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
                Building digital solutions around real business problems.
              </motion.p>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6, delay: 0.08 }}>
                Software That Solves Real Business Problems
              </motion.h1>

              <motion.div
                className="hero-credibility-strip"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.12 }}
              >
                <span>
                  <CheckCircle2 size={14} /> Former British Army
                </span>
                <span>
                  <CheckCircle2 size={14} /> Former NHS Nurse
                </span>
                <span>
                  <CheckCircle2 size={14} /> Published Apps on Google Play
                </span>
              </motion.div>

              <motion.p
                className="hero-subheading"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.18 }}
              >
                I design and build websites, mobile apps, AI-powered tools and business software
                that help businesses save time, improve customer experiences and grow.
              </motion.p>

              <motion.p
                className="hero-story"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.24 }}
              >
                Built by a former British Army soldier and NHS nurse who understands real
                operational challenges and develops practical digital solutions around them.
              </motion.p>

              <motion.div
                className="hero-actions"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a className="btn btn-primary" href="#contact">
                  Start Your Project
                </a>
                <a className="btn btn-secondary" href="#case-studies">
                  View My Work
                </a>
              </motion.div>

              <motion.div
                className="hero-solution-badges"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.36 }}
              >
                <span>
                  <CheckCircle2 size={15} /> Websites
                </span>
                <span>
                  <CheckCircle2 size={15} /> Mobile Apps
                </span>
                <span>
                  <CheckCircle2 size={15} /> AI & Automation
                </span>
              </motion.div>
            </div>

            <motion.div
              className="hero-right"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={showcaseItem.name}
                  className="hero-featured-label"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  Featured Project: {showcaseItem.name}
                </motion.p>
              </AnimatePresence>

              <div className="hero-device-stack">
                {heroShowcase.map((project, index) => {
                  const image = getAsset(project.image)

                  return (
                    <motion.a
                      key={project.name}
                      href="#case-studies"
                      onClick={() => setActiveCaseStudy(project.caseStudyIndex)}
                      className={`hero-device-card ${project.device === 'phone' ? 'is-phone' : 'is-laptop'} ${index === activeShowcase ? 'is-active' : ''} card-${index + 1}`}
                      transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
                      whileHover={{ y: -12, scale: 1.02 }}
                    >
                      <div className="hero-device-frame">
                        <div className="hero-device-screen-real">
                          {image ? (
                            <img src={image} alt={`${project.name} project preview`} loading="lazy" />
                          ) : (
                            <div className="hero-device-fallback">{project.name}</div>
                          )}
                        </div>
                      </div>
                      <div className="hero-device-meta">
                        <p>{project.name} - {project.descriptor}</p>
                        <h3>{project.name}</h3>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-wrap services-section" id="services">
          <motion.h2
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            Services
          </motion.h2>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.article
                  key={service.title}
                  className="service-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  <div className="service-icon">
                    <Icon size={18} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section className="section-wrap" id="case-studies">
          <motion.h2
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            Interactive Project Case Studies
          </motion.h2>
          <p className="section-copy">
            Show the problem, the solution, the stack, screenshots, and a live demo path for every project.
          </p>

          <div className="case-study-shell">
            <div className="case-study-list" role="tablist" aria-label="Case studies">
              {caseStudies.map((study, index) => (
                <button
                  key={study.name}
                  type="button"
                  role="tab"
                  className={`case-study-tab ${activeCaseStudy === index ? 'active' : ''}`}
                  aria-selected={activeCaseStudy === index}
                  onClick={() => setActiveCaseStudy(index)}
                >
                  <h3>{study.name}</h3>
                  <p>{study.summary}</p>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={activeStudy.name}
                className="case-study-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  className={`project-image ${caseImage ? 'has-media' : ''}`}
                  role="img"
                  aria-label={`${activeStudy.name} screenshot placeholder`}
                >
                  {caseImage ? (
                    <img src={caseImage} alt={`${activeStudy.name} screenshot`} loading="lazy" />
                  ) : (
                    <span>Project Screenshot Area</span>
                  )}
                </div>
                <div className="case-study-content">
                  <h3>{activeStudy.name}</h3>
                  <p>
                    <strong>The problem:</strong> {activeStudy.problem}
                  </p>
                  <p>
                    <strong>The solution:</strong> {activeStudy.solution}
                  </p>
                  <div className="tag-row">
                    {activeStudy.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </section>

        <section className="section-wrap" id="how-i-work">
          <h2 className="section-title">How I Work</h2>
          <p className="section-copy">
            A clear, transparent delivery path so you always know what happens next.
          </p>
          <div className="how-work-track">
            {howIWorkSteps.map((step, index) => (
              <motion.div
                key={step}
                className="how-work-step"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <span>{index + 1}</span>
                <h3>{step}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section-wrap trust-section" id="why-choose">
          <motion.h2
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            Why Businesses Choose GB Digital Solutions
          </motion.h2>

          <p className="section-copy">Technology should solve problems, not create them.</p>
          <p className="section-copy trust-intro">
            Every project is built with a focus on usability, performance and delivering real value.
            Whether it is a business website, mobile app or custom software, the objective is always
            the same: create solutions that make your business work better.
          </p>

          <div className="trust-grid">
            {trustReasons.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.article
                  key={item.title}
                  className="trust-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="trust-icon">
                    <Icon size={18} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              )
            })}
          </div>

          <motion.div
            className="commitment-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <h3>My Commitment</h3>
            <p>
              When you work with GB Digital Solutions, you are not just hiring a developer. You are
              partnering with someone who genuinely wants your project to succeed.
            </p>
            <p>
              I believe the best software comes from understanding the problem before writing a
              single line of code. If I think there is a better solution, I will tell you. If I think
              a feature will not add value, I will say so.
            </p>
            <p className="trust-quote">I build software I would be proud to put my own name to.</p>
          </motion.div>
        </section>

        <section className="section-wrap contact-redesign" id="contact">
          <div className="contact-particles" aria-hidden="true">
            {[...Array(10)].map((_, i) => (
              <span key={i} style={{ '--c': i }} />
            ))}
          </div>

          <motion.h2
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Let's Build Something Together
          </motion.h2>
          <motion.p
            className="section-copy contact-intro"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            You do not need a detailed technical specification. If you have an idea or simply a
            problem you would like technology to solve, I would love to hear about it. Let's have a
            conversation and work out the best solution together.
          </motion.p>

          <motion.article
            className="whatsapp-hero-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <div className="whatsapp-hero-body">
              <div className="whatsapp-icon-wrap">
                <MessageSquare size={30} />
              </div>
              <div>
                <h3>Let's Talk About Your Project</h3>
                <p>
                  Whether you need a website, mobile app or custom software, send me a WhatsApp
                  message and let's discuss your idea.
                </p>
                <p className="contact-response-time">Usually replies within a few hours.</p>
              </div>
            </div>
            <a className="btn btn-whatsapp btn-whatsapp-hero" href={whatsappLink} target="_blank" rel="noreferrer">
              Start a WhatsApp Chat
            </a>
            <p className="whatsapp-reassurance">
              No obligation. No sales pressure. Just a conversation about your idea.
            </p>
          </motion.article>

          <div className="contact-method-grid contact-method-grid-single">
            <motion.article
              className="contact-method-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: 0.04 }}
            >
              <Smartphone size={18} />
              <h3>Business Number</h3>
              <a href="tel:+447707287340">{businessPhone}</a>
              <p>Available during normal business hours.</p>
            </motion.article>
          </div>

          <div className="contact-reasons-grid">
            {contactReasons.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.article
                  key={item.title}
                  className="contact-reason-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <div className="contact-reason-icon">
                    <Icon size={16} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <p>© {new Date().getFullYear()} GB Digital Solutions. All rights reserved.</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#what-we-build">What We Build</a>
          <a href="#case-studies">Case Studies</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="social-links" aria-label="Social links">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Workflow size={16} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <MessageSquare size={16} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Mail size={16} />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
