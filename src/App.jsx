import { useState } from "react";

const phases = [
  {
    id: 1,
    title: "Foundation",
    subtitle: "Weeks 1–2 · Now through ~Mar 24",
    color: "#2D6A4F",
    accent: "#52B788",
    tasks: [
      { id: "1a", text: "Pull your credit report from all 3 bureaus (Experian, Equifax, TransUnion)", time: "30 min", category: "Finance" },
      { id: "1b", text: "Calculate your budget: down payment (3.5–20%), closing costs (~2–5%), reserves", time: "45 min", category: "Finance" },
      { id: "1c", text: "Research Oregon-specific programs (Oregon Bond Residential Loan Program)", time: "30 min", category: "Research" },
      { id: "1d", text: "Research Portland metro neighborhoods: Beaverton, Hillsboro, Lake Oswego, Gresham", time: "45 min", category: "Research" },
      { id: "1e", text: "Make a list of must-haves vs. nice-to-haves for the property", time: "20 min", category: "Planning" },
    ],
  },
  {
    id: 2,
    title: "Team Building",
    subtitle: "Weeks 3–4 · ~Mar 24 – Apr 7",
    color: "#1B4F72",
    accent: "#5DADE2",
    tasks: [
      { id: "2a", text: "Interview 2–3 mortgage lenders licensed in Oregon (look for remote-friendly)", time: "60 min", category: "Finance" },
      { id: "2b", text: "Get pre-approved for a mortgage (critical for out-of-state buyers)", time: "45 min", category: "Finance" },
      { id: "2c", text: "Find a Portland-area buyer's agent (ask about experience with remote/out-of-state buyers)", time: "45 min", category: "Team" },
      { id: "2d", text: "Ask your agent about 'remote closing' — Oregon allows full remote closing via e-notary", time: "20 min", category: "Team" },
      { id: "2e", text: "Set up property alerts on Zillow, Redfin, and Realtor.com for Portland metro", time: "15 min", category: "Research" },
    ],
  },
  {
    id: 3,
    title: "Active Search",
    subtitle: "Weeks 5–10 · ~Apr 7 – May 19",
    color: "#6B3A2A",
    accent: "#E07B54",
    tasks: [
      { id: "3a", text: "Schedule virtual tours for shortlisted properties (your agent can video walk-through)", time: "60 min/wk", category: "Search" },
      { id: "3b", text: "Plan 1 in-person trip to Portland to tour top 5–8 properties", time: "Weekend trip", category: "Search" },
      { id: "3c", text: "Review HOA docs, neighborhood crime stats, flood zone maps for candidates", time: "45 min", category: "Research" },
      { id: "3d", text: "Make an offer! Your agent submits remotely — you sign electronically", time: "30 min", category: "Action" },
      { id: "3e", text: "Negotiate inspection contingencies and closing timeline (aim for 30–45 day close)", time: "30 min", category: "Action" },
    ],
  },
  {
    id: 4,
    title: "Under Contract",
    subtitle: "Weeks 11–14 · ~May 19 – Jun 16",
    color: "#4A235A",
    accent: "#A855F7",
    tasks: [
      { id: "4a", text: "Hire an Oregon-licensed home inspector (can attend virtually or get video + report)", time: "30 min", category: "Due Diligence" },
      { id: "4b", text: "Order appraisal (lender arranges, you review results)", time: "20 min", category: "Finance" },
      { id: "4c", text: "Lock in your mortgage rate", time: "15 min", category: "Finance" },
      { id: "4d", text: "Review title report and purchase title insurance", time: "30 min", category: "Legal" },
      { id: "4e", text: "Wire earnest money and down payment via secure bank wire (verify wire instructions directly)", time: "30 min", category: "Finance" },
    ],
  },
  {
    id: 5,
    title: "Closing & Move",
    subtitle: "Weeks 15–18 · ~Jun 16 – Sep 30",
    color: "#1A3A2A",
    accent: "#40B06E",
    tasks: [
      { id: "5a", text: "Sign closing documents remotely via RON (Remote Online Notarization) — Oregon allows this", time: "60 min", category: "Legal" },
      { id: "5b", text: "Close before Dec 31 to qualify for 2026 tax year (mortgage interest, property tax deductions)", time: "Key date", category: "Tax" },
      { id: "5c", text: "Set up Oregon utilities, change mailing address, update voter registration", time: "45 min", category: "Admin" },
      { id: "5d", text: "Arrange movers — book 6–8 weeks in advance for an October move", time: "30 min", category: "Logistics" },
      { id: "5e", text: "Give California landlord formal written notice by mid-August (60-day notice typical)", time: "15 min", category: "Logistics" },
    ],
  },
];

const categoryColors = {
  Finance: "#F59E0B",
  Research: "#60A5FA",
  Planning: "#A78BFA",
  Team: "#34D399",
  Search: "#F97316",
  Action: "#EF4444",
  "Due Diligence": "#EC4899",
  Legal: "#8B5CF6",
  Tax: "#10B981",
  Admin: "#6B7280",
  Logistics: "#FB923C",
};

const themes = {
  dark: {
    bg: "linear-gradient(135deg, #0a0f0a 0%, #0f1a14 50%, #0a0e14 100%)",
    headerBg: "rgba(255,255,255,0.02)",
    headerBorder: "#1e3a28",
    text: "#D8D8D0",
    textMuted: "#8A9E8A",
    textFaint: "#6A8A6A",
    textDone: "#4A6A4A",
    heading: "#F0F0E8",
    accent: "#52B788",
    progressTrack: "#1a2e1a",
    bannerBg: "rgba(82,183,136,0.08)",
    bannerBorder: "#1e3a28",
    bannerText: "#8DC8A0",
    phaseBorderClosed: "#1e2e1e",
    phaseTrack: "#1a2e1a",
    phaseInnerDot: "#0a0f0a",
    phaseClosedBg: "rgba(255,255,255,0.02)",
    taskDivider: "#111e11",
    taskExpandBg: "transparent",
    checkboxBorder: "#2a4a2a",
    footerBg: "rgba(255,200,50,0.05)",
    footerBorder: "#3a3010",
    footerText: "#A09060",
    footerAccent: "#D4A820",
    toggleBg: "#1a2e1a",
    toggleBorder: "#2a4a2a",
    toggleIcon: "☀️",
    toggleLabel: "Light mode",
  },
  light: {
    bg: "linear-gradient(135deg, #f0f7f4 0%, #e8f5ee 50%, #eef4f0 100%)",
    headerBg: "rgba(255,255,255,0.75)",
    headerBorder: "#b8d8c8",
    text: "#1e3428",
    textMuted: "#4a7060",
    textFaint: "#5a7868",
    textDone: "#90b8a0",
    heading: "#0f1e16",
    accent: "#1a6b44",
    progressTrack: "#c0ddd0",
    bannerBg: "rgba(26,107,68,0.07)",
    bannerBorder: "#a8d4bc",
    bannerText: "#246644",
    phaseBorderClosed: "#cce4d8",
    phaseTrack: "#c0ddd0",
    phaseInnerDot: "#f4faf7",
    phaseClosedBg: "rgba(255,255,255,0.55)",
    taskDivider: "#d4ece0",
    taskExpandBg: "rgba(255,255,255,0.5)",
    checkboxBorder: "#80b898",
    footerBg: "rgba(180,140,20,0.07)",
    footerBorder: "#ccc060",
    footerText: "#6a5418",
    footerAccent: "#8a6a10",
    toggleBg: "#daeee6",
    toggleBorder: "#90c8b0",
    toggleIcon: "🌙",
    toggleLabel: "Dark mode",
  },
};

export default function App() {
  const [checked, setChecked] = useState({ "1a": true, "1e": true });
  const [openPhase, setOpenPhase] = useState(1);
  const [isDark, setIsDark] = useState(true);

  const tk = isDark ? themes.dark : themes.light;

  const toggleTask = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalTasks = phases.flatMap((p) => p.tasks).length;
  const completedTasks = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const phaseProgress = (phase) => {
    const done = phase.tasks.filter((t) => checked[t.id]).length;
    return Math.round((done / phase.tasks.length) * 100);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: tk.bg,
      fontFamily: "'Georgia', serif",
      color: tk.text,
      transition: "background 0.35s, color 0.35s",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${tk.headerBorder}`,
        padding: "48px 40px 36px",
        background: tk.headerBg,
        transition: "background 0.35s, border-color 0.35s",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Eyebrow + toggle */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", color: tk.accent, textTransform: "uppercase", fontFamily: "monospace", transition: "color 0.35s" }}>
              Out-of-State Home Purchase · Southern CA → Portland Metro
            </div>
            <button
              onClick={() => setIsDark((d) => !d)}
              title={tk.toggleLabel}
              style={{
                flexShrink: 0,
                marginLeft: 16,
                background: tk.toggleBg,
                border: `1px solid ${tk.toggleBorder}`,
                borderRadius: 20,
                padding: "5px 12px",
                cursor: "pointer",
                fontSize: 12,
                color: tk.textMuted,
                fontFamily: "monospace",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "background 0.35s, border-color 0.35s, color 0.35s",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 14 }}>{tk.toggleIcon}</span>
              <span>{tk.toggleLabel}</span>
            </button>
          </div>

          <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 400, margin: "0 0 8px", lineHeight: 1.15, color: tk.heading, transition: "color 0.35s" }}>
            Your Portland Home<br />Purchase Roadmap
          </h1>
          <p style={{ color: tk.textMuted, margin: "12px 0 32px", fontSize: 15, fontStyle: "italic", transition: "color 0.35s" }}>
            30–60 min/day · Close by Dec 31, 2026 · Move by mid-October
          </p>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, height: 6, background: tk.progressTrack, borderRadius: 3, overflow: "hidden", transition: "background 0.35s" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #2D6A4F, #52B788)", borderRadius: 3, transition: "width 0.5s ease" }} />
            </div>
            <span style={{ fontFamily: "monospace", fontSize: 13, color: tk.accent, whiteSpace: "nowrap", transition: "color 0.35s" }}>
              {completedTasks} / {totalTasks} done
            </span>
          </div>
        </div>
      </div>

      {/* Key Tip Banner */}
      <div style={{ background: tk.bannerBg, borderBottom: `1px solid ${tk.bannerBorder}`, padding: "14px 40px", transition: "background 0.35s, border-color 0.35s" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", fontSize: 13, color: tk.bannerText, transition: "color 0.35s" }}>
          <strong style={{ color: tk.accent }}>🔑 Key for out-of-state buyers:</strong> Oregon allows Remote Online
          Notarization (RON) — you can close entirely without flying back. Your buyer's agent + a remote-friendly
          lender are your most important hires.
        </div>
      </div>

      {/* Phases */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 40px 60px" }}>
        {phases.map((phase) => {
          const pp = phaseProgress(phase);
          const isOpen = openPhase === phase.id;
          return (
            <div key={phase.id} style={{
              marginBottom: 16,
              border: `1px solid ${isOpen ? phase.accent + "55" : tk.phaseBorderClosed}`,
              borderRadius: 12,
              overflow: "hidden",
              transition: "border-color 0.35s",
            }}>
              <button
                onClick={() => setOpenPhase(isOpen ? null : phase.id)}
                style={{
                  width: "100%",
                  background: isOpen
                    ? `linear-gradient(135deg, ${phase.color}20, ${phase.color}10)`
                    : tk.phaseClosedBg,
                  border: "none",
                  padding: "20px 24px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  textAlign: "left",
                  transition: "background 0.35s",
                }}
              >
                {/* Circular progress donut */}
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: `conic-gradient(${phase.accent} ${pp * 3.6}deg, ${tk.phaseTrack} ${pp * 3.6}deg)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.35s",
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: tk.phaseInnerDot,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontFamily: "monospace", color: phase.accent,
                    transition: "background 0.35s",
                  }}>
                    {phase.id}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, color: tk.heading, fontWeight: 400, transition: "color 0.35s" }}>{phase.title}</div>
                  <div style={{ fontSize: 12, color: tk.textFaint, marginTop: 2, fontFamily: "monospace", transition: "color 0.35s" }}>{phase.subtitle}</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, fontFamily: "monospace", color: phase.accent }}>{pp}%</span>
                  <span style={{ color: tk.textFaint, fontSize: 18, display: "inline-block", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s, color 0.35s" }}>›</span>
                </div>
              </button>

              {isOpen && (
                <div style={{ padding: "4px 24px 20px", background: tk.taskExpandBg, transition: "background 0.35s" }}>
                  {phase.tasks.map((task, i) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 14,
                        padding: "14px 0",
                        borderBottom: i < phase.tasks.length - 1 ? `1px solid ${tk.taskDivider}` : "none",
                        cursor: "pointer",
                        opacity: checked[task.id] ? 0.5 : 1,
                        transition: "opacity 0.2s",
                      }}
                    >
                      <div style={{
                        width: 20, height: 20, borderRadius: 4,
                        border: `1.5px solid ${checked[task.id] ? phase.accent : tk.checkboxBorder}`,
                        background: checked[task.id] ? phase.accent : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: 2,
                        transition: "all 0.2s",
                      }}>
                        {checked[task.id] && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 14.5,
                          color: checked[task.id] ? tk.textDone : tk.text,
                          textDecoration: checked[task.id] ? "line-through" : "none",
                          lineHeight: 1.5, transition: "color 0.2s",
                        }}>
                          {task.text}
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                          <span style={{
                            fontSize: 11, fontFamily: "monospace",
                            background: (categoryColors[task.category] || "#888") + "22",
                            color: categoryColors[task.category] || "#888",
                            padding: "2px 8px", borderRadius: 3,
                          }}>
                            {task.category}
                          </span>
                          <span style={{ fontSize: 11, color: tk.textFaint, fontFamily: "monospace", paddingTop: 2, transition: "color 0.35s" }}>
                            ⏱ {task.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer note */}
        <div style={{
          marginTop: 32, padding: "20px 24px",
          background: tk.footerBg,
          border: `1px solid ${tk.footerBorder}`,
          borderRadius: 10, fontSize: 13,
          color: tk.footerText, lineHeight: 1.7,
          transition: "background 0.35s, border-color 0.35s, color 0.35s",
        }}>
          <strong style={{ color: tk.footerAccent }}>📋 Tax note:</strong> To deduct mortgage interest and property taxes
          on your 2026 return, you must close escrow by{" "}
          <strong style={{ color: tk.footerAccent }}>December 31, 2026</strong>. Aim to close by October to give yourself
          a buffer before your lease ends.
        </div>
      </div>
    </div>
  );
}
