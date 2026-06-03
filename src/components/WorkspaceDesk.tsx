"use client";

import React, { useState, useRef, useEffect } from "react";

interface TerminalLine {
  text: string;
  type: "input" | "system" | "success" | "warning";
}

export default function WorkspaceDesk() {
  // Sticky note states
  const [todoList, setTodoList] = useState([
    { id: 1, text: "Verify Stashlify inventory reconciliation rules", done: true },
    { id: 2, text: "Check Ticketnation entrance scanner API logs", done: false },
    { id: 3, text: "Audit Experia platform task log completions", done: true },
    { id: 4, text: "RTU BS IT database midterms review", done: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodoList(prev =>
      prev.map(item => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  // 3D Rotating Event Badge Mouse Move Physics
  const badgeRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [badgeClicks, setBadgeClicks] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const badge = badgeRef.current;
    if (!badge) return;

    const rect = badge.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse x within card
    const y = e.clientY - rect.top;  // mouse y within card
    
    // Convert to percentage offsets from center (-10 to 10 degrees)
    const tiltX = -((y - rect.height / 2) / (rect.height / 2)) * 12;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // CLI Terminal states
  const [inputVal, setInputVal] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: "EMER_OS v2.0 // Active terminal prompt initialized.", type: "system" },
    { text: "Type 'help' to see active command protocols.", type: "system" },
  ]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleRemote = (e: Event) => {
      const customEvent = e as CustomEvent<{ output: TerminalLine[] }>;
      if (customEvent.detail && customEvent.detail.output) {
        setTerminalHistory(prev => [...prev, ...customEvent.detail.output]);
      }
    };
    window.addEventListener("terminal-remote", handleRemote);
    return () => {
      window.removeEventListener("terminal-remote", handleRemote);
    };
  }, []);

  useEffect(() => {
    const container = terminalContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [terminalHistory]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const newHistory = [...terminalHistory, { text: `> ${cmd}`, type: "input" as const }];

    if (cleanCmd === "help") {
      newHistory.push(
        { text: "Available Protocols:", type: "system" },
        { text: "  status   - View current operational statuses", type: "system" },
        { text: "  rtu      - Inspect BS Information Technology logs", type: "system" },
        { text: "  secret   - Inspect co-founder stealth coordinates", type: "system" },
        { text: "  clear    - Flush terminal console lines", type: "system" }
      );
    } else if (cleanCmd === "status") {
      newHistory.push(
        { text: "STATUS CHECK // EMER_OPERATIONS", type: "success" },
        { text: "  - Stashlify: Head of Ops active [Inventory: Syncing]", type: "system" },
        { text: "  - Stellar Seats: pm / Pricing Analyst sync OK", type: "system" },
        { text: "  - Ticketnation: QA Intern logs synced [Uptime: 99.9%]", type: "system" }
      );
    } else if (cleanCmd === "rtu") {
      newHistory.push(
        { text: "ACADEMIC DATABASE // RIZAL TECHNOLOGICAL UNIVERSITY", type: "success" },
        { text: "  - Course: Bachelor of Science in Information Technology", type: "system" },
        { text: "  - Period: 2023 - Present (Active Enrolled)", type: "system" },
        { text: "  - Achievement: Consecutive Academic Achiever since 2023", type: "system" }
      );
    } else if (cleanCmd === "secret") {
      newHistory.push(
        { text: "WARNING: SECURITY MODULE DETECTED", type: "warning" },
        { text: "  - Co-Founder stealth state is set to COMING SOON.", type: "system" },
        { text: "  - Initialization date set to May 2026.", type: "system" },
        { text: "  - Location: Muntinlupa City, Philippines.", type: "system" }
      );
    } else if (cleanCmd === "clear") {
      setTerminalHistory([]);
      setInputVal("");
      return;
    } else if (cleanCmd === "") {
      // do nothing
    } else {
      newHistory.push({
        text: `Command not recognized: '${cmd}'. Type 'help' for options.`,
        type: "warning"
      });
    }

    setTerminalHistory(newHistory);
    setInputVal("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  return (
    <div className="grid md:grid-cols-12 gap-6 w-full font-sans select-none">
      
      {/* LEFT COLUMN: 3D Event Badge & Sticky Note Checklist */}
      <div className="md:col-span-5 flex flex-col gap-6 justify-between items-stretch">
        
        {/* Interactive Event Badge (3D mouse tilt) */}
        <div 
          ref={badgeRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setBadgeClicks(prev => prev + 1)}
          style={{
            transform: isHovered 
              ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` 
              : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
            transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative w-full min-h-[190px] bg-card border border-border rounded-lg p-5 flex flex-col justify-between shadow-md cursor-grab active:cursor-grabbing overflow-hidden"
        >
          {/* Lanyard Line Decoration */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-teal-600 via-teal-400 to-teal-700" />
          
          <div className="flex justify-between items-start pt-2">
            <div className="flex flex-col">
              <span className="font-mono text-[8px] tracking-widest text-teal-500 font-bold uppercase">
                Staff Credential
              </span>
              <span className="font-serif text-base text-foreground font-bold mt-1">
                TICKETNATION PH
              </span>
            </div>
            
            <div className="w-9 h-9 rounded bg-elevated border border-border flex items-center justify-center font-mono text-[10px] text-foreground font-bold">
              QA
            </div>
          </div>

          <div className="flex flex-col gap-1 border-t border-border pt-4 mt-2">
            <span className="font-mono text-[9px] text-muted uppercase">Holder Identity:</span>
            <span className="font-sans text-xs text-foreground font-bold">Emer :p</span>
            <span className="font-mono text-[8px] text-teal-500 tracking-wider">ROLE: EVENTS COORDINATOR / QA</span>
          </div>

          <div className="flex justify-between items-center mt-4 pt-2 border-t border-border/40 font-mono text-[8px] text-muted">
            <span>July 2025 // Manila</span>
            <span>CLICKS: {badgeClicks}</span>
          </div>
        </div>

        {/* Tactile Sticky Note Checklist */}
        <div className="bg-[#fef9c3] dark:bg-[#fef08a] border border-amber-200/50 rounded-lg p-5 flex flex-col gap-4 text-zinc-800 shadow-sm relative rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
          {/* Top Tape Graphic effect */}
          <div className="absolute -top-3 left-1/3 right-1/3 h-6 bg-white/40 backdrop-blur-xs rounded border border-white/20 shadow-2xs rotate-[2deg] pointer-events-none" />

          <div className="flex justify-between items-baseline border-b border-amber-300/60 pb-2 mb-1">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-700">
              Workspace Checklist
            </span>
            <span className="font-mono text-[8.5px] text-amber-600 select-none">TACTILE_NOTE</span>
          </div>

          <div className="flex flex-col gap-3 font-sans text-xs">
            {todoList.map(todo => (
              <div 
                key={todo.id}
                onClick={() => toggleTodo(todo.id)}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                  todo.done 
                    ? "bg-amber-600 border-amber-600 text-white" 
                    : "border-amber-400 group-hover:border-amber-600"
                }`}>
                  {todo.done && <span className="text-[9px] leading-none">&#10003;</span>}
                </div>
                
                <span className={`text-[11.5px] leading-tight select-none ${
                  todo.done ? "line-through text-zinc-400 font-medium" : "text-zinc-700 font-medium"
                }`}>
                  {todo.text}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[8px] font-mono text-amber-600/80 pt-2 border-t border-amber-300/40 text-center">
            Click checkboxes to complete SOP logs.
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Workspace CLI Terminal */}
      <div className="md:col-span-7 bg-card border border-border rounded-lg flex flex-col h-[380px] overflow-hidden shadow-sm">
        
        {/* Terminal Header Bar */}
        <div className="bg-elevated px-4 py-3 border-b border-border flex justify-between items-center font-mono text-[9px] text-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span>EMER_TERMINAL // Muntinlupa_City</span>
          </div>
          <span>SECURE_CONNECTION: OK</span>
        </div>

        {/* Terminal Text area */}
        <div 
          ref={terminalContainerRef}
          className="flex-grow p-4 overflow-y-auto font-mono text-[10px] text-secondary flex flex-col gap-1.5 min-h-[180px] bg-background/30 pr-2"
        >
          {terminalHistory.map((line, idx) => {
            let color = "text-secondary";
            if (line.type === "input") color = "text-foreground font-bold";
            if (line.type === "success") color = "text-teal-500 font-bold";
            if (line.type === "warning") color = "text-amber-500";
            return (
              <div key={idx} className={`${color} leading-relaxed whitespace-pre-wrap`}>
                {line.text}
              </div>
            );
          })}
        </div>

        {/* Terminal Input Bar */}
        <div className="border-t border-border bg-elevated/45 p-3 flex gap-2 items-center font-mono text-[10px]">
          <span className="text-teal-500 font-bold font-mono select-none">&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type 'help' to see dynamic commands..."
            className="flex-grow bg-transparent text-foreground border-none outline-none font-mono text-base md:text-[10px] placeholder:text-muted"
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="px-2.5 py-1 rounded bg-card hover:bg-background border border-border hover:border-teal-500 text-foreground hover:text-teal-500 transition cursor-pointer shadow-2xs font-semibold"
          >
            EXEC
          </button>
        </div>

      </div>

    </div>
  );
}
