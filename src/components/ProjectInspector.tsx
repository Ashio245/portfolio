"use client";

import React, { useEffect } from "react";

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  context: string;
  problem: string;
  system: string;
  impact: string;
  tools: string[];
  schematic: string;
  metrics: { label: string; value: string }[];
}

interface ProjectInspectorProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectInspector({ project, onClose }: ProjectInspectorProps) {
  // Prevent body scrolling when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Semi-transparent backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-2xl h-full bg-card border-l border-border shadow-2xl flex flex-col z-10 transition-transform duration-300 animate-slideLeft overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border px-6 py-4 flex justify-between items-center z-20">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono tracking-widest text-teal-500 uppercase font-semibold">
              {project.category} // CASE STUDY
            </span>
            <h3 className="text-xl font-bold text-foreground mt-1 font-serif">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded border border-border flex items-center justify-center bg-elevated hover:bg-background text-secondary hover:text-foreground transition font-mono text-[10px] tracking-wider uppercase"
            aria-label="Close panel"
          >
            ESC
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-grow flex flex-col gap-8 pb-20">
          
          {/* Top Metadata Box */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-elevated/50 border border-border rounded font-mono text-[10px]">
            <div>
              <span className="text-muted block uppercase">Project Period</span>
              <span className="text-foreground mt-1 block font-semibold">{project.period}</span>
            </div>
            <div>
              <span className="text-muted block uppercase">Operational Status</span>
              <span className="text-emerald-500 mt-1 block font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
              </span>
            </div>
            <div>
              <span className="text-muted block uppercase">Primary Tool</span>
              <span className="text-foreground mt-1 block font-semibold">{project.tools[0]}</span>
            </div>
            <div>
              <span className="text-muted block uppercase">Architecture Ref</span>
              <span className="text-foreground mt-1 block font-semibold">{project.id.startsWith("ops-") ? "" : "SYS-"}{project.id.toUpperCase()}</span>
            </div>
          </div>

          {/* Section: Metrics / Impact */}
          <div>
            <span className="text-[9px] font-mono tracking-widest text-muted block uppercase mb-3 font-semibold">
              Performance Improvement / Impact
            </span>
            <div className="grid grid-cols-3 gap-4">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-card border border-border p-4 rounded flex flex-col items-center justify-center text-center shadow-xs"
                >
                  <span className="text-xl md:text-2xl font-serif text-teal-500 font-bold">
                    {metric.value}
                  </span>
                  <span className="text-[9px] font-mono text-secondary uppercase mt-1">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Context & Problem */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[10px] font-mono tracking-widest text-muted uppercase mb-2 font-bold">
                01. Operational Context
              </h4>
              <p className="text-xs text-secondary leading-relaxed font-sans">
                {project.context}
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-mono tracking-widest text-muted uppercase mb-2 font-bold">
                02. Core Friction
              </h4>
              <p className="text-xs text-secondary leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>
          </div>

          {/* Section: System Architecture Schematic */}
          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-muted uppercase mb-3 font-bold">
              03. Standard Operating Procedure (SOP) Log
            </h4>
            <div className="bg-background border border-border p-4 rounded font-mono text-[9.5px] text-teal-500/90 leading-normal overflow-x-auto whitespace-pre select-all shadow-inner border-dashed">
              {project.schematic}
            </div>
          </div>

          {/* Section: System Design */}
          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-muted uppercase mb-2 font-bold">
              04. System Design & Orchestration
            </h4>
            <p className="text-xs text-secondary leading-relaxed font-sans">
              {project.system}
            </p>
          </div>

          {/* Section: Impact Details */}
          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-muted uppercase mb-2 font-bold">
              05. Operational Outcome
            </h4>
            <p className="text-xs text-secondary leading-relaxed font-sans">
              {project.impact}
            </p>
          </div>

          {/* Section: Tools Stack */}
          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-muted uppercase mb-3 font-bold">
              06. Integrated Stacks
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="bg-elevated border border-border text-foreground font-mono text-[10px] px-2.5 py-1 rounded shadow-xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
