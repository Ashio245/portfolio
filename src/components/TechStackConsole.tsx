"use client";

import React, { useState } from "react";

interface StackGroup {
  id: string;
  name: string;
  description: string;
  tools: { name: string; detail: string }[];
  note: string;
  stamp: string;
}

export default function TechStackConsole() {
  const [activeTab, setActiveTab] = useState<string>("automate");

  const stackGroups: StackGroup[] = [
    {
      id: "build",
      name: "BUILD",
      description: "Writing modern, typed, high-performance product architectures.",
      tools: [
        { name: "TypeScript", detail: "Ensuring structural integrity across layout components." },
        { name: "React / Next.js", detail: "Developing high-fidelity user-facing products." },
        { name: "Python", detail: "Scripting scrapers, data parsers, and logic gates." },
        { name: "SQL", detail: "Structuring tables, triggers, and relational databases." },
        { name: "HTML / CSS", detail: "Styling responsive, premium editorial templates." },
      ],
      note: "App Router warning logs are real. TypeScript interfaces keep the API signatures in sync.",
      stamp: "RTU // BS IT",
    },
    {
      id: "automate",
      name: "AUTOMATE",
      description: "Connecting platforms and gluing fragmented APIs into operational workflows.",
      tools: [
        { name: "n8n", detail: "Orchestrating multi-step event triggers and logic nodes." },
        { name: "Google Apps Script", detail: "Turning spreadsheets into functional database backends." },
        { name: "Custom APIs", detail: "Connecting inventory updates to merchant invoicing hooks." },
        { name: "Bash Scripting", detail: "Automating server schedules and cron script actions." },
        { name: "Webhooks", detail: "Triggering instant Slack alerts on crucial checkout failures." },
      ],
      note: "Rule of three: If you repeat a checklist task three times, write a n8n workflow or script to handle it.",
      stamp: "SYS_OPS // APPROVED",
    },
    {
      id: "data",
      name: "DATA & PIPELINES",
      description: "Extracting, normalizing, and storing operational intelligence at scale.",
      tools: [
        { name: "Excel / Sheets", detail: "Building warehouse logs and stock reconciliation ledger formulas." },
        { name: "Supabase / PG", detail: "Managing transaction rows, relational structures, and locks." },
        { name: "Web Scraping", detail: "Writing Puppeteer scripts to extract ticket listings." },
        { name: "Redis Queue", detail: "Buffering high-volume pricing tasks to prevent API caps." },
        { name: "Data Pipelines", detail: "Cleaning nested JSON payloads into normalized SQL rows." },
      ],
      note: "Always check proxy rotations before scraping. Secondary market inventory updates dynamically.",
      stamp: "STELLAR // PRICING",
    },
    {
      id: "qa",
      name: "QA & DIAGNOSTICS",
      description: "Functional testing, bug isolation, and structuring execution documentation.",
      tools: [
        { name: "Postman", detail: "Verifying API call parameters, payloads, and response headers." },
        { name: "Chrome DevTools", detail: "Debugging console warnings, layout glitches, and network calls." },
        { name: "SOP Documentation", detail: "Drafting step-by-step procedures to standardize execution." },
        { name: "Bug Logging", detail: "Compiling precise developer reproduction files to squash glitches." },
        { name: "UI/UX Auditing", detail: "Isolating checkout bottlenecks and ticket registration gaps." },
      ],
      note: "The goal is 200 OK. Report bugs with exact request payloads and headers.",
      stamp: "TICKET_QA // VERIFIED",
    },
  ];

  const activeGroup = stackGroups.find((g) => g.id === activeTab) || stackGroups[0];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col min-h-[380px] shadow-sm font-sans">
      
      {/* File Folder Style Tabs */}
      <div className="flex border-b border-border bg-elevated/20 overflow-x-auto">
        {stackGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveTab(group.id)}
            className={`font-mono text-[9px] tracking-widest uppercase px-6 py-3.5 border-r border-border transition-all flex-shrink-0 outline-none relative cursor-pointer ${
              activeTab === group.id
                ? "bg-card text-teal-500 font-bold border-t-2 border-t-teal-500"
                : "text-muted hover:text-foreground hover:bg-elevated/40"
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>

      {/* Ruled Notebook Card Pane */}
      <div className="grid md:grid-cols-12 flex-grow p-6 gap-6 bg-card relative">
        
        {/* Left Column: Ruled Paper Tool details */}
        <div className="md:col-span-8 flex flex-col justify-between pr-2">
          <div>
            <h4 className="font-serif text-lg text-foreground mb-3 font-semibold">
              {activeGroup.name === "BUILD" && "Systems Construction"}
              {activeGroup.name === "AUTOMATE" && "Workflow Orchestration"}
              {activeGroup.name === "DATA & PIPELINES" && "Information Mining"}
              {activeGroup.name === "QA & DIAGNOSTICS" && "Quality & Diagnostics Console"}
            </h4>
            <p className="text-xs text-secondary font-sans mb-6 leading-relaxed">
              {activeGroup.description}
            </p>

            {/* Ruled Notebook Paper effect */}
            <div className="flex flex-col border-t border-border pt-4 gap-4">
              {activeGroup.tools.map((tool) => (
                <div 
                  key={tool.name} 
                  className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 group cursor-pointer pb-2 border-b border-border-muted"
                >
                  <span className="font-mono text-[11px] font-bold text-foreground min-w-[130px] flex items-center gap-1.5 group-hover:text-teal-500 transition-colors">
                    <span className="w-1 h-1 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {tool.name}
                  </span>
                  <span className="text-secondary text-[11px] font-sans leading-tight">
                    {tool.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 md:mt-0 pt-4 border-t border-border/50 text-[9px] font-mono text-muted">
            WORKSPACE_INVENTORY // STABLE_ENV
          </div>
        </div>

        {/* Right Column: Quirky Editorial stamp and notes */}
        <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/60 pt-6 md:pt-0 md:pl-6 select-none relative overflow-hidden">
          
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[9px] text-muted uppercase tracking-widest block font-bold">
              Desk Notebook Scribble:
            </span>
            
            {/* Ruled sticky notebook card note */}
            <div className="p-4 bg-[var(--note-bg)] border border-[var(--note-border)] rounded font-serif italic text-xs text-[var(--note-text)] leading-relaxed shadow-2xs rotate-[0.5deg]">
              &ldquo;{activeGroup.note}&rdquo;
            </div>
          </div>

          {/* Tactile Circular Workspace ink stamp */}
          <div className="mt-8 md:mt-0 flex justify-end items-end relative h-32">
            <div className="absolute right-2 bottom-2 w-28 h-28 border-4 border-[var(--stamp-border)] rounded-full flex flex-col items-center justify-center font-mono text-[8px] font-bold text-[var(--stamp-color)] border-double rotate-[-12deg] hover:rotate-[12deg] transition-transform duration-500 pointer-events-none select-none">
              <span className="border-b border-[var(--stamp-border)] pb-1 mb-1 tracking-widest">OFFICIAL</span>
              <span className="text-[7.5px] leading-tight text-center px-1 font-bold">{activeGroup.stamp}</span>
              <span className="mt-1 text-[6px]">PHILIPPINES</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
