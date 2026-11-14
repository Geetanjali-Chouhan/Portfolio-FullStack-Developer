export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  /** Only set when the repository is public, so the button never leads to a 404. */
  repo?: string;
  /** Only set when a publicly reachable deployment exists. */
  live?: string;
  /** Path under /public. If the file is missing a neutral placeholder is shown. */
  image: string;
  imageAlt: string;
};

/**
 * Every claim below was checked against the project's README and/or source.
 * `repo` and `live` are only set for links that were confirmed to open publicly
 * (FoodFleet's GitHub repository is not public, so it has no repo link). Add
 * them once a public link exists.
 */
export const projects: Project[] = [
  {
    slug: "chatting-app",
    name: "Chatting App",
    tagline: "Real-time messaging on the MERN stack",
    description:
      "A full-stack, real-time one-to-one chat application. A React 19 client talks to an Express and MongoDB API, with Socket.IO delivering messages instantly and Redux Toolkit managing client state.",
    features: [
      "Real-time messaging over Socket.IO",
      "JWT authentication stored in httpOnly cookies, with bcrypt-hashed passwords",
      "Email OTP verification and an OTP-based password-reset flow",
      "Read receipts — messages track when they were seen",
      "Protected routes and global state with Redux Toolkit",
    ],
    stack: [
      "React",
      "Redux Toolkit",
      "Tailwind CSS",
      "daisyUI",
      "Socket.IO",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
    ],
    repo: "https://github.com/Geetanjali-Chouhan/Chatting-App",
    live: "https://chatting-app-gupshup.vercel.app/",
    image: "/images/projects/chatting-app.webp",
    imageAlt: "Gupshup Messenger sign-in screen of the live Chatting App",
  },
  {
    slug: "foodfleet",
    name: "FoodFleet",
    tagline: "Multi-restaurant food ordering and delivery",
    description:
      "A MERN platform where customers order from multiple restaurants, with separate Customer, Restaurant, Delivery Partner and Admin roles. An Express and MongoDB API serves a React web app and an Expo (React Native) app for delivery partners.",
    features: [
      "Role-based routes and API access for customers, restaurants, delivery partners and admins",
      "Order lifecycle driven by a shared state machine that only lets the right role make each status change",
      "Cash on delivery or Razorpay online payments, with the payment checked on the server before an order counts as paid",
      "Live order tracking on a map over Socket.IO, shared only while a delivery is under way",
      "In-app notification inbox for order progress, refunds and new orders",
      "API tests on an in-memory MongoDB, plus Playwright browser tests with accessibility checks across nine screen widths",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Redux Toolkit",
      "Tailwind CSS",
      "Leaflet",
      "Socket.IO",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Zod",
      "Razorpay",
      "React Native (Expo)",
    ],
    image: "/images/projects/foodfleet.webp",
    imageAlt: "FoodFleet home page listing restaurants",
  },
  {
    slug: "pulsecrud",
    name: "PulseCRUD",
    tagline: "Personnel & team management",
    description:
      "A human-centred CRUD application for managing team members, built with plain HTML5, CSS3 and modern JavaScript — no frameworks. Data persists in the browser via LocalStorage.",
    features: [
      "Full create, read, update and delete with real-time form validation",
      "Table and grid-card views with a live analytics counter",
      "Instant search across names, emails, roles, departments and skills",
      "Department and status filters with multiple sort orders",
      "Light and dark themes, toast feedback and a delete confirmation dialog",
    ],
    stack: ["HTML5", "CSS3", "JavaScript (ES6+)", "LocalStorage"],
    repo: "https://github.com/Geetanjali-Chouhan/CRUD-Application",
    image: "/images/projects/pulsecrud.webp",
    imageAlt: "PulseCRUD dashboard listing team members in a table",
  },
  {
    slug: "vion",
    name: "VION Virtual Assistant",
    tagline: "A voice-driven assistant in the browser",
    description:
      "A beginner-friendly voice assistant built with HTML, CSS and JavaScript. It listens through the Web Speech API and answers back out loud.",
    features: [
      "Time-of-day greeting on page load",
      "Voice recognition via the Web Speech API",
      "Spoken responses using speech synthesis",
      "Opens sites such as Google and YouTube by voice, and reads out the time and date",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Web Speech API"],
    repo: "https://github.com/Geetanjali-Chouhan/VIRTUAL-ASSISTANT-VION",
    image: "/images/projects/vion.webp",
    imageAlt: "VION virtual assistant landing screen with a microphone button",
  },
];
