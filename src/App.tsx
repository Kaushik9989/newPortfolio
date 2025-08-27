import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ExternalLink, Link as LinkIcon, Award, School, Briefcase, Globe, MapPin, ChevronUp, Copy, Check } from "lucide-react";

// ----------
// Helper data
// ----------
const CONTACT = {
  name: "M. Vivek Kaushik",
  email: "vivekmanepalli08@gmail.com",
  phone: "+91 62816 72715",
  github: "https://github.com/Kaushik9989",
  linkedin: "https://www.linkedin.com/in/vivek-kaushik-manepalli-119422263/",
  portfolio: "https://portfolio-kaushik9989s-projects.vercel.app/",
  location: "India"
};

const EXPERIENCE = [
  {
    company: "Droppoint Systems Private Limited",
    role: "Web Developer Intern",
    period: "Jun 2025 – Aug 2025 (T-Hub, Hyderabad)",
    highlight: true,
    bullets: [
      "Built a secure full‑stack digital parcel locker system with OTP‑based access and real‑time tracking.",
      "Developed RESTful APIs in Node.js/Express for auth, locker reservation, monitoring; integrated QR generation & SMS‑OTP.",
      "Crafted responsive UIs using React, Bootstrap, and EJS; deployed services to AWS.",
      "Impact: streamlined enterprise parcel workflows and reduced manual intervention; deployment‑ready for production.",
    ],
    links: [
      { href: "https://demo.droppoint.in", label: "demo.droppoint.in" },
      { href: "https://locker.droppoint.in", label: "locker.droppoint.in" }
    ]
  }
];

const PROJECTS = [
  {
    title: "Property Listing Platform (WanderLust)",
    period: "Jan – Feb 2025",
    description:
      "Full‑stack real‑estate app (MERN) for creating, viewing, and managing property listings with image uploads and interactive maps.",
    bullets: [
      "Session‑based auth with RBAC for owners & visitors.",
      "Interactive Map APIs for dynamic property locations.",
      "Responsive UI + RESTful APIs for seamless cross‑device performance."
    ],
    links: [{ href: "https://project-fullstack-odpq.onrender.com", label: "Live Demo" }]
  },
  {
    title: "Stock Trading Platform (TradeTrack)",
    period: "Nov – Dec 2024",
    description:
      "Zerodha‑inspired simulated trading with dashboards, watchlists, and portfolio tracking; modular & secure architecture.",
    bullets: [
      "Real‑time market updates for a smooth trading UX.",
      "REST APIs for live data, order placement, and history.",
      "Scalable structure for maintainability & efficient data handling."
    ],
    links: [
      { href: "https://github.com/Kaushik9989/Stock-Trading-Platform", label: "GitHub" }
    ]
  }
];

const EDUCATION = [
  {
    school: "Gokaraju Rangaraju College of Engineering & Technology",
    degree: "B.Tech in Information Technology",
    period: "2022 – Present",
    meta: "GPA: 8"
  },
  {
    school: "Narayana College (TSBIE)",
    degree: "Class 12th",
    period: "2020 – 2022",
    meta: "GPA: 9.81"
  },
  {
    school: "Little Flower School (CBSE)",
    degree: "Class 10th",
    period: "2020",
    meta: "GPA: 8.5"
  }
];

const SKILLS = {
  languages: ["Java (Proficient)", "Python", "JavaScript", "SQL", "C"],
  technologies: [
    "Full‑Stack Web Development",
    "RESTful APIs",
    "MongoDB",
    "Express",
    "React",
    "Node.js",
    "AWS (Foundations)"
  ],
  tools: ["Git", "GitHub", "VS Code", "Postman", "MongoDB Compass", "Visual Studio", "Jupyter Notebook"],
  cs: ["DSA", "OOP", "Computer Networks", "DBMS", "Operating Systems"]
};

const CERTS = [
  "Automated Software Testing with Python – Udemy",
  "Full Stack Web Dev (MERN) – Apna College",
  "AWS Cloud Foundations – Amazon",
  "Cybersecurity – Cisco Networking Academy",
  "Linux Training – IIT Bombay (Spoken Tutorial)"
];

// ----------
// Small components & utilities
// ----------
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-semibold tracking-tight text-white/90"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">{title}</span>
        <span className="block h-px w-24 mt-2 bg-gradient-to-r from-white/60 to-transparent" />
      </motion.h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [xy, setXY] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setXY({ x: px, y: py });
      }}
      onMouseLeave={() => setXY({ x: 0, y: 0 })}
      style={{ rotateX: xy.y * -6, rotateY: xy.x * 6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      className={`[transform-style:preserve-3d] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <TiltCard className="will-change-transform">
      <motion.div
        initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className={`rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] ${className}`}
      >
        {children}
      </motion.div>
    </TiltCard>
  );
}

function Anchor({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center gap-1 underline decoration-white/20 hover:decoration-white/70 transition ${className}`}
    >
      {children}
      <ExternalLink size={16} className="opacity-70" />
    </a>
  );
}

function TagCloud({ items }: { items: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.03 }}
          className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm"
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

function CopyChip({ label, value, icon }: { label: string; value: string; icon: JSX.Element }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 active:scale-[0.98] transition"
      aria-label={`Copy ${label}`}
    >
      {icon}
      <span className="text-sm">{value}</span>
      {copied ? <Check size={16} className="opacity-80" /> : <Copy size={16} className="opacity-60 group-hover:opacity-90" />}
    </button>
  );
}

// ----------
// Main component
// ----------
export default function App() {
  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  // Hero parallax orb
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const orbY = useTransform(heroProg, [0, 1], [0, -120]);
  const orbScale = useTransform(heroProg, [0, 1], [1, 1.2]);

  // Scrollspy
  const sections = ["home", "experience", "projects", "skills", "education", "certs", "contact"];
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -40% 0px", threshold: 0.01 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Smooth anchor scroll
  useEffect(() => {
    const handler = (e: any) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute("href")!.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white selection:bg-white/20">
      {/* Top scroll progress */}
      <motion.div style={{ scaleX: width }} className="fixed left-0 top-0 h-[3px] w-full origin-left bg-white/70 z-[100]" />

      {/* Subtle animated particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <AnimatedGrid />
        <motion.div style={{ y: orbY, scale: orbScale }} className="absolute -top-40 left-1/2 -translate-x-1/2 w-[85vw] h-[85vw] rounded-full bg-white/[0.08] blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-zinc-950/40 border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-white/90 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/80 animate-pulse" />
            {CONTACT.name}
          </a>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            {sections.map((id) => (
              <a key={id} href={`#${id}`} className={`hover:opacity-90 transition ${active === id ? "text-white" : "text-white/70"}`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
              <Github size={18} />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${CONTACT.email}`} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
              <Mail size={18} />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" ref={heroRef} className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <GlassCard className="p-8 sm:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-3xl sm:text-5xl font-bold tracking-tight"
                >
                  Vivek Kaushik M
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.7 }}
                  className="text-white/80 text-base sm:text-lg max-w-2xl"
                >
                  I build fast, secure, and scalable web applications. Recently, I engineered an enterprise‑ready
                  parcel locker system at <span className="font-semibold">Droppoint Systems</span> — with OTP access,
                  QR flows, and deployment.
                </motion.p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="#experience" className="px-4 py-2 rounded-xl bg-white text-zinc-950 font-medium shadow hover:shadow-lg transition">
                    My Internships
                  </a>
                  <a href="#projects" className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15">
                    View Projects
                  </a>
                </div>
              </div>
              <div className="md:col-span-1 flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3">
                  <div className="rounded-2xl p-4 border border-white/10 bg-white/5 backdrop-blur">
                    <div className="text-sm uppercase tracking-wide text-white/60 mb-1">Contact</div>
                    <div className="flex flex-wrap gap-2">
                      <CopyChip label="email" value={CONTACT.email} icon={<Mail size={16}/>} />
                      <CopyChip label="phone" value={CONTACT.phone} icon={<Phone size={16}/>} />
                    </div>
                    <div className="flex items-center gap-2 text-white/90 mt-2"><MapPin size={16}/> {CONTACT.location}</div>
                  </div>
                  <a
                    href="#experience"
                    className="rounded-2xl p-4 border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur hover:from-white/20 hover:to-white/10 transition group"
                  >
                    <div className="text-sm uppercase tracking-wide text-white/60 mb-1 flex items-center gap-2">
                      <Briefcase size={16}/> Internship Spotlight
                    </div>
                    <div className="font-semibold">Droppoint Systems</div>
                    <div className="text-white/70">Built secure parcel locker platform →</div>
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="grid gap-6">
          {EXPERIENCE.map((exp, idx) => (
            <GlassCard key={idx} className={`p-6 sm:p-8 relative ${exp.highlight ? "ring-1 ring-white/40" : ""}`}>
              {exp.highlight && (
                <div className="absolute -top-3 -right-3 bg-white text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
                  INTERNSHIP
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <div className="text-lg sm:text-xl font-semibold">{exp.role} · {exp.company}</div>
                  <div className="text-white/70 text-sm">{exp.period}</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-white/85 list-disc pl-5">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {exp.links?.length ? (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="text-white/70">My Work:</span>
                  {exp.links.map((l, i) => (
                    <Anchor href={l.href} key={i}>{l.label}</Anchor>
                  ))}
                </div>
              ) : null}
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, idx) => (
            <GlassCard key={idx} className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <div className="text-white/70 text-sm">{p.period}</div>
                </div>
                <div className="shrink-0 w-10 h-10 rounded-xl border border-white/10 bg-white/10 grid place-items-center">
                  <LinkIcon size={18} />
                </div>
              </div>
              <p className="mt-3 text-white/85">{p.description}</p>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-white/85">
                {p.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                {p.links?.map((l, i) => (
                  <Anchor href={l.href} key={i}>{l.label}</Anchor>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h4 className="font-semibold flex items-center gap-2"><CodeDot/> Languages</h4>
            <TagCloud items={SKILLS.languages} />
          </GlassCard>
          <GlassCard className="p-6">
            <h4 className="font-semibold">Technologies</h4>
            <TagCloud items={SKILLS.technologies} />
          </GlassCard>
          <GlassCard className="p-6">
            <h4 className="font-semibold">Tools</h4>
            <TagCloud items={SKILLS.tools} />
          </GlassCard>
          <GlassCard className="p-6">
            <h4 className="font-semibold">CS Fundamentals</h4>
            <TagCloud items={SKILLS.cs} />
          </GlassCard>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education">
        <div className="grid md:grid-cols-3 gap-6">
          {EDUCATION.map((e, i) => (
            <GlassCard key={i} className="p-6">
              <div className="flex items-start gap-3">
                <div className="mt-1"><School size={18} /></div>
                <div>
                  <div className="font-semibold">{e.school}</div>
                  <div className="text-white/80 text-sm">{e.degree}</div>
                  <div className="text-white/60 text-sm">{e.period} · {e.meta}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section id="certs" title="Certifications">
        <div className="grid md:grid-cols-2 gap-6">
          {CERTS.map((c, i) => (
            <GlassCard key={i} className="p-5">
              <div className="flex items-center gap-3">
                <Award size={18} className="shrink-0" />
                <div className="text-white/90">{c}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get in Touch">
        <GlassCard className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xl font-semibold">Contact Information</div>
              <div className="text-white/80 mt-3 flex flex-col gap-3">
                <CopyChip label="email" value={CONTACT.email} icon={<Mail size={16}/>} />
                <CopyChip label="phone" value={CONTACT.phone} icon={<Phone size={16}/>} />
                <div className="flex items-center gap-2"><Github size={16}/> <a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a></div>
                <div className="flex items-center gap-2"><Linkedin size={16}/> <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
              </div>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur px-4 py-2 hover:bg-white/20 transition"
        aria-label="Back to top"
      >
        <ChevronUp size={18} /> Top
      </button>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60"/>
            <span>{CONTACT.name}</span>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:opacity-90">Home</a>
            <a href="#projects" className="hover:opacity-90">Projects</a>
            <a href="#contact" className="hover:opacity-90">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------
// Background anim grid
// ---------
function AnimatedGrid() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.06)_25%,rgba(255,255,255,0.06)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.06)_75%,rgba(255,255,255,0.06)_76%,transparent_77%),linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.06)_25%,rgba(255,255,255,0.06)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.06)_75%,rgba(255,255,255,0.06)_76%,transparent_77%)] bg-[size:44px_44px]" />
      <motion.div
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(600px_200px_at_20%_30%,rgba(255,255,255,0.06),transparent),radial-gradient(400px_180px_at_80%_70%,rgba(255,255,255,0.05),transparent)]"
      />
    </div>
  );
}

function CodeDot() {
  return (
    <span className="inline-block w-2 h-2 rounded-full bg-white/80 mr-1 align-middle" />
  );
}
