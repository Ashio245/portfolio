"use client";

import React, { useState, useEffect } from "react";
import WorkspaceDesk from "@/components/WorkspaceDesk";
import SystemStatus from "@/components/SystemStatus";
import TechStackConsole from "@/components/TechStackConsole";
import ProjectInspector, { ProjectData } from "@/components/ProjectInspector";

interface ChiikawaPopup {
  id: number;
  x: number;
  character: string;
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [popups, setPopups] = useState<ChiikawaPopup[]>([]);

  // Sync state with HTML data-theme on mount
  useEffect(() => {
    const activeTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light";
    if (activeTheme) {
      setTheme(activeTheme);
    }
  }, []);

  // Listen to Chiikawa spawn events
  useEffect(() => {
    const handleSpawn = (e: Event) => {
      const customEvent = e as CustomEvent<{ character: string }>;
      if (customEvent.detail && customEvent.detail.character) {
        const newPopup = {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80, // horizontal start percent
          character: customEvent.detail.character
        };
        setPopups(prev => [...prev, newPopup]);
        setTimeout(() => {
          setPopups(prev => prev.filter(p => p.id !== newPopup.id));
        }, 4000);
      }
    };
    window.addEventListener("chiikawa-spawn", handleSpawn);
    return () => window.removeEventListener("chiikawa-spawn", handleSpawn);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const projects: ProjectData[] = [
    {
      id: "ops-inventory-v1",
      title: "E-commerce & Inventory Management Core",
      subtitle: "Scaling e-commerce operations, team coordination, and stock audits at Stashlify.",
      category: "Operations Management",
      period: "March 2026 - Present",
      metrics: [
        { label: "Audit Accuracy", value: "100%" },
        { label: "Stock Discrepancy", value: "0.00%" },
        { label: "SOP Compliance", value: "98%" }
      ],
      context: "At Stashlify, tracking warehouse inventory levels, validating physical stock audits, and syncing product availability counts across global sales channels was historically a manual bottleneck. Operations managers had to export logs, manually calculate SKU offsets, and compile inventory logs.",
      problem: "Manual inventory tracking delayed order fulfillment loops, created stock level discrepancies, and increased the risk of stockouts during high-demand product drops.",
      system: "I established the e-commerce inventory operational protocols. By designing structured SOP workflows, leading regular physical stock audits, organizing product inventory reconciliation Sheets, and coordinating with the engineering team to align database inventories with sales channels, I streamlined the warehouse operational loops.",
      schematic: `
[SOP-INVENTORY-V1]
1. Coordinate physical stock counts across warehouse teams.
2. Verify stock availability files against active e-commerce logs.
3. Track SKU movements and flag potential stockout levels.
4. Update master operations sheet logs for client channels.
5. Review team execution checklists and update process SOPs.
6. Dispatch status reports and inventory summaries to stakeholders.
      `,
      impact: "Achieved 100% audit accuracy and reduced inventory reconciliation delays, allowing the team to maintain high operational integrity, minimize stockouts, and coordinate warehouse processes at scale.",
      tools: ["Excel / Sheets", "SOP Documentation", "Team Coordination", "Process Auditing", "Operations Management"],
    },
    {
      id: "qa-testing",
      title: "Ticketnation QA & Event Dispatch",
      subtitle: "Diagnosing API endpoints and managing entry systems.",
      category: "QA & Product Support",
      period: "July 2025 - Present",
      metrics: [
        { label: "Bug Tickets Logged", value: "45+" },
        { label: "Scanner SLA Uptime", value: "99.9%" },
        { label: "Entry Lag Cut", value: "40%" }
      ],
      context: "Ticketnation Philippines handles entry validation, ticket purchases, and live checking platforms for major regional venues. In the fast-paced ticketing space, UI glitches or API transaction delays can lock out thousands of entry scans.",
      problem: "Intermittent purchase failures and UI/UX friction in registration forms led to checkout errors, causing customer drop-offs and entry queue bottlenecks.",
      system: "I lead functional QA testing and on-site ticketing coordination. I audit network calls in Chrome DevTools, validate REST endpoints using Postman request collections, log structured bug reports with detailed reproduction files for the developers, and coordinate scanner setup operations at live event sites. I also act as the link between the product managers, venue hosts, and engineering teams.",
      schematic: `
[SOP-QA-DIAGNOSTICS]
1. Capture ticketing purchase failures from client user logs.
2. Open Chrome DevTools Network Tab and inspect request payloads.
3. Isolate API endpoints and run signature replays in Postman.
4. Verify response header parameters against expected schemas.
5. Log structured reproduction steps and JSON outputs to Jira.
6. Coordinate with engineering to deploy hotfix adjustments.
      `,
      impact: "Logged more than 45 critical functional and UI/UX bug tickets, ensuring the platform's stability. Successfully coordinated entrance check-in infrastructure for live events, processing ticket scans with high scanner uptime.",
      tools: ["Postman", "Chrome DevTools", "SOP Documentation", "Bug Tracking", "UI/UX Auditing", "React"],
    },
    {
      id: "pricing-analyst",
      title: "Dynamic Ticket Pricing & Inventory Engine",
      subtitle: "Mapping seating maps and demand factors at Stellar Seats.",
      category: "Pricing & PM Systems",
      period: "October 2025 - Present",
      metrics: [
        { label: "Price Models Set", value: "20,000+" },
        { label: "Market Sync Lag", value: "< 2 Mins" },
        { label: "Inventory Errors", value: "0" }
      ],
      context: "Dynamic pricing is critical for primary and secondary concert ticketing. Prices must adapt to venue capacities, dynamic market demand, regional historical data, and live inventory fluctuations.",
      problem: "Venues often changed block layouts without syncing live databases, leading to pricing discrepancies, incorrect availability data, and missed revenue optimization windows.",
      system: "I act as Project Manager and Ticket Pricing Analyst. I engineered an inventory tracker synced with market databases. By monitoring ticket availability layers and analyzing pricing trends, the system triggers alerts when competitor blocks sell out. I also coordinate block allocations and audit seat layout data, maintaining exact alignment between active platforms.",
      schematic: `
[SOP-YIELD-PRICING]
1. Fetch seat availability vectors from venue mapping tables.
2. Calculate market demand coefficients based on velocity.
3. Adjust price tiers using competitor block saturation scales.
4. Execute seat block allocations and database lock calls.
5. Auto-sync Google Sheets logs to synchronize layout blocks.
6. Report yield performance metrics to pricing director.
      `,
      impact: "Managed allocation matrices and set dynamic pricing profiles for 20k+ ticket listings across multiple venues with zero seating layout mismatch. This maximized ticket sales yields while ensuring frictionless purchases.",
      tools: ["Excel / Sheets", "PostgreSQL", "Data Analytics", "Market Scrapers", "APIs"],
    },
    {
      id: "experia-ops",
      title: "Event Platform Support & Operations",
      subtitle: "Managing organizer accounts and logistics data pipelines at Experia.",
      category: "Platform Support & Operations",
      period: "January 2026 - Present",
      metrics: [
        { label: "Accounts Tracked", value: "80+" },
        { label: "Task Logs Synced", value: "200+" },
        { label: "SOP Sheet Audits", value: "100%" }
      ],
      context: "Experia is an event organizer platform supporting multiple live client accounts, event schedules, and logistics databases. In high-volume event contexts, tracking account setups and platform tasks across various organizer accounts is critical.",
      problem: "Fragmented coordinator task logs and manual account updates led to platform scheduling delays and increased the risk of operational oversights during live event launches.",
      system: "I coordinate platform support operations and manage internal task logs. By structuring centralized planner task logs, auditing client account checklist completion, and setting standardized organizer support templates, I bridge platform capabilities with live organizer logistics.",
      schematic: `
[SOP-EXPERIA-SUPPORT]
1. Audit active organizer account checklist completions.
2. Cross-reference platform task logs with active event schedules.
3. Validate logistics database rows for upcoming event runs.
4. Set daily coordinator checklist and task log updates.
5. Review platform setup sheets to ensure organizer SOP compliance.
6. Dispatch status reports and log summaries to leadership.
      `,
      impact: "Coordinated support operations and platform database logs for 80+ organizer accounts. Maintained 100% SOP compliance across coordinator checklists, speeding up resolution timelines and platform readiness.",
      tools: ["Database Management", "SOP Documentation", "Excel / Sheets", "Account Management", "Team Coordination"],
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-bg radial-mask opacity-[0.25] pointer-events-none z-0" />

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-widest text-foreground uppercase">
              EMER <span className="text-muted">//</span> OPERATIONAL ARCHITECTURE
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-7 font-mono text-[10px] tracking-wider uppercase text-secondary">
            <a href="#about" className="hover:text-foreground transition">About</a>
            <a href="#work" className="hover:text-foreground transition">Case Studies</a>
            <a href="#capabilities" className="hover:text-foreground transition">Capabilities</a>
            <a href="#leadership" className="hover:text-foreground transition">Leadership</a>
            <a href="#experience" className="hover:text-foreground transition">Experience</a>
            <a href="#education" className="hover:text-foreground transition">Education</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Technical Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="font-mono text-[9px] tracking-wider uppercase px-2.5 py-1.5 rounded border border-border bg-elevated hover:bg-background hover:text-foreground text-secondary transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Toggle system theme"
            >
              <span>THEME</span>
              <span className="text-teal-500 font-bold">{theme === "dark" ? "DARK" : "LIGHT"}</span>
            </button>

            <a 
              href="#terminal" 
              className="btn-technical px-4.5 py-1.5 rounded text-secondary"
            >
              Terminal
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 w-full py-12 md:py-20 relative z-10 flex flex-col gap-28 md:gap-40">
        
        {/* HERO SECTION */}
        <section className="grid md:grid-cols-12 gap-8 md:gap-12 items-start pt-4">
          <div className="md:col-span-8 flex flex-col gap-6 md:gap-8">
            <div>
              <span className="font-mono text-[10px] tracking-widest text-teal-500 uppercase block mb-3 font-semibold">
                MUNTINLUPA CITY, PHILIPPINES // BS IT STUDENT
              </span>
              <h1 className="font-display text-display-xl text-foreground font-normal">
                I build structure<br />behind execution.
              </h1>
            </div>
            
            <p className="text-secondary font-sans text-sm md:text-base max-w-xl leading-relaxed">
              I am John Emerson Delos Reyes (Emer), a technical operations leader, QA intern, and startup co-founder. 
              I design layout architectures, verify API endpoints, dynamic-price ticketing categories, and coordinate event-day validator systems 
              that turn manual friction into stable operational pipelines.
            </p>

            <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-wider uppercase mt-2">
              <a href="#work" className="btn-technical px-5 py-2.5 rounded text-foreground font-semibold">
                Deconstruct Work
              </a>
              <a href="#about" className="px-5 py-2.5 rounded text-secondary hover:text-foreground transition flex items-center gap-1.5 border border-transparent hover:border-border bg-elevated/35 shadow-xs">
                About &amp; Positioning <span>&rarr;</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-4 w-full">
            <SystemStatus />
          </div>
        </section>

        {/* ABOUT / POSITIONING SECTION */}
        <section id="about" className="grid md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-border/40 pt-16">
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] tracking-widest text-teal-500 uppercase block mb-2 font-semibold">
              IDENTITY OVERVIEW
            </span>
            <h2 className="font-display text-display-lg text-foreground">
              Operator-<br />Builder.
            </h2>
          </div>
          
          <div className="md:col-span-8 flex flex-col gap-6 font-sans text-secondary text-xs md:text-sm leading-relaxed">
            <p>
              I bridge the gap between technical logic and business execution. While many developers focus 
              only on writing code and managers focus only on delegating tasks, I specialize in **organizing the machine**. 
              I see manual spreadsheets, unsynced API keys, and fragmented event operations—then construct 
              the standard procedures, verification protocols, and automated scripts to stabilize them.
            </p>
            <p>
              Currently combining real-world startup ownership, operations management, and QA internships with my academic track, 
              studying **Bachelor of Science in Information Technology** at **Rizal Technological University**. 
              I bring a disciplined technical foundation to help operations run, scale, and recover under pressure.
            </p>
          </div>
        </section>

        {/* INTERACTIVE WORKSPACE DESK (Tactile replacement for flowchart canvas) */}
        <section id="terminal" className="flex flex-col gap-3">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-mono text-[9px] text-muted uppercase tracking-widest">
              OPERATIONAL_DESKTOP // ACTIVE_ARCHIVE
            </span>
            <span className="text-[9px] text-muted font-mono hidden md:inline">
              CLI_CONNECTION: STANDARD
            </span>
          </div>
          <WorkspaceDesk />
        </section>

        {/* SELECTED WORK (CASE STUDIES) */}
        <section id="work" className="flex flex-col gap-10">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-teal-500 uppercase block mb-2 font-semibold">
              OPERATIONAL ARTIFACTS
            </span>
            <h2 className="font-display text-display-lg text-foreground">
              Selected Work
            </h2>
            <p className="text-secondary text-xs md:text-sm font-sans max-w-lg mt-2">
              Deep-dives into systems designed to eliminate manual bottlenecks, log ticketing bugs, 
              track concert seat matrices, and win software hackathons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="case-card rounded-lg p-6 flex flex-col justify-between min-h-[220px] cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-mono text-[9px] tracking-widest text-muted uppercase font-bold">
                      {project.category}
                    </span>
                    <span className="font-mono text-[9px] text-muted">{project.period}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-serif mb-2">
                    {project.title}
                  </h3>
                  <p className="text-secondary text-xs font-sans leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-border pt-4 mt-6">
                  <div className="flex gap-4">
                    {project.metrics.slice(0, 2).map((metric, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-[14px] font-serif text-teal-500 font-semibold leading-none">
                          {metric.value}
                        </span>
                        <span className="text-[8px] font-mono text-muted uppercase mt-0.5 tracking-tight">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="case-arrow font-mono text-[10px] text-secondary transition-transform duration-200">
                    DECONSTRUCT &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAPABILITIES SECTION */}
        <section id="capabilities" className="flex flex-col gap-10">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-teal-500 uppercase block mb-2 font-semibold">
              FUNCTIONAL PILLARS
            </span>
            <h2 className="font-display text-display-lg text-foreground">
              Capabilities
            </h2>
            <p className="text-secondary text-xs md:text-sm font-sans max-w-lg mt-2">
              Combining software quality testing, process design, and pricing strategies 
              to coordinate operations with precision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 font-sans">
            <div className="border border-border bg-card p-6 rounded-lg flex flex-col gap-3 shadow-xs">
              <span className="font-mono text-[10px] text-teal-500 font-bold">01. OPERATIONS ARCHITECTURE</span>
              <h3 className="text-sm font-bold text-foreground">Workflow &amp; Process Design</h3>
              <p className="text-secondary text-xs leading-relaxed">
                Building organizational pipelines, process sheets, and system triggers that connect business goals 
                with robust execution checklists.
              </p>
            </div>
            
            <div className="border border-border bg-card p-6 rounded-lg flex flex-col gap-3 shadow-xs">
              <span className="font-mono text-[10px] text-teal-500 font-bold">02. QUALITY ASSURANCE</span>
              <h3 className="text-sm font-bold text-foreground">Functional &amp; UI Audits</h3>
              <p className="text-secondary text-xs leading-relaxed">
                Testing front-end UI layouts, inspecting API queries (Postman/DevTools), and writing structured 
                reproduction steps to isolate checkout and scanner bugs.
              </p>
            </div>

            <div className="border border-border bg-card p-6 rounded-lg flex flex-col gap-3 shadow-xs">
              <span className="font-mono text-[10px] text-teal-500 font-bold">03. TICKET PRICING ANALYTICS</span>
              <h3 className="text-sm font-bold text-foreground">Dynamic Yield Management</h3>
              <p className="text-secondary text-xs leading-relaxed">
                Auditing seating matrices, analyzing demand conditions, and executing ticket pricing strategies 
                based on venue locations and competitor actions.
              </p>
            </div>

            <div className="border border-border bg-card p-6 rounded-lg flex flex-col gap-3 shadow-xs">
              <span className="font-mono text-[10px] text-teal-500 font-bold">04. PROJECT COORDINATION</span>
              <h3 className="text-sm font-bold text-foreground">Event &amp; Developer Sync</h3>
              <p className="text-secondary text-xs leading-relaxed">
                Orchestrating live ticket validator terminals, social media queues, and dev coordinate task sheets 
                to align multi-tiered teams during live deployments.
              </p>
            </div>

            <div className="border border-border bg-card p-6 rounded-lg flex flex-col gap-3 shadow-xs">
              <span className="font-mono text-[10px] text-teal-500 font-bold">05. WORKFLOW AUTOMATION</span>
              <h3 className="text-sm font-bold text-foreground">Eliminating Manual Loops</h3>
              <p className="text-secondary text-xs leading-relaxed">
                Writing direct webhook integrations, building n8n pipelines, and scripting spreadsheets to automate 
                data migration, transaction logging, and Slack alerts.
              </p>
            </div>

            <div className="border border-border bg-card p-6 rounded-lg flex flex-col gap-3 shadow-xs">
              <span className="font-mono text-[10px] text-teal-500 font-bold">06. TECHNICAL PROTOTYPING</span>
              <h3 className="text-sm font-bold text-foreground">Full-Stack Iteration</h3>
              <p className="text-secondary text-xs leading-relaxed">
                Fluent in TypeScript, Python, Next.js, and Supabase. I can write the logic to construct functional mockups 
                and backend triggers rapidly under constraints.
              </p>
            </div>
          </div>
        </section>

        {/* OPERATING PHILOSOPHY */}
        <section id="philosophy" className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-5">
            <span className="font-mono text-[10px] tracking-widest text-teal-500 uppercase block mb-2 font-semibold">
              RULES OF EXECUTION
            </span>
            <h2 className="font-display text-display-lg text-foreground">
              Operating Philosophy
            </h2>
            <p className="text-muted text-xs md:text-sm font-sans max-w-sm mt-3 leading-relaxed">
              Guidelines for coordinates. Systems should prioritize high reliability and reduce human-error layers.
            </p>
          </div>

          <div className="md:col-span-7 flex flex-col gap-10">
            <div className="flex gap-6 items-start">
              <span className="font-display text-3xl font-light text-muted font-serif leading-none mt-1">01</span>
              <div>
                <h3 className="font-serif text-base text-foreground mb-1 font-bold">Clarity beats noise</h3>
                <p className="text-secondary text-xs leading-relaxed">
                  If an operations pipeline requires a 30-page manual to understand, the system is broken. 
                  Workflows should be linear, self-documenting, and easy to verify under load.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start border-t border-border pt-6">
              <span className="font-display text-3xl font-light text-muted font-serif leading-none mt-1">02</span>
              <div>
                <h3 className="font-serif text-base text-foreground mb-1 font-bold">Invisible operations</h3>
                <p className="text-secondary text-xs leading-relaxed">
                  The best operations feel like air. When everything runs smoothly—scanner nodes are synced 
                  and invoicing runs automatically—the infrastructure goes unnoticed.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start border-t border-border pt-6">
              <span className="font-display text-3xl font-light text-muted font-serif leading-none mt-1">03</span>
              <div>
                <h3 className="font-serif text-base text-foreground mb-1 font-bold">Automate the repetitive, design the unique</h3>
                <p className="text-secondary text-xs leading-relaxed">
                  Every task performed manually more than three times is a system waiting to be built. 
                  Automation isolates repetitive work, allowing humans to focus on live anomalies.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start border-t border-border pt-6">
              <span className="font-display text-3xl font-light text-muted font-serif leading-none mt-1">04</span>
              <div>
                <h3 className="font-serif text-base text-foreground mb-1 font-bold">Boring tools, high reliability</h3>
                <p className="text-secondary text-xs leading-relaxed">
                  Use established, predictable tools that do not crash at 3 AM. A resilient n8n pipeline, 
                  indexed SQL tables, or scheduled Apps Scripts are worth more than complex, unmonitored microservices.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start border-t border-border pt-6">
              <span className="font-display text-3xl font-light text-muted font-serif leading-none mt-1">05</span>
              <div>
                <h3 className="font-serif text-base text-foreground mb-1 font-bold">Obsessive documentation</h3>
                <p className="text-secondary text-xs leading-relaxed">
                  I coordinate, organize, and write clear procedural runbooks. Organization is not 
                  an operational chore; it is the prerequisite for speed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP & COMMUNITY */}
        <section id="leadership" className="grid md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-border/40 pt-16">
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] tracking-widest text-teal-500 uppercase block mb-2 font-semibold">
              COMMUNITY DIRECTIVES
            </span>
            <h2 className="font-display text-display-lg text-foreground">
              Leadership &amp;<br />Community.
            </h2>
            <p className="text-muted text-xs md:text-sm font-sans max-w-sm mt-3 leading-relaxed">
              Taking responsibility, leading teams, and managing documentation within academic and developer student organizations.
            </p>
          </div>

          <div className="md:col-span-8 grid md:grid-cols-2 gap-6 font-sans">
            <div className="border border-border bg-card p-5 rounded-lg flex flex-col gap-2.5 shadow-xs">
              <span className="font-mono text-[8.5px] text-teal-500 font-bold uppercase">RTU Commission on Student Elections</span>
              <h3 className="text-xs font-bold text-foreground">Commissioner (2025 - Present)</h3>
              <p className="text-secondary text-[11px] leading-relaxed">
                Coordinating digital voting protocols, reviewing candidate requirements, and enforcing constitution policies 
                to ensure fair student body elections.
              </p>
            </div>

            <div className="border border-border bg-card p-5 rounded-lg flex flex-col gap-2.5 shadow-xs">
              <span className="font-mono text-[8.5px] text-teal-500 font-bold uppercase">RTU ICS Student Council</span>
              <h3 className="text-xs font-bold text-foreground">Technical &amp; Media Head (2025)</h3>
              <p className="text-secondary text-[11px] leading-relaxed">
                Managing media broadcasts, coordinating graphic workflows, and directing digital assets and technical 
                setups for computer studies department projects.
              </p>
            </div>

            <div className="border border-border bg-card p-5 rounded-lg flex flex-col gap-2.5 shadow-xs">
              <span className="font-mono text-[8.5px] text-teal-500 font-bold uppercase">RTU Constitutional Commission</span>
              <h3 className="text-xs font-bold text-foreground">SSC Archive &amp; Docu Officer (2025)</h3>
              <p className="text-secondary text-[11px] leading-relaxed">
                Auditing official council papers, organizing structural digital records, and compiling constitutional 
                history logs for the supreme student council.
              </p>
            </div>

            <div className="border border-border bg-card p-5 rounded-lg flex flex-col gap-2.5 shadow-xs">
              <span className="font-mono text-[8.5px] text-teal-500 font-bold uppercase">Filipino Web Dev Peers</span>
              <h3 className="text-xs font-bold text-foreground">Events Sub-Lead (2024)</h3>
              <p className="text-secondary text-[11px] leading-relaxed">
                Coordinating schedule lines, platform hosting setups, and invite logistics for web developer communities 
                conducting code webinars.
              </p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] tracking-widest text-teal-500 uppercase block mb-2 font-semibold">
              CHRONOLOGICAL LOG
            </span>
            <h2 className="font-display text-display-lg text-foreground">
              Experience
            </h2>
            <p className="text-muted text-xs md:text-sm font-sans max-w-sm mt-3 leading-relaxed">
              Hands-on leadership roles in operations management, quality testing, and coordination.
            </p>
          </div>

          <div className="md:col-span-8 flex flex-col gap-0 font-sans">
            
            <div className="timeline-item pb-10">
              <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">
                  Stealth / Coming Soon
                </h3>
                <span className="font-mono text-[9px] text-muted">May 2026 – Present</span>
              </div>
              <span className="font-mono text-[10px] text-teal-500 block mb-3 uppercase font-semibold">Co-Founder</span>
            </div>

            <div className="timeline-item pb-10">
              <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">
                  Head of Operations
                </h3>
                <span className="font-mono text-[9px] text-muted">March 2026 - Present</span>
              </div>
              <span className="font-mono text-[10px] text-teal-500 block mb-3 uppercase font-semibold">Stashlify // Global E-commerce Operations</span>
              <p className="text-secondary text-xs leading-relaxed mb-3">
                Scaling live operational capacities for the global e-commerce inventory platform. Managing inventory audits, 
                drafting operational SOP sheets, and coordinating database logs to connect warehouse and sales systems.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">inventory audits</span>
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">SOP drafting</span>
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">database logs</span>
              </div>
            </div>

            <div className="timeline-item pb-10">
              <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">
                  Executive Assistant
                </h3>
                <span className="font-mono text-[9px] text-muted">January 2026 - Present</span>
              </div>
              <span className="font-mono text-[10px] text-teal-500 block mb-3 uppercase font-semibold">Experia // Event Organizer Platform Support</span>
              <p className="text-secondary text-xs leading-relaxed mb-3">
                Providing high-level support to leadership, coordinate operations databases, tracking organizer accounts, 
                and designing task logs.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">task logging</span>
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">account management</span>
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">SOP review</span>
              </div>
            </div>

            <div className="timeline-item pb-10">
              <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">
                  Project Manager | Ticket Pricing Analyst
                </h3>
                <span className="font-mono text-[9px] text-muted">October 2025 - Present</span>
              </div>
              <span className="font-mono text-[10px] text-teal-500 block mb-3 uppercase font-semibold">Stellar Seats // Dynamic Ticket Yields</span>
              <p className="text-secondary text-xs leading-relaxed mb-3">
                Evaluating ticket pricing arrays based on market speed, tracking secondary market inventories, 
                coordinating blocks allocations, and auditing stadium layouts.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">price dynamicing</span>
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">inventory checks</span>
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">seating mapping</span>
              </div>
            </div>

            <div className="timeline-item pb-4">
              <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">
                  Quality Assurance Intern | Events Coordinator
                </h3>
                <span className="font-mono text-[9px] text-muted">July 2025 - Present</span>
              </div>
              <span className="font-mono text-[10px] text-teal-500 block mb-3 uppercase font-semibold">Ticketnation Philippines // Ticketing &amp; Event Operations</span>
              <p className="text-secondary text-xs leading-relaxed mb-3">
                Auditing user checkout flows, testing API responses via Postman, documenting bug tickets inside Chrome DevTools, 
                and coordinating on-site gate scanner setups.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">API Postman test</span>
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">UI bug report</span>
                <span className="bg-elevated border border-border text-secondary font-mono text-[8.5px] px-2 py-0.5 rounded shadow-2xs">scanner setups</span>
              </div>
            </div>

          </div>
        </section>

        {/* EDUCATION & GROWTH SECTION */}
        <section id="education" className="grid md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-border/40 pt-16">
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] tracking-widest text-teal-500 uppercase block mb-2 font-semibold">
              ACADEMIC FILE
            </span>
            <h2 className="font-display text-display-lg text-foreground">
              Education &amp;<br />Credentials.
            </h2>
            <p className="text-muted text-xs md:text-sm font-sans max-w-sm mt-3 leading-relaxed">
              Consistently achieving high academic results while applying technical concepts directly to production-grade roles.
            </p>
          </div>

          <div className="md:col-span-8 flex flex-col gap-8 font-sans">
            <div className="border border-border bg-card p-6 rounded-lg flex flex-col gap-3 shadow-xs">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h3 className="text-sm font-bold text-foreground">BS in Information Technology</h3>
                <span className="font-mono text-[10px] text-muted">2023 - Present</span>
              </div>
              <span className="font-mono text-[10.5px] text-teal-500 block uppercase font-semibold">Rizal Technological University</span>
              <p className="text-secondary text-xs leading-relaxed">
                Currently pursuing full-time IT curriculum. Maintaining an outstanding academic profile as a 
                **Consecutive Academic Achiever since 2023** (Dean's List equivalents). Applying coursework in database systems, 
                logic design, and web architecture to actual operational software problems.
              </p>
            </div>
          </div>
        </section>

        {/* TECHNICAL STACK CONSOLE */}
        <section id="stack" className="flex flex-col gap-6">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-teal-500 uppercase block mb-2 font-semibold">
              ENVIRONMENT CONFIGURATION
            </span>
            <h2 className="font-display text-display-lg text-foreground">
              Stack &amp; Pipelines
            </h2>
            <p className="text-secondary text-xs md:text-sm font-sans max-w-md mt-2">
              Curated toolsets grouped by operational context. Select a category to inspect the 
              functional pipeline.
            </p>
          </div>
          <TechStackConsole />
        </section>

        {/* CONTACT / TERMINAL FOOTER */}
        <footer id="contact" className="border-t border-border pt-16 md:pt-24 pb-8">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 flex flex-col gap-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-teal-500 uppercase block mb-2 font-semibold">
                  STABLE_COMMUNICATION_LINK
                </span>
                <h2 className="font-display text-display-lg text-foreground font-normal">
                  Let's architect the<br />next system.
                </h2>
              </div>
              <p className="text-secondary text-xs md:text-sm font-sans leading-relaxed max-w-md">
                I am based in Muntinlupa City, Philippines and collaborate with global product companies, 
                e-commerce startups, and ticketing technologies. Contact me to discuss technical operations coordination, 
                QA testing, ticket pricing modeling, or leadership roles.
              </p>
              
              <div className="font-mono text-[10px] text-muted mt-4 font-medium">
                LOC: Muntinlupa City, PH (GMT+8) // STATUS: Available for select strategic engagements
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-4 font-mono text-xs">
              <div className="bg-card border border-border rounded p-4 flex flex-col gap-3.5 shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-[10px] uppercase text-muted tracking-wider font-semibold">Direct Directives</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                </div>
                
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-muted">Email:</span>
                  <a href="mailto:delosreyesjohnemerson@gmail.com" className="text-foreground hover:text-teal-500 transition select-all font-bold">
                    delosreyesjohnemerson@gmail.com
                  </a>
                </div>

                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-muted">LinkedIn:</span>
                  <a href="https://www.linkedin.com/in/john-emerson-delos-reyes-0a7458297/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-teal-500 transition font-bold">
                    linkedin.com/in/john-emerson-delos-reyes-0a7458297
                  </a>
                </div>

                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-muted">GitHub:</span>
                  <a href="https://github.com/Ashio245" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-teal-500 transition font-bold font-mono">
                    github.com/Ashio245
                  </a>
                </div>
              </div>
              
              <div className="text-center text-[9px] text-muted mt-2 font-mono">
                &copy; {new Date().getFullYear()} EMER. ALL RIGHTS RESERVED // INFRASTRUCTURE SECURE
              </div>
            </div>
          </div>
        </footer>

      </main>

      {/* CASE STUDY PROGRESSIVE DISCLOSURE DRAWER */}
      <ProjectInspector
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Chiikawa Popups Container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {popups.map(p => {
          let imgPath = "/images/chiikawa.png?v=3";
          let phrase = "Fueee...";
          let charName = "Chiikawa";
          let styles = "bg-[#ffdcdb] border-red-300 text-red-800 dark:bg-red-950/70 dark:border-red-500/40 dark:text-red-300";
          
          if (p.character === "hachiware") {
            imgPath = "/images/hachiware.png?v=3";
            phrase = "Nantokanare!";
            charName = "Hachiware";
            styles = "bg-[#dbeafe] border-blue-300 text-blue-800 dark:bg-blue-950/70 dark:border-blue-500/40 dark:text-blue-300";
          } else if (p.character === "usagi") {
            imgPath = "/images/usagi.png?v=3";
            phrase = "YAHA! URA!!!";
            charName = "Usagi";
            styles = "bg-[#fef9c3] border-yellow-300 text-yellow-800 dark:bg-yellow-950/70 dark:border-yellow-500/40 dark:text-yellow-300";
          }
          
          return (
            <div
              key={p.id}
              style={{
                left: `${p.x}%`,
                bottom: "-100px",
                "--random-rotation": `${(Math.random() - 0.5) * 30}deg`
              } as React.CSSProperties}
              className={`fixed chiikawa-float border px-4 py-3 rounded-xl shadow-lg flex items-center gap-3.5 font-sans select-none backdrop-blur-xs ${styles}`}
            >
              <img src={imgPath} className="w-10 h-10 object-contain rounded-md border border-white/20 bg-white" alt={charName} />
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-wide uppercase opacity-75">{charName}</span>
                <span className="text-xs font-bold leading-tight">{phrase}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
