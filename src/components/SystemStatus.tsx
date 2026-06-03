"use client";
import React, { useEffect, useState } from "react";

export default function SystemStatus() {
  const [manilaTime, setManilaTime] = useState<string>("");
  const [uptime, setUptime] = useState<number>(0);
  const [sysMetrics, setSysMetrics] = useState({
    dbPool: "14/20 warm",
    cpuUsage: "1.2%",
    ping: "42ms",
  });

  useEffect(() => {
    // Sync Manila time
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setManilaTime(formatter.format(new Date()));
    };

    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // Sync page uptime
    const start = Date.now();
    const uptimeInterval = setInterval(() => {
      const diffSecs = Math.floor((Date.now() - start) / 1000);
      setUptime(diffSecs);
    }, 1000);

    // Randomize minor metrics slightly for dynamic feeling
    const metricsInterval = setInterval(() => {
      setSysMetrics({
        dbPool: `${12 + Math.floor(Math.random() * 5)}/20 warm`,
        cpuUsage: `${(0.8 + Math.random() * 1.5).toFixed(1)}%`,
        ping: `${38 + Math.floor(Math.random() * 10)}ms`,
      });
    }, 4000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(uptimeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  const formatUptime = (secs: number) => {
    const hours = Math.floor(secs / 3600).toString().padStart(2, "0");
    const mins = Math.floor((secs % 3600) / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${hours}:${mins}:${s}`;
  };

  const handleSpawn = (character: "chiikawa" | "hachiware" | "usagi") => {
    // Trigger pop-up sticker spawn event
    window.dispatchEvent(new CustomEvent("chiikawa-spawn", { detail: { character } }));

    // Send character dialogue logs directly to the Workspace CLI Terminal
    let output = [];
    if (character === "chiikawa") {
      output = [
        { text: "> spawn chiikawa", type: "input" as const },
        { text: "🍼 (•ㅅ•) [Chiikawa]: Fueee... Wa...! (哭)", type: "warning" as const }
      ];
    } else if (character === "hachiware") {
      output = [
        { text: "> spawn hachiware", type: "input" as const },
        { text: "🐱 ( ˵•̀ ▽ •́˵ ) [Hachiware]: Nantokanare! (なんとかなれ！)", type: "success" as const }
      ];
    } else {
      output = [
        { text: "> spawn usagi", type: "input" as const },
        { text: "🐰 ( ﾟヮﾟ) [Usagi]: YAHA! URA!!! Pulululu!", type: "warning" as const }
      ];
    }

    window.dispatchEvent(new CustomEvent("terminal-remote", { detail: { output } }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 font-mono text-xs text-secondary flex flex-col justify-between h-full min-h-[220px] shadow-sm select-none">
      <div className="flex justify-between items-center border-b border-border pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground">
            System Telemetry
          </span>
        </div>
        <span className="text-[9px] text-muted">ID: EMER_SYS_v2.1</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <span className="text-[9px] text-muted uppercase tracking-tight">Manila Time (UTC+8)</span>
          <span className="text-lg font-bold text-foreground tracking-wider mt-0.5 select-all">
            {manilaTime || "00:00:00"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-muted uppercase tracking-tight">Session Uptime</span>
          <span className="text-lg font-bold text-foreground tracking-wider mt-0.5">
            {formatUptime(uptime)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-[10px] border-t border-border/60 pt-3 mb-3">
        <div className="flex justify-between">
          <span className="text-muted">DB Connection Pool:</span>
          <span className="text-foreground font-semibold">{sysMetrics.dbPool}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">CPU Thread Load:</span>
          <span className="text-foreground font-semibold">{sysMetrics.cpuUsage}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Network Latency:</span>
          <span className="text-teal-500 font-semibold">{sysMetrics.ping}</span>
        </div>
      </div>

      <div className="border-t border-border pt-3 flex flex-col gap-1.5">
        <span className="text-[9px] text-muted uppercase tracking-wider mb-0.5">Chiikawa Spawner</span>
        <div className="grid grid-cols-3 gap-1 bg-elevated/50 p-0.5 rounded border border-border">
          <button
            onClick={() => handleSpawn("chiikawa")}
            className="text-[9px] py-1 rounded transition text-center cursor-pointer bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold border border-red-500/20 hover:border-red-500/40 shadow-xs"
          >
            CHIIKAWA
          </button>
          <button
            onClick={() => handleSpawn("hachiware")}
            className="text-[9px] py-1 rounded transition text-center cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 font-bold border border-blue-500/20 hover:border-blue-500/40 shadow-xs"
          >
            HACHIWARE
          </button>
          <button
            onClick={() => handleSpawn("usagi")}
            className="text-[9px] py-1 rounded transition text-center cursor-pointer bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 font-bold border border-yellow-500/20 hover:border-yellow-500/40 shadow-xs"
          >
            USAGI
          </button>
        </div>
      </div>
    </div>
  );
}
