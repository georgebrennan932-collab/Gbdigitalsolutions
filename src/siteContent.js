import nightpalImage from './assets/nightpal-case.png'
import platemateImage from './assets/platemate-case.png'
import vaultImage from './assets/vault-case.png'

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

function resolveAsset(fileNames) {
  const candidates = Array.isArray(fileNames) ? fileNames : [fileNames]

  const expandedCandidates = candidates.flatMap((fileName) => {
    const lower = fileName.toLowerCase()

    if (/\.(png|jpg|jpeg|webp)$/.test(lower)) {
      return [
        lower,
        `${lower}.jpg`,
        `${lower}.jpeg`,
        `${lower}.png`,
        `${lower}.webp`,
      ]
    }

    return [lower]
  })

  for (const fileName of expandedCandidates) {
    const match = assetMap[fileName]
    if (match) {
      return match
    }
  }

  return null
}

export const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Industries', path: '/industries' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export const homeContent = {
  hero: {
    eyebrow: 'Websites, apps and automation',
    title: 'Build websites, apps and automation that help your business grow.',
    description:
      'GB Digital Solutions creates professional websites, mobile apps, AI tools and custom business software designed to save time, win customers and simplify your business.',
    primaryCta: { label: 'View Portfolio', path: '/portfolio' },
    secondaryCta: { label: 'Get Free Quote', path: '/contact' },
  },
  intro: {
    title: 'Move faster with digital systems built around real business problems.',
    description:
      'GB Digital Solutions helps ambitious businesses replace friction with clarity, from stronger websites and better enquiry journeys to booking logic, mobile apps and automation.',
    points: [
      'Clear messaging that makes your business look more established.',
      'Custom functionality when a template will not solve the real problem.',
      'Direct contact with the developer building the work.',
    ],
  },
  featuredServiceSlugs: ['website-design', 'smart-booking-systems', 'ai-chatbots'],
  featuredProjectSlugs: ['nightpal', 'platemate', 'vault-by-james'],
  latestProjectSlug: 'business-automation',
  whyChooseUs: [
    {
      title: 'Founder-led from first message to launch',
      description: 'You deal directly with George Brennan rather than being passed between sales and delivery teams.',
    },
    {
      title: 'Built around operations, not just appearance',
      description: 'The focus is on enquiry quality, smoother workflows, easier booking and less admin.',
    },
    {
      title: 'Broader than a brochure website',
      description: 'Web, mobile, AI and automation can be combined when the business needs more than a marketing site.',
    },
  ],
  testimonials: [
    {
      title: 'Client feedback available on request',
      body: 'Verified project feedback can be shared directly during the quoting process.',
    },
    {
      title: 'Founder-led delivery',
      body: 'Every project is delivered directly by George, from discovery to launch and support.',
    },
  ],
  finalCta: {
    title: 'Start with a clear conversation about what your business actually needs.',
    description:
      'Whether the next step is a stronger website, a booking workflow or a custom system, the first job is to understand the bottleneck and define the right build.',
    primaryCta: { label: 'Get Free Quote', path: '/contact' },
    secondaryCta: { label: 'See More Work', path: '/portfolio' },
  },
}

export const aboutContent = {
  hero: {
    eyebrow: 'About GB Digital Solutions',
    title: 'Know who is building your software, website or automation.',
    description:
      'George Brennan is a former British Army soldier and NHS nurse who taught himself software development and turned that into GB Digital Solutions.',
  },
  whoIAm:
    'I work directly with business owners who need practical digital systems that create enquiries, reduce admin and improve day-to-day operations. You are not handed to account managers or passed between teams.',
  journey: [
    'Former British Army soldier.',
    'Former NHS nurse.',
    'Self-taught software developer.',
    'Founder of GB Digital Solutions.',
  ],
  whyStarted:
    'GB Digital Solutions exists because many businesses are offered flashy websites but still struggle with enquiries, follow-up and delivery workflows. The goal is to build digital systems that solve those real operational problems.',
  values: [
    {
      title: 'Clarity over jargon',
      description: 'Clients should understand what is being built, why it matters and what happens next.',
    },
    {
      title: 'Useful systems over filler',
      description: 'Every feature should serve a business need rather than exist to fill space.',
    },
    {
      title: 'Direct communication',
      description: 'Questions, feedback and decisions stay with me so progress stays clear and accountable.',
    },
  ],
  workStyle: [
    'Discovery first, so the business problem is clear before anything is designed or built.',
    'Focused scope, so the first release solves the most important problem instead of trying to do everything at once.',
    'Ongoing support, so the work can keep improving after launch.',
  ],
  timeline: [
    { label: 'Army', detail: 'Discipline, structure and calm decision-making under pressure.' },
    { label: 'NHS', detail: 'Real-world understanding of healthcare communication, trust and processes.' },
    { label: 'Self-taught development', detail: 'Built skill through practical problem-solving and shipped projects.' },
    { label: 'GB Digital Solutions', detail: 'Combines product thinking, software delivery and business problem-solving.' },
  ],
  cta: { label: 'View Portfolio', path: '/portfolio' },
}

export const servicePages = [
  {
    slug: 'website-design',
    title: 'Website Design',
    summary: 'Fast, modern websites designed to generate enquiries and convert visitors into customers.',
    whoFor: [
      'Service businesses that need stronger trust and clearer lead capture.',
      'Clinics that need a more polished brand and better booking prompts.',
      'Founders that need a site to support growth rather than sit there looking unfinished.',
    ],
    problems: [
      'A template site that looks generic or unfinished.',
      'Too much text and not enough clarity about what the business offers.',
      'Visitors leaving without enquiring because the journey is not obvious.',
    ],
    benefits: ['More qualified enquiries.', 'Clearer customer journeys.', 'Higher trust from first visit.'],
    typicalFeatures: ['Service pages built for conversion', 'Lead capture forms and CTA blocks', 'Mobile-first performance and SEO structure'],
    timeline: 'Typical timeline: 2 to 4 weeks depending on page count and integrations.',
    process: ['Discovery', 'Structure and messaging', 'Design', 'Build', 'Launch and support'],
    faqs: [
      {
        q: 'Do you only redesign existing websites?',
        a: 'No. Projects can start from scratch or improve an existing site that no longer reflects the business properly.',
      },
      {
        q: 'Can the site include booking or automation later?',
        a: 'Yes. Many projects start with a strong website and then expand into booking, chatbot or automation features.',
      },
    ],
    gallery: [
      { device: 'desktop', mock: 'website-agency' },
      { device: 'tablet', mock: 'clinic-site' },
      { device: 'phone', mock: 'website-mobile' },
    ],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    summary: 'Mobile apps that turn manual workflows into a fast customer and staff experience on the go.',
    whoFor: [
      'Founders turning an idea into a working product.',
      'Businesses that need a customer-facing mobile experience.',
      'Teams that want a more useful internal tool than a mobile-friendly website can provide.',
    ],
    problems: [
      'Important workflows squeezed awkwardly into email or web forms.',
      'Customers needing faster access on the move.',
      'Product ideas that need a proper mobile-first experience.',
    ],
    benefits: ['Faster task completion.', 'Higher repeat use.', 'Cleaner mobile customer journeys.'],
    typicalFeatures: ['Secure login and user accounts', 'Push notifications and status updates', 'API integration with existing systems'],
    timeline: 'Typical timeline: 6 to 10 weeks for a focused first release.',
    process: ['Product scoping', 'User journeys', 'Interface design', 'Build and test', 'Release planning'],
    faqs: [
      {
        q: 'Can you help shape the product idea?',
        a: 'Yes. The first step is often to narrow the idea into a practical first version that can actually be shipped.',
      },
      {
        q: 'Can mobile apps connect to websites and internal tools?',
        a: 'Yes. App projects can connect with websites, booking flows, dashboards and custom back-end systems.',
      },
    ],
    gallery: [
      { device: 'phone', mock: 'mobile-app' },
      { device: 'phone', image: nightpalImage },
      { device: 'phone', image: platemateImage },
    ],
  },
  {
    slug: 'ai-chatbots',
    title: 'AI Chatbots',
    summary: 'AI chatbot systems that answer common questions instantly and route better leads to your team.',
    whoFor: [
      'Businesses that receive the same enquiries repeatedly.',
      'Teams that want faster response without adding more admin.',
      'Businesses that want a smoother path from question to booking or quote request.',
    ],
    problems: [
      'Slow first response times.',
      'Manual copying of lead details between tools.',
      'Visitors dropping off before they ask the question they came with.',
    ],
    benefits: ['Quicker first response.', 'Less repetitive admin.', 'More consistent lead qualification.'],
    typicalFeatures: ['Custom prompt flows by service', 'Lead capture and qualification logic', 'Human handoff to phone, email or booking'],
    timeline: 'Typical timeline: 2 to 5 weeks depending on integrations.',
    process: ['Conversation mapping', 'Prompt and logic design', 'Integration planning', 'Testing', 'Refinement'],
    faqs: [
      {
        q: 'Does a chatbot replace human support?',
        a: 'No. The goal is to handle the right first steps automatically and pass more complex conversations to a person when needed.',
      },
      {
        q: 'Can a chatbot hand leads into a booking or CRM system?',
        a: 'Yes. Chatbot flows can connect into quotes, diaries, contact forms and follow-up sequences.',
      },
    ],
    gallery: [
      { device: 'desktop', mock: 'chatbot-desktop' },
      { device: 'phone', mock: 'chatbot-mobile' },
      { device: 'tablet', mock: 'chatbot-handoff' },
    ],
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    summary: 'Automation workflows that remove repetitive admin and stop leads or tasks from slipping through the cracks.',
    whoFor: [
      'Businesses wasting time on reminders, follow-up and repetitive admin.',
      'Teams that need information to move more cleanly between systems.',
      'Owners who want less operational drag without hiring just to patch the process.',
    ],
    problems: [
      'Manual lead follow-up.',
      'Too many tasks living in inboxes or memory.',
      'Repeated copying and pasting between tools.',
    ],
    benefits: ['Less manual work.', 'Faster response times.', 'Clearer operational visibility.'],
    typicalFeatures: ['Lead routing and follow-up triggers', 'Automated reminders and notifications', 'Cross-tool workflow integrations'],
    timeline: 'Typical timeline: 2 to 6 weeks depending on workflow complexity.',
    process: ['Workflow audit', 'Bottleneck mapping', 'Automation design', 'Implementation', 'Monitoring'],
    faqs: [
      {
        q: 'Does automation mean changing every system we use?',
        a: 'Not necessarily. The best starting point is often to improve the handoffs around the tools already in place.',
      },
      {
        q: 'Can automation start small?',
        a: 'Yes. A focused automation can prove value quickly before wider changes are made.',
      },
    ],
    gallery: [
      { device: 'desktop', mock: 'automation-pipeline' },
      { device: 'tablet', mock: 'automation-board' },
      { device: 'phone', mock: 'automation-mobile' },
    ],
  },
  {
    slug: 'automated-call-systems',
    title: 'Automated Call Systems',
    summary: 'Automated call systems that reduce missed appointments and improve callback speed without adding staff workload.',
    whoFor: [
      'Businesses where missed appointments or late callbacks cost real money.',
      'Teams that need structured reminder sequences.',
      'Businesses that want voice-based follow-up without manual dialing.',
    ],
    problems: [
      'No-shows and missed appointments.',
      'Leads going cold before a call is made.',
      'Too much staff time spent on repetitive confirmations.',
    ],
    benefits: ['Fewer no-shows.', 'Faster contact cadence.', 'Reduced time spent on repetitive calls.'],
    typicalFeatures: ['Reminder and confirmation call flows', 'Lead callback sequences', 'Delivery and response tracking'],
    timeline: 'Typical timeline: 2 to 4 weeks for an initial call workflow.',
    process: ['Call flow design', 'Message logic', 'Trigger setup', 'Testing', 'Reporting and refinement'],
    faqs: [
      {
        q: 'Can automated calls work alongside text reminders?',
        a: 'Yes. Voice, text and email reminders can be combined depending on the business and customer journey.',
      },
      {
        q: 'Can this be used for lead follow-up as well as reminders?',
        a: 'Yes. Automated calls can support both customer operations and sales follow-up workflows.',
      },
    ],
    gallery: [
      { device: 'desktop', mock: 'call-system' },
      { device: 'phone', mock: 'call-system-mobile' },
      { device: 'tablet', mock: 'call-system-queue' },
    ],
  },
  {
    slug: 'smart-booking-systems',
    title: 'Smart Booking Systems',
    summary: 'Booking systems that prevent scheduling errors and reduce back-and-forth messages for appointment-led teams.',
    whoFor: [
      'Clinics and appointment-led services.',
      'Businesses with varying treatment lengths or booking rules.',
      'Teams that want fewer admin messages and fewer booking mistakes.',
    ],
    problems: [
      'Manual scheduling and diary checking.',
      'Back-and-forth messages to find a slot.',
      'No-shows or inconsistent follow-up after booking.',
    ],
    benefits: ['Cleaner calendars.', 'Fewer booking mistakes.', 'Less admin work per appointment.'],
    typicalFeatures: ['Rules-based slot availability', 'Automated confirmations and reminders', 'Staff notifications and diary updates'],
    timeline: 'Typical timeline: 3 to 6 weeks depending on booking rules.',
    process: ['Rules mapping', 'Customer journey design', 'Admin flow build', 'Reminder logic', 'Testing'],
    faqs: [
      {
        q: 'Can treatment length and breaks be handled automatically?',
        a: 'Yes. Booking rules can take account of treatment duration, working hours, breaks and diary constraints.',
      },
      {
        q: 'Can confirmations and reminders be included?',
        a: 'Yes. Booking journeys can include immediate confirmation, staff notification and reminder messages.',
      },
    ],
    gallery: [
      { device: 'desktop', mock: 'booking-dashboard' },
      { device: 'tablet', mock: 'booking-calendar' },
      { device: 'phone', mock: 'booking-mobile' },
    ],
    flagshipPath: '/smart-booking-systems',
  },
  {
    slug: 'custom-business-software',
    title: 'Custom Business Software',
    summary: 'Custom software that replaces spreadsheet-heavy processes with one system built around how your business actually works.',
    whoFor: [
      'Businesses juggling spreadsheets, generic tools and manual workarounds.',
      'Teams that need a central internal system.',
      'Owners who need software to reflect how the business actually runs.',
    ],
    problems: [
      'Processes spread across too many tools.',
      'Important information being hard to track or share.',
      'Software dictating the workflow instead of supporting it.',
    ],
    benefits: ['One source of operational truth.', 'Fewer manual workarounds.', 'Scalable workflow foundation.'],
    typicalFeatures: ['Role-based dashboards', 'Workflow and approval tracking', 'Reporting and operational analytics'],
    timeline: 'Typical timeline: 6 to 12 weeks depending on scope.',
    process: ['Workflow discovery', 'System planning', 'Interface design', 'Build', 'Iterative rollout'],
    faqs: [
      {
        q: 'Does custom software have to be a huge project?',
        a: 'No. It often starts with one focused internal tool that solves the most expensive bottleneck first.',
      },
      {
        q: 'Can custom software grow over time?',
        a: 'Yes. The first version can be kept tight and then expanded once the foundation is working well.',
      },
    ],
    gallery: [
      { device: 'desktop', mock: 'custom-software' },
      { device: 'tablet', mock: 'custom-software-tablet' },
      { device: 'phone', mock: 'custom-software-mobile' },
    ],
  },
]

export const projects = [
  {
    slug: 'nightpal',
    title: 'NightPal',
    client: 'Internal product project',
    industry: 'Personal safety',
    status: 'Internal product build',
    overview:
      'NightPal is a personal safety mobile app built to help users trigger alerts and share location quickly in high-pressure situations.',
    problem:
      'People in vulnerable moments need very fast access to help and location sharing, without being forced through too many steps.',
    solution:
      'The product was designed around rapid actions, clearer emergency communication and a simpler path to notifying trusted contacts.',
    features: ['Emergency alerts', 'Live location sharing', 'Trusted contact flows', 'Fast-access actions'],
    technologies: ['React Native', 'Firebase', 'Realtime messaging', 'Maps'],
    results: ['Add verified product outcomes or user feedback here.'],
    lessons: ['Strong safety products depend on clarity, speed and low-friction interaction.'],
    gallery: [
      { device: 'desktop', image: nightpalImage },
      { device: 'phone', image: nightpalImage },
      { device: 'tablet', mock: 'nightpal-support' },
    ],
  },
  {
    slug: 'platemate',
    title: 'PlateMate',
    client: 'Internal product project',
    industry: 'Health and wellness',
    status: 'Internal product build',
    overview:
      'PlateMate explores how nutrition tracking, coaching and mobile convenience can live inside one calmer product experience.',
    problem:
      'Nutrition tools often feel fragmented, which makes consistency harder and weakens long-term use.',
    solution:
      'The product combines meal logging, AI-supported guidance and progress views into a more cohesive mobile experience.',
    features: ['Meal logging', 'AI guidance', 'Progress views', 'Nutrition-focused mobile UX'],
    technologies: ['React Native', 'OpenAI API', 'Firebase', 'Nutrition APIs'],
    results: ['Add verified user feedback, retention data or launch notes here.'],
    lessons: ['Health products benefit from reducing effort before they add more guidance.'],
    gallery: [
      { device: 'desktop', image: platemateImage },
      { device: 'phone', image: platemateImage },
      { device: 'tablet', mock: 'platemate-flow' },
    ],
  },
  {
    slug: 'beauty-clinic-website',
    title: 'Beauty Clinic Website',
    client: 'Client name to be added',
    industry: 'Beauty clinics',
    status: 'Client website build',
    overview:
      'A clinic website project designed to improve trust, explain treatments clearly and convert visitors into consultation requests.',
    problem:
      'Clinic websites often fail to balance credibility, service education and a clear booking journey.',
    solution:
      'The build uses clear treatment pages, trust-focused copy and direct booking entry points to increase enquiry quality.',
    features: ['Treatment pages', 'Consultation prompts', 'Trust-building layout', 'Booking entry points'],
    technologies: ['React', 'Modern CSS', 'Booking workflow planning'],
    results: ['Add verified outcomes after client approval or launch.'],
    lessons: ['Clinics need trust signals and operational clarity, not just attractive visuals.'],
    gallery: [
      {
        device: 'desktop',
        image: resolveAsset(['ceauty-clinic.png', 'beauty-clinic.png', 'skb.png', 'skb-aesthetics.png', 'beauty-clinic-website.png']),
        placeholderFileName: 'ceauty-clinic.png',
        mock: 'clinic-site',
      },
      {
        device: 'tablet',
        image: resolveAsset(['skb-tablet.png', 'skb-aesthetics-tablet.png', 'beauty-clinic-tablet.png']),
        mock: 'clinic-services',
      },
      {
        device: 'phone',
        image: resolveAsset(['skb-mobile.png', 'skb-aesthetics-mobile.png', 'beauty-clinic-mobile.png']),
        mock: 'clinic-mobile',
      },
    ],
  },
  {
    slug: 'restaurant-website',
    title: 'Restaurant Website',
    client: 'Client name to be added',
    industry: 'Restaurants',
    status: 'Client website build',
    overview:
      'A restaurant website project focused on turning menu views into reservations and direct customer enquiries.',
    problem:
      'Restaurant sites often bury bookings and make the menu or atmosphere harder to understand than it should be.',
    solution:
      'The build prioritises reservation prompts, clear menu browsing and a faster mobile journey for local diners.',
    features: ['Reservation prompts', 'Menu layouts', 'Mobile-first browsing', 'Event and promotion support'],
    technologies: ['React', 'Conversion-focused layout', 'Reservation flow planning'],
    results: ['Add verified booking uplift or launch feedback here.'],
    lessons: ['Restaurants need speed, mood and reservation clarity more than dense information.'],
    gallery: [
      {
        device: 'desktop',
        image: resolveAsset(['restaurant-website.png', 'restaurant.png']),
        placeholderFileName: 'restaurant.png',
        mock: 'restaurant-site',
      },
      {
        device: 'tablet',
        image: resolveAsset(['restaurant-tablet.png', 'restaurant-website-tablet.png']),
        mock: 'restaurant-menu',
      },
      {
        device: 'phone',
        image: resolveAsset(['restaurant-mobile.png', 'restaurant-website-mobile.png']),
        mock: 'restaurant-mobile',
      },
    ],
  },
  {
    slug: 'tradesman-website',
    title: 'Tradesman Website',
    client: 'Client name to be added',
    industry: 'Trades',
    status: 'Client website build',
    overview:
      'A trades business website project built to increase quote requests and improve first-response speed.',
    problem:
      'Trades businesses often rely on word of mouth but still lose leads when the site does not make quoting or contact easy.',
    solution:
      'The build combines trust signals, project proof and direct quote pathways to reduce lead drop-off.',
    features: ['Quote request flow', 'Trust-building service layout', 'Project gallery', 'Call and message actions'],
    technologies: ['React', 'Lead capture UX', 'Follow-up planning'],
    results: ['Add verified lead or booking outcomes after launch.'],
    lessons: ['Local service businesses need clarity and response speed more than decorative complexity.'],
    gallery: [
      {
        device: 'desktop',
        image: resolveAsset(['trade.png', 'tradesperson.png', 'tradesman-website.png', 'tradeperson-website.png', 'trades-website.png']),
        placeholderFileName: 'trade.png',
        mock: 'trades-site',
      },
      {
        device: 'tablet',
        image: resolveAsset(['tradesman-tablet.png', 'tradeperson-tablet.png', 'trades-website-tablet.png']),
        mock: 'trades-quote',
      },
      {
        device: 'phone',
        image: resolveAsset(['tradesman-mobile.png', 'tradeperson-mobile.png', 'trades-website-mobile.png']),
        mock: 'trades-mobile',
      },
    ],
  },
  {
    slug: 'booking-system',
    title: 'Booking System',
    client: 'Client name to be added',
    industry: 'Appointments and clinics',
    status: 'Booking and scheduling platform',
    overview:
      'A booking and scheduling platform designed to automate slot logic and reduce diary admin for appointment-led businesses.',
    problem:
      'Manual booking creates friction, more messages and more chance of scheduling mistakes.',
    solution:
      'The platform uses rules-based availability, treatment durations, reminders and diary updates to reduce scheduling friction.',
    features: ['Treatment-based slot logic', 'Confirmation flow', 'Reminders', 'Diary updates'],
    technologies: ['Workflow design', 'Calendar logic', 'Automation planning'],
    results: ['Add verified operational improvements when live project data is approved.'],
    lessons: ['Operational software sells best when the workflow is immediately understandable.'],
    gallery: [
      { device: 'desktop', mock: 'booking-dashboard' },
      { device: 'tablet', mock: 'booking-calendar' },
      { device: 'phone', mock: 'booking-mobile' },
    ],
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot',
    client: 'Client name to be added',
    industry: 'Customer support and lead capture',
    status: 'AI enquiry workflow build',
    overview:
      'An AI enquiry workflow built to answer common questions quickly and move visitors toward quote or booking actions.',
    problem:
      'Visitors often leave before they get an answer, especially when the business cannot respond quickly enough.',
    solution:
      'The workflow focuses on lead qualification, useful first responses and smooth handoff into human support.',
    features: ['Lead qualification', 'Instant responses', 'Booking prompts', 'Human handoff'],
    technologies: ['Conversation design', 'OpenAI integration planning', 'Workflow logic'],
    results: ['Add verified outcomes after deployment and approval.'],
    lessons: ['Chatbots work best when they shorten the path to a real next step.'],
    gallery: [
      { device: 'desktop', mock: 'chatbot-desktop' },
      { device: 'tablet', mock: 'chatbot-handoff' },
      { device: 'phone', mock: 'chatbot-mobile' },
    ],
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    client: 'Client name to be added',
    industry: 'Operations',
    status: 'Operations automation workflow',
    overview:
      'An operations automation workflow built to reduce manual follow-up and improve internal delivery consistency.',
    problem:
      'Too much admin still happens in inboxes, spreadsheets and memory rather than through a clean process.',
    solution:
      'The workflow uses structured triggers, reminders and routing rules to move information with less manual effort.',
    features: ['Lead routing', 'Reminder automation', 'Workflow triggers', 'Operational visibility'],
    technologies: ['Automation planning', 'Integrations', 'Workflow logic'],
    results: ['Add verified time savings or operational outcomes when approved.'],
    lessons: ['The best automation targets one expensive bottleneck first instead of trying to change everything at once.'],
    gallery: [
      { device: 'desktop', mock: 'automation-pipeline' },
      { device: 'tablet', mock: 'automation-board' },
      { device: 'phone', mock: 'automation-mobile' },
    ],
  },
  {
    slug: 'vault-by-james',
    title: 'Vault by James',
    client: 'Vault by James',
    industry: 'E-commerce',
    status: 'E-commerce platform build',
    overview:
      'A custom e-commerce build designed to improve product presentation, credibility and stock management flow.',
    problem:
      'Specialist stores need a stronger digital presence than a basic catalogue if they want to build trust and support repeat buying.',
    solution:
      'The project focused on a purpose-built product catalogue, cleaner mobile browsing and a better operational foundation for managing stock and checkout.',
    features: ['Custom catalogue', 'Admin tools', 'Mobile-first checkout', 'Store management flow'],
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Node.js'],
    results: ['Add verified commercial outcomes or client-approved feedback here.'],
    lessons: ['Niche e-commerce performs better when brand presentation and operations improve together.'],
    gallery: [
      { device: 'desktop', image: vaultImage },
      { device: 'tablet', mock: 'vault-admin' },
      { device: 'phone', image: vaultImage },
    ],
  },
]

export const industryPages = [
  {
    slug: 'beauty-clinics',
    title: 'Beauty Clinics',
    summary: 'Help beauty clinics look more credible, book more smoothly and reduce appointment admin.',
    painPoints: ['Manual booking messages.', 'Weak trust signals online.', 'Treatment information that feels confusing or generic.'],
    help: ['Premium clinic websites.', 'Treatment-led booking journeys.', 'Reminder and consultation workflows.'],
    serviceSlugs: ['website-design', 'smart-booking-systems', 'ai-chatbots'],
  },
  {
    slug: 'restaurants',
    title: 'Restaurants',
    summary: 'Help restaurants turn browsing into reservations, takeaway actions and direct customer contact.',
    painPoints: ['Buried booking links.', 'Menus that are hard to browse on mobile.', 'A site that does not match the quality of the venue.'],
    help: ['Reservation-friendly websites.', 'Menu-first mobile layouts.', 'Promotion and enquiry workflows.'],
    serviceSlugs: ['website-design', 'business-automation'],
  },
  {
    slug: 'trades',
    title: 'Trades',
    summary: 'Help trades businesses win more enquiries and reduce time lost on manual follow-up.',
    painPoints: ['Leads going cold.', 'Weak quote-request journeys.', 'Too much admin around chasing and scheduling.'],
    help: ['Lead-generation websites.', 'Follow-up workflows.', 'Quote and booking support systems.'],
    serviceSlugs: ['website-design', 'business-automation', 'automated-call-systems'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    summary: 'Help healthcare-related services communicate more clearly and operate with more confidence.',
    painPoints: ['Patient-facing messaging that lacks clarity.', 'Booking friction.', 'Processes that create too much manual admin.'],
    help: ['Trust-led websites.', 'Booking systems.', 'Operational automation for reminders and communication.'],
    serviceSlugs: ['website-design', 'smart-booking-systems', 'business-automation'],
  },
  {
    slug: 'gyms',
    title: 'Gyms',
    summary: 'Help gyms sell memberships, classes and first enquiries more effectively.',
    painPoints: ['Weak class booking experience.', 'Poor presentation of offers or programmes.', 'Manual handling of routine enquiries.'],
    help: ['Membership-focused websites.', 'Class booking flows.', 'Lead qualification automation.'],
    serviceSlugs: ['website-design', 'ai-chatbots', 'smart-booking-systems'],
  },
  {
    slug: 'estate-agents',
    title: 'Estate Agents',
    summary: 'Help estate agents present listings better and reduce friction around viewings and valuation enquiries.',
    painPoints: ['Slow lead follow-up.', 'Poor property presentation.', 'Manual viewing coordination.'],
    help: ['Lead-focused websites.', 'Viewing request workflows.', 'Follow-up automations.'],
    serviceSlugs: ['website-design', 'business-automation', 'automated-call-systems'],
  },
  {
    slug: 'professional-services',
    title: 'Professional Services',
    summary: 'Help professional service firms appear more established and make consultation enquiries easier.',
    painPoints: ['Generic-looking websites.', 'Weak first impression.', 'No clear path from visitor to consultation.'],
    help: ['Authority-building websites.', 'Consultation funnels.', 'Better contact and follow-up journeys.'],
    serviceSlugs: ['website-design', 'ai-chatbots', 'custom-business-software'],
  },
]

export const blogPosts = [
  {
    slug: 'website-tips-for-local-businesses',
    title: 'Website Tips for Local Businesses',
    category: 'Website tips',
    excerpt: 'A practical look at what local businesses should prioritise if they want a website to support enquiries instead of just existing online.',
    sections: [
      {
        heading: 'Make the offer obvious quickly',
        body: 'Visitors should understand what the business does, who it helps and what action to take without hunting for it.',
      },
      {
        heading: 'Use trust where it matters',
        body: 'Photos, real project work, reviews and clearer explanation of process usually matter more than long blocks of generic copy.',
      },
      {
        heading: 'Reduce friction around contact',
        body: 'Call, email, WhatsApp and quote-request paths should be easy to find and easy to use on mobile.',
      },
    ],
  },
  {
    slug: 'automation-ideas-for-service-businesses',
    title: 'Automation Ideas for Service Businesses',
    category: 'Automation ideas',
    excerpt: 'Small automation wins can remove real admin load without forcing a business into a giant systems overhaul.',
    sections: [
      {
        heading: 'Start where time is already being lost',
        body: 'Lead follow-up, reminders and repeated admin are often better starting points than trying to automate everything at once.',
      },
      {
        heading: 'Connect existing tools before replacing them',
        body: 'A useful automation often sits between current systems rather than demanding a full change all at once.',
      },
      {
        heading: 'Keep the first workflow narrow',
        body: 'The first automation should prove value clearly and reduce one expensive bottleneck before expanding.',
      },
    ],
  },
  {
    slug: 'ai-guides-for-customer-enquiries',
    title: 'AI Guides for Customer Enquiries',
    category: 'AI guides',
    excerpt: 'AI can improve speed and clarity around first responses, but it works best when it leads somewhere useful.',
    sections: [
      {
        heading: 'Use AI to shorten the path',
        body: 'The strongest AI use cases answer common questions, qualify intent and move the visitor toward a real next step.',
      },
      {
        heading: 'Keep human handoff easy',
        body: 'Visitors should never feel trapped in automation when their question needs a person.',
      },
      {
        heading: 'Design around the journey, not the novelty',
        body: 'The commercial value comes from speed, clarity and routing, not from calling something AI for the sake of it.',
      },
    ],
  },
  {
    slug: 'seo-advice-for-growing-businesses',
    title: 'SEO Advice for Growing Businesses',
    category: 'SEO advice',
    excerpt: 'SEO is easier to support when the underlying website already has clear structure, useful content and a real conversion path.',
    sections: [
      {
        heading: 'Structure first',
        body: 'Clear service pages, useful headings and specific content usually matter before more advanced tactics do.',
      },
      {
        heading: 'Write for search intent and sales intent',
        body: 'The best pages help someone searching while also making it obvious why the business is worth contacting.',
      },
      {
        heading: 'Do not separate SEO from user experience',
        body: 'A stronger site often improves search readiness and conversion at the same time.',
      },
    ],
  },
]
