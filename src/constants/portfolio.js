// Personal details and contact form configuration.
export const profile = {
  name: 'Shaurya Agnihotri',
  role: 'Shopify & full-stack developer',
  headline: 'Websites built to convert.',
  introduction: 'I build responsive, conversion-focused websites across Shopify, Next.js, React and WordPress, with a focus on speed, usability and clean code.',
  approach: 'From landing pages and business websites to full e-commerce stores, I focus on mobile-first layouts, SEO-friendly structure, clear calls to action and smoother shopping journeys. The goal is to turn more visitors into customers through thoughtful design and measurable improvements.',
  reportedResult: 'Previous client work has reportedly helped increase sales through site architecture, checkout and performance improvements. Results vary by project.',
  contactIntro: 'Tell me about your store, landing page or business website. We can discuss your goals, scope and the right approach before getting started.',
  stackHighlights: ['Shopify', 'Liquid', 'React', 'Next.js', 'WordPress', 'Vue.js', 'TypeScript', 'Node.js'],
  portrait: '/images/shaurya.webp',
  email: (import.meta.env.VITE_CONTACT_EMAIL || '').trim(),
  github: (import.meta.env.VITE_GITHUB_URL || '').trim(),
  fiverr: (import.meta.env.VITE_FIVERR_URL || '').trim(),
  web3formsAccessKey: (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim(),
};
// Local interactive examples, not client projects or production integrations.
export const workItems = [
  { id: 'shopify-demo', name: 'Shopify', type: 'Interactive storefront concept', description: 'Explore product options, variant pricing and cart interactions in a small storefront demonstration.', stack: ['Liquid concepts', 'React', 'CSS'], demo: 'shopify' },
  { id: 'cro-demo', name: 'Conversions', type: 'Interactive UX concept', description: 'Compare two illustrative checkout flows. Clear order summaries and fewer unnecessary steps can reduce customer friction. No performance results are implied.', stack: ['CRO', 'UX', 'Responsive design'], demo: 'cro' },
  { id: 'fullstack-demo', name: 'Full-stack', type: 'Interactive data concept', description: 'Filter a sample order dataset in the browser. This illustrates responsive data interfaces, not a live database or API.', stack: ['React', 'JavaScript', 'Data handling'], demo: 'data' },
];
export const expertise = [
  { id: 'shopify', title: 'Shopify development', caption: 'Custom themes, product pages, store integrations and shopping journeys.', skills: ['Shopify', 'Liquid', 'Custom Shopify themes', 'Sections & blocks', 'Product & collection templates', 'Metafields & metaobjects', 'Cart & checkout UX', 'Shopify app integrations', 'Shopify CLI & Theme Check', 'Storefront API', 'Admin API & webhooks'] },
  { id: 'web-growth', title: 'Websites & CRO', caption: 'WordPress, business sites, landing pages, conversions and search performance.', skills: ['WordPress', 'Mobile-first design', 'Landing pages', 'Conversion optimization (CRO)', 'SEO-friendly structure', 'Performance optimization', 'Analytics & testing', 'Website features & integrations', 'Web accessibility'] },
  { id: 'frontend', title: 'Frontend engineering', caption: 'Responsive, accessible interfaces and maintainable frontend code.', skills: ['HTML & CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Redux', 'Tailwind CSS', 'GSAP'] },
  { id: 'backend', title: 'Backend engineering', caption: 'Request handling, data modelling, integrations and authentication.', skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Prisma', 'Firebase Auth'] },
  { id: 'workflow', title: 'Development workflow', caption: 'Version control, deployment, clear communication and reliable delivery.', skills: ['Git & GitHub', 'Vercel', 'Figma', 'Testing & debugging'] },
  { id: 'fundamentals', title: 'Programming fundamentals', caption: 'Programming logic, data structures and problem-solving.', skills: ['C Programming', 'C++', 'Rust', 'Data structures', 'Algorithms'] },
];

export const skillDescriptions = {
  'Shopify CLI & Theme Check': 'Local theme development, previewing changes, and static analysis for Liquid and theme code.',
  'Storefront API': 'Query product and collection data and work with storefront cart operations using supported access scopes.',
  'Admin API & webhooks': 'Authorized store operations and event-driven integrations using Shopify’s GraphQL Admin API and verified webhook delivery.',
  'Web accessibility': 'Semantic interfaces, keyboard access, focus states, form labels and readable contrast.', 
  Shopify: 'E-commerce storefront development, theme customization, product merchandising and store configuration.',
  Liquid: 'Shopify template logic, objects, tags and filters combined with JavaScript and CSS to build dynamic storefronts.',
  'Custom Shopify themes': 'Build and customize reusable, maintainable theme components instead of relying on rigid templates.',
  'Sections & blocks': 'Flexible theme editor components that let merchants update page layouts and content without changing code.',
  'Product & collection templates': 'Product detail pages, variant selection, collection layouts, filters and clear purchase actions.',
  'Metafields & metaobjects': 'Structured product and store content that can power reusable and editable storefront components.',
  'Cart & checkout UX': 'Reduce purchase friction through clear cart interactions, transparent pricing and checkout improvements within the store’s supported customization options.',
  'Shopify app integrations': 'Connect reviews, marketing, analytics and other appropriate store apps while managing performance and compatibility.',
  WordPress: 'Responsive business websites and editable content experiences using WordPress themes and integrations.',
  'Mobile-first design': 'Design and develop layouts for smaller screens first, then adapt them for tablets and desktops.',
  'Landing pages': 'Focused pages with a clear offer, persuasive content hierarchy, trust information and a meaningful call to action.',
  'Conversion optimization (CRO)': 'Evaluate the customer journey, clarify calls to action, remove friction and improve the path from visit to purchase using evidence.',
  'SEO-friendly structure': 'Semantic markup, descriptive metadata, clear heading hierarchy, crawlable links and sensible page organization.',
  'Performance optimization': 'Reduce unnecessary scripts, optimize images and fonts, and improve rendering and Core Web Vitals.',
  'Analytics & testing': 'Use relevant analytics, conversion events and structured experiments to guide improvements; measure outcomes rather than promise them.',
  'Website features & integrations': 'Marketing and social integrations, video and music embeds, events, maps, FAQ sections, portfolios and reviews, selected to fit the site’s goals.',
  'Vue.js': 'Component-based frontend development and reactive interface state.',
  Rust: 'Systems programming fundamentals focused on memory safety and performance.',

  'HTML & CSS': 'Semantic document structure, adaptive layouts and accessible presentation.',
  JavaScript: 'Application logic, DOM interaction, asynchronous requests and event handling.',
  TypeScript: 'Static types and explicit contracts for maintainable application code.',
  React: 'Reusable UI components, state management and predictable rendering.',
  'Next.js': 'React application routing, server rendering and full-stack application patterns.',
  Redux: 'Shared application state and predictable updates.',
  'Tailwind CSS': 'Utility-first responsive styling with consistent design tokens.',
  GSAP: 'Timeline-based animation and scroll-driven motion.',
  'Node.js': 'JavaScript execution on the server and asynchronous I/O.',
  'Express.js': 'HTTP routing, middleware and API request handling.',
  'REST APIs': 'Resource-oriented HTTP interfaces, status codes and request validation.',
  MongoDB: 'Document-based persistence, querying and indexing.',
  Prisma: 'Typed database access, schema modelling and migrations.',
  'Firebase Auth': 'User sign-in, session identity and authentication flows.',
  'Git & GitHub': 'Version control, branches, review and collaborative development.',
  Vercel: 'Web application deployment and preview environments.',
  Figma: 'Interface design, layouts and interactive prototyping.',
  'Testing & debugging': 'Reproducing defects and verifying application behaviour.',
  'C Programming': 'Procedural programming, memory and low-level application logic.',
  'C++': 'Compiled programming, abstraction and object-oriented fundamentals.',
  'Data structures': 'Choosing suitable structures for storing and accessing information.',
  Algorithms: 'Problem decomposition, correctness and computational complexity.',
};




