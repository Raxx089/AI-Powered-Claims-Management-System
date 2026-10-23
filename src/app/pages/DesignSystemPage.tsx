import { useState } from "react";
import {
  Palette, Layers, Grid3x3, Monitor, BookOpen,
  ChevronRight, Sparkles, Zap, Shield, Check,
  ArrowRight, Code2, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FoundationsSection } from "../components/ds/Foundations";
import { ComponentsSection } from "../components/ds/Components";
import { PatternsSection } from "../components/ds/Patterns";
import { ScreensSection } from "../components/ds/Screens";

// ─── Tab Config ────────────────────────────────────────────────────────────────
const TABS = [
  {
    id: "overview",
    label: "Overview",
    icon: BookOpen,
    desc: "Design system introduction and principles",
  },
  {
    id: "foundations",
    label: "Foundations",
    icon: Palette,
    desc: "Colors, typography, spacing, shadows & motion",
  },
  {
    id: "components",
    label: "Components",
    icon: Layers,
    desc: "Reusable UI components with all variants & states",
  },
  {
    id: "patterns",
    label: "Patterns",
    icon: Grid3x3,
    desc: "Composite UI patterns for common interactions",
  },
  {
    id: "screens",
    label: "Screens",
    icon: Monitor,
    desc: "High-fidelity mockups across devices",
  },
];

// ─── Overview Cards ─────────────────────────────────────────────────────────────
const PRINCIPLES = [
  {
    icon: Palette,
    title: "Accessible First",
    desc: "Every component meets WCAG 2.1 AA contrast standards. Keyboard navigation, focus rings, and screen-reader-friendly markup baked in.",
    color: "var(--primary)",
    bg: "var(--accent)",
  },
  {
    icon: Zap,
    title: "Consistent Tokens",
    desc: "Design decisions encoded as semantic tokens — colors, spacing, radius, shadows, and motion. Single source of truth for the entire system.",
    color: "var(--violet)",
    bg: "var(--violet-container)",
  },
  {
    icon: Grid3x3,
    title: "Composable Patterns",
    desc: "Atomic components combine into larger patterns and layouts. Reusable, predictable, and easy to extend across the claims platform.",
    color: "var(--success)",
    bg: "var(--success-container)",
  },
  {
    icon: Shield,
    title: "Production Ready",
    desc: "All components are performance-optimized, responsive, and tested with real data. Ready for developer handoff with complete specs.",
    color: "var(--warning)",
    bg: "var(--warning-container)",
  },
];

const STATS = [
  { value: "80+", label: "Components" },
  { value: "5", label: "Screen Types" },
  { value: "12", label: "Color Scales" },
  { value: "WCAG AA", label: "Accessibility" },
];

const SECTIONS = [
  { id: "foundations", icon: Palette, label: "Foundations", items: ["Color System", "Typography Scale", "Spacing Tokens", "Border Radius", "Elevation Shadows", "Motion Tokens"], color: "var(--primary)" },
  { id: "components", icon: Layers, label: "Components", items: ["Button Library", "Form Controls", "Navigation", "Badges & Chips", "Alerts & Toasts", "Cards & Tables"], color: "var(--violet)" },
  { id: "patterns", icon: Grid3x3, label: "Patterns", items: ["Data Table", "Multi-Step Form", "Detail Panel", "Settings Layout"], color: "var(--success)" },
  { id: "screens", icon: Monitor, label: "Screens", items: ["Dashboard", "Claims List", "Claim Detail", "Settings Page", "Mobile App"], color: "var(--warning)" },
];

// ─── Overview Section ───────────────────────────────────────────────────────────
function OverviewSection({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl px-8 py-10"
        style={{ background: "var(--sidebar)" }}>
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "var(--primary)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-32 w-48 h-48 rounded-full opacity-10"
          style={{ background: "var(--violet)", transform: "translate(-20%, 40%)" }} />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: "color-mix(in srgb, var(--violet) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--violet) 30%, transparent)" }}>
              <Sparkles size={12} style={{ color: "var(--violet-soft)" }} />
              <span className="text-xs" style={{ color: "var(--violet-soft)", fontWeight: "var(--font-weight-medium)" }}>Design System v2.0 · ClaimAI Platform</span>
            </div>
          </div>

          <h1 className="text-primary-foreground mb-3" style={{ fontSize: "var(--fs-display-sm)", fontWeight: "var(--font-weight-medium)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            ClaimAI Design System
          </h1>
          <p className="mb-6 max-w-2xl" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)", fontSize: "var(--fs-body-lg)", lineHeight: 1.7 }}>
            A comprehensive, production-ready design system built for the AI-Powered Claims Management Platform.
            Covering every token, component, pattern, and screen — ready for developer handoff.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-6 mb-8">
            {STATS.map(s => (
              <div key={s.label}>
                <p className="text-primary-foreground" style={{ fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-headline-sm)" }}>{s.value}</p>
                <p className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate("foundations")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-primary-foreground transition-all hover:-translate-y-0.5"
              style={{ background: "var(--primary)", fontWeight: "var(--font-weight-medium)", boxShadow: "0 4px 16px color-mix(in srgb, var(--primary) 40%, transparent)" }}>
              Explore System <ArrowRight size={14} />
            </button>
            <button onClick={() => onNavigate("screens")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-primary-foreground transition-all hover:opacity-80"
              style={{ background: "color-mix(in srgb, var(--card) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--card) 15%, transparent)", fontWeight: "var(--font-weight-medium)" }}>
              <Monitor size={14} /> View Screens
            </button>
          </div>
        </div>
      </div>

      {/* Principles */}
      <div>
        <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Design Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                  style={{ background: p.bg }}>
                  <Icon size={18} style={{ color: p.color }} />
                </div>
                <p className="text-sm mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{p.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section Map */}
      <div>
        <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>System Contents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div key={section.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
                className="rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}
                onClick={() => onNavigate(section.id)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `color-mix(in srgb, ${section.color} 7%, transparent)` }}>
                      <Icon size={16} style={{ color: section.color }} />
                    </div>
                    <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{section.label}</p>
                  </div>
                  <ChevronRight size={14} style={{ color: "var(--outline)" }} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {section.items.map(item => (
                    <span key={item} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `color-mix(in srgb, ${section.color} 6%, transparent)`, color: section.color, fontWeight: "var(--font-weight-medium)" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Accessibility Checklist */}
      <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
        <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Accessibility Standards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "WCAG 2.1 AA contrast ratios on all text",
            "Full keyboard navigation support",
            "Visible focus indicators (3px ring)",
            "Minimum 44×44px touch targets",
            "Semantic HTML and ARIA labels",
            "Error messages with clear guidance",
            "No color-only information conveyed",
            "Screen-reader compatible structure",
            "Reduced motion preference support",
            "High-contrast mode compatibility",
          ].map(item => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                style={{ background: "var(--success-container)" }}>
                <Check size={11} style={{ color: "var(--success)" }} />
              </div>
              <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Token Preview */}
      <div className="rounded-2xl p-6" style={{ background: "var(--sidebar)", border: "1px solid var(--sidebar-mid)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Code2 size={14} style={{ color: "var(--inverse-primary)" }} />
          <p className="text-xs" style={{ color: "var(--inverse-primary)", fontWeight: "var(--font-weight-medium)" }}>DESIGN TOKEN PREVIEW</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { token: "--primary", value: "var(--primary)", label: "Primary" },
            { token: "--success", value: "var(--success)", label: "Success" },
            { token: "--warning", value: "var(--warning)", label: "Warning" },
            { token: "--error", value: "var(--destructive)", label: "Error" },
            { token: "--radius-xl", value: "16px", label: "Radius XL" },
            { token: "--space-4", value: "16px", label: "Space 4" },
            { token: "--shadow-2", value: "0 4px 12px", label: "Elevation 2" },
            { token: "--duration-fast", value: "150ms", label: "Fast" },
          ].map(t => (
            <div key={t.token} className="rounded-xl p-3"
              style={{ background: "color-mix(in srgb, var(--card) 5%, transparent)", border: "1px solid color-mix(in srgb, var(--card) 8%, transparent)" }}>
              <p className="text-xs mb-0.5 font-mono" style={{ color: "var(--inverse-primary)", fontSize: "var(--fs-label-sm)" }}>{t.token}</p>
              <p className="text-xs" style={{ color: "var(--surface-container-low)", fontWeight: "var(--font-weight-medium)" }}>{t.value}</p>
              <p style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)", fontSize: "var(--fs-label-sm)" }}>{t.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="px-6 py-5" style={{ background: "var(--card)", borderBottom: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: "var(--primary)", boxShadow: "0 4px 12px color-mix(in srgb, var(--primary) 30%, transparent)" }}>
              <Sparkles size={18} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Design System</h1>
              <p className="text-xs" style={{ color: "var(--outline)" }}>
                ClaimAI Platform · v2.0 · Production Ready
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[
              { label: "Figma File", icon: ExternalLink },
              { label: "GitHub", icon: Code2 },
            ].map(btn => {
              const Icon = btn.icon;
              return (
                <button key={btn.label}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all hover:bg-accent"
                  style={{ border: "1px solid var(--border)", color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)", background: "var(--card)" }}>
                  <Icon size={12} />
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 mt-5 overflow-x-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all"
                style={{
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--outline)",
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                <Icon size={14} />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: "var(--primary)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Description Bar */}
      <div className="px-6 py-2.5" style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--surface-container)" }}>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {TABS.find(t => t.id === activeTab)?.desc}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            {activeTab === "overview" && <OverviewSection onNavigate={setActiveTab} />}
            {activeTab === "foundations" && <FoundationsSection />}
            {activeTab === "components" && <ComponentsSection />}
            {activeTab === "patterns" && <PatternsSection />}
            {activeTab === "screens" && <ScreensSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
