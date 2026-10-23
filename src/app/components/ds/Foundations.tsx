import { useState } from "react";
import { Check, Copy, Eye, EyeOff } from "lucide-react";

// ─── Color Swatch ─────────────────────────────────────────────────────────────
function Swatch({ color, label, token, contrast }: { color: string; label: string; token: string; contrast?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} className="group flex flex-col overflow-hidden rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-md text-left w-full"
      style={{ borderColor: "var(--border)" }}>
      <div className="w-full flex items-end justify-end p-2" style={{ background: color, height: 72 }}>
        <span className="opacity-0 group-hover:opacity-100 flex items-center gap-1 rounded-lg px-2 py-1 text-xs transition-all"
          style={{ background: "color-mix(in srgb, var(--foreground) 30%, transparent)", color: "var(--primary-foreground)" }}>
          {copied ? <Check size={10} /> : <Copy size={10} />}
          {copied ? "Copied!" : color}
        </span>
      </div>
      <div className="p-2.5" style={{ background: "var(--card)" }}>
        <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--outline)" }}>{token}</p>
        {contrast && <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Contrast: {contrast}</p>}
      </div>
    </button>
  );
}

function ColorPalette({ title, desc, colors }: { title: string; desc: string; colors: { color: string; label: string; token: string; contrast?: string }[] }) {
  return (
    <div className="mb-8">
      <div className="mb-3">
        <h4 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{title}</h4>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {colors.map(c => <Swatch key={c.token} {...c} />)}
      </div>
    </div>
  );
}

// ─── Typography Row ────────────────────────────────────────────────────────────
function TypeRow({ name, size, weight, lineHeight, spec, token, sample }: {
  name: string; size: string; weight: string; lineHeight: string; spec: string; token: string; sample: string;
}) {
  return (
    <div className="py-5 border-b flex flex-col gap-2" style={{ borderColor: "var(--surface-container)" }}>
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-xs px-2.5 py-1 rounded-full shrink-0" style={{ background: "var(--accent)", color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>{name}</span>
        <div className="flex gap-4 text-xs flex-wrap" style={{ color: "var(--outline)" }}>
          <span>Size / Line height · Weight: <strong style={{ color: "var(--muted-foreground)" }}>{spec}</strong></span>
          <span>Tokens: <strong style={{ color: "var(--muted-foreground)" }}>{token}</strong></span>
        </div>
      </div>
      <p style={{ fontSize: size, fontWeight: weight as any, lineHeight, color: "var(--foreground)" }}>{sample}</p>
    </div>
  );
}

// ─── Spacing Token ─────────────────────────────────────────────────────────────
function SpacingToken({ name, px, rem }: { name: string; px: number; rem: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b" style={{ borderColor: "var(--surface-container)" }}>
      <div className="w-16 text-xs shrink-0" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>{name}</div>
      <div className="flex items-center gap-3 flex-1">
        <div className="rounded" style={{ width: px, height: 20, background: "var(--primary)", minWidth: 4, opacity: 0.8 }} />
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{px}px / {rem}</span>
      </div>
    </div>
  );
}

// ─── Radius Token ──────────────────────────────────────────────────────────────
function RadiusToken({ name, value, px }: { name: string; value: string; px: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 border-2" style={{ borderColor: "var(--primary)", borderRadius: value, background: "var(--accent)" }} />
      <div className="text-center">
        <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{name}</p>
        <p className="text-xs" style={{ color: "var(--outline)" }}>{px}</p>
      </div>
    </div>
  );
}

// ─── Shadow Token ──────────────────────────────────────────────────────────────
function ShadowToken({ name, shadow, desc }: { name: string; shadow: string; desc: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-24 h-16 rounded-xl bg-card" style={{ boxShadow: shadow }} />
      <div className="text-center">
        <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{name}</p>
        <p className="text-xs" style={{ color: "var(--outline)" }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── Motion Demo ───────────────────────────────────────────────────────────────
function MotionDemo({ name, desc, duration, easing }: { name: string; desc: string; duration: string; easing: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--surface-container-low)" }}>
      <div>
        <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{name}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
        <p className="text-xs mt-1" style={{ color: "var(--outline)" }}>Duration: {duration} · Easing: {easing}</p>
      </div>
      <button onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: active ? "var(--on-primary-container)" : "var(--primary)",
          transform: active ? "scale(1.08) translateY(-2px)" : "scale(1)",
          boxShadow: active ? "0 8px 20px color-mix(in srgb, var(--primary) 35%, transparent)" : "0 2px 8px color-mix(in srgb, var(--primary) 20%, transparent)",
          transition: `all ${duration} ${easing}`,
          color: "var(--primary-foreground)"
        }}>
        <Eye size={16} />
      </button>
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground shrink-0"
        style={{ background: "var(--primary)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-md)" }}>
        {num}
      </div>
      <div>
        <h3 className="text-base" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{title}</h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── Token Card ────────────────────────────────────────────────────────────────
function TokenCard({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="rounded-2xl p-6 mb-6" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
      <h4 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{title}</h4>
      {children}
    </div>
  );
}

// ─── Main Foundations Component ────────────────────────────────────────────────
export function FoundationsSection() {
  return (
    <div className="space-y-10">

      {/* ── 1. Color System ── */}
      <section>
        <SectionHeader num="1" title="Color System"
          desc="Local Material 3 color roles defined in globals.css. Each swatch renders its semantic token." />

        <ColorPalette title="Primary" desc="Material 3 primary roles for calls to action, links, focus rings, and active states."
          colors={[
            { color: "var(--primary)", label: "Primary", token: "--primary" },
            { color: "var(--primary-foreground)", label: "On Primary", token: "--primary-foreground" },
            { color: "var(--primary-container)", label: "Primary Container", token: "--primary-container" },
            { color: "var(--on-primary-container)", label: "On Primary Container", token: "--on-primary-container" },
            { color: "var(--inverse-primary)", label: "Inverse Primary", token: "--inverse-primary" },
            { color: "var(--accent)", label: "Accent (8% primary tint)", token: "--accent" },
          ]} />

        <ColorPalette title="Surfaces & Outline" desc="Material 3 surface container ladder, text roles, and outlines."
          colors={[
            { color: "var(--surface)", label: "Surface", token: "--surface" },
            { color: "var(--surface-container-lowest)", label: "Container Lowest", token: "--surface-container-lowest" },
            { color: "var(--surface-container-low)", label: "Container Low", token: "--surface-container-low" },
            { color: "var(--surface-container)", label: "Container", token: "--surface-container" },
            { color: "var(--surface-container-high)", label: "Container High", token: "--surface-container-high" },
            { color: "var(--surface-container-highest)", label: "Container Highest", token: "--surface-container-highest" },
            { color: "var(--on-surface)", label: "On Surface", token: "--on-surface" },
            { color: "var(--on-surface-variant)", label: "On Surface Variant", token: "--on-surface-variant" },
            { color: "var(--outline)", label: "Outline", token: "--outline" },
            { color: "var(--outline-variant)", label: "Outline Variant", token: "--outline-variant" },
          ]} />

        <ColorPalette title="Feedback — Success & Warning" desc="Semantic success and warning roles for status messaging."
          colors={[
            { color: "var(--success)", label: "Success", token: "--success" },
            { color: "var(--success-container)", label: "Success Container", token: "--success-container" },
            { color: "var(--success-border)", label: "Success Border", token: "--success-border" },
            { color: "var(--on-success-container)", label: "On Success Container", token: "--on-success-container" },
            { color: "var(--success-soft)", label: "Success Soft", token: "--success-soft" },
            { color: "var(--warning)", label: "Warning", token: "--warning" },
            { color: "var(--warning-container)", label: "Warning Container", token: "--warning-container" },
            { color: "var(--warning-border)", label: "Warning Border", token: "--warning-border" },
            { color: "var(--on-warning-container)", label: "On Warning Container", token: "--on-warning-container" },
            { color: "var(--warning-soft)", label: "Warning Soft", token: "--warning-soft" },
          ]} />

        <ColorPalette title="Feedback — Error & Info" desc="Semantic error and informational roles for status messaging."
          colors={[
            { color: "var(--destructive)", label: "Error", token: "--destructive" },
            { color: "var(--destructive-foreground)", label: "On Error", token: "--destructive-foreground" },
            { color: "var(--destructive-container)", label: "Error Container", token: "--destructive-container" },
            { color: "var(--on-destructive-container)", label: "On Error Container", token: "--on-destructive-container" },
            { color: "var(--destructive-soft)", label: "Error Soft", token: "--destructive-soft" },
            { color: "var(--info)", label: "Info", token: "--info" },
            { color: "var(--info-container)", label: "Info Container", token: "--info-container" },
          ]} />

        <ColorPalette title="AI — Violet" desc="Static purple palette. Accent for AI features, highlights, and complementary actions."
          colors={[
            { color: "var(--violet)", label: "Violet", token: "--violet" },
            { color: "var(--violet-soft)", label: "Violet Soft", token: "--violet-soft" },
            { color: "var(--violet-container)", label: "Violet Container", token: "--violet-container" },
            { color: "var(--violet-border)", label: "Violet Border", token: "--violet-border" },
            { color: "var(--on-violet-container)", label: "On Violet Container", token: "--on-violet-container" },
          ]} />

        <ColorPalette title="Navigation Rail" desc="Dark Material-inspired tones used by the sidebar."
          colors={[
            { color: "var(--sidebar)", label: "Sidebar", token: "--sidebar" },
            { color: "var(--sidebar-deep)", label: "Sidebar Deep", token: "--sidebar-deep" },
            { color: "var(--sidebar-mid)", label: "Sidebar Mid", token: "--sidebar-mid" },
            { color: "var(--sidebar-foreground)", label: "Sidebar Foreground", token: "--sidebar-foreground" },
            { color: "var(--sidebar-primary)", label: "Sidebar Primary", token: "--sidebar-primary" },
            { color: "var(--sidebar-primary-foreground)", label: "On Sidebar Primary", token: "--sidebar-primary-foreground" },
          ]} />

        <TokenCard title="Semantic Aliases">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Background", token: "--background" },
              { label: "Card", token: "--card" },
              { label: "Border", token: "--border" },
              { label: "Foreground", token: "--foreground" },
              { label: "Muted", token: "--muted" },
              { label: "Muted Foreground", token: "--muted-foreground" },
              { label: "Input", token: "--input" },
              { label: "Ring", token: "--ring" },
            ].map(t => (
              <div key={t.token} className="flex items-center gap-2.5 p-3 rounded-lg" style={{ background: "var(--surface-container-low)" }}>
                <div className="w-8 h-8 rounded-lg border shrink-0" style={{ background: `var(${t.token})`, borderColor: "var(--border)" }} />
                <div>
                  <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{t.label}</p>
                  <p className="text-xs" style={{ color: "var(--outline)" }}>{t.token}</p>
                </div>
              </div>
            ))}
          </div>
        </TokenCard>
      </section>

      {/* ── 2. Typography ── */}
      <section>
        <SectionHeader num="2" title="Typography System"
          desc="Roboto typography with a local Material 3 type scale. Sizes and line heights use the app's --fs-* and --lh-* tokens." />

        <TokenCard title="Type Scale">
          <TypeRow name="Display Small" size="var(--fs-display-sm)" lineHeight="var(--lh-display-sm)" weight="var(--font-weight-normal)" spec="36 / 44px · 400" token="--fs-display-sm / --lh-display-sm" sample="Claims Intelligence Platform" />
          <TypeRow name="Headline Large" size="var(--fs-headline-lg)" lineHeight="var(--lh-headline-lg)" weight="var(--font-weight-normal)" spec="32 / 40px · 400" token="--fs-headline-lg / --lh-headline-lg" sample="AI-Powered Risk Analysis" />
          <TypeRow name="Headline Medium" size="var(--fs-headline-md)" lineHeight="var(--lh-headline-md)" weight="var(--font-weight-normal)" spec="28 / 36px · 400" token="--fs-headline-md / --lh-headline-md" sample="Dashboard Overview" />
          <TypeRow name="Headline Small" size="var(--fs-headline-sm)" lineHeight="var(--lh-headline-sm)" weight="var(--font-weight-normal)" spec="24 / 32px · 400" token="--fs-headline-sm / --lh-headline-sm" sample="Recent Claims Activity" />
          <TypeRow name="Title Large" size="var(--fs-title-lg)" lineHeight="var(--lh-title-lg)" weight="var(--font-weight-normal)" spec="22 / 28px · 400" token="--fs-title-lg / --lh-title-lg" sample="Fraud Detection Alerts" />
          <TypeRow name="Body Large" size="var(--fs-body-lg)" lineHeight="var(--lh-body-lg)" weight="var(--font-weight-normal)" spec="16 / 24px · 400" token="--fs-body-lg / --lh-body-lg" sample="The AI model analyzed 1,247 data points to assess this claim's validity and risk profile." />
          <TypeRow name="Body Large Medium" size="var(--fs-body-lg)" lineHeight="var(--lh-body-lg)" weight="var(--font-weight-medium)" spec="16 / 24px · 500" token="--fs-body-lg / --lh-body-lg" sample="Claim Summary Details" />
          <TypeRow name="Body Medium" size="var(--fs-body-md)" lineHeight="var(--lh-body-md)" weight="var(--font-weight-normal)" spec="14 / 20px · 400" token="--fs-body-md / --lh-body-md" sample="Submit supporting documents to expedite the review process and reduce settlement time." />
          <TypeRow name="Label / Button" size="var(--fs-body-md)" lineHeight="var(--lh-body-md)" weight="var(--font-weight-medium)" spec="14 / 20px · 500" token="--fs-body-md / --lh-body-md" sample="Submit Claim  ·  Review Now  ·  Approve Decision" />
          <TypeRow name="Body Small" size="var(--fs-body-sm)" lineHeight="var(--lh-body-sm)" weight="var(--font-weight-normal)" spec="12 / 16px · 400" token="--fs-body-sm / --lh-body-sm" sample="Last updated 2 minutes ago by Sarah Johnson, Senior Claims Adjuster" />
          <TypeRow name="Label Small" size="var(--fs-label-sm)" lineHeight="var(--lh-label-sm)" weight="var(--font-weight-normal)" spec="11 / 16px · 400" token="--fs-label-sm / --lh-label-sm" sample="WCAG AA COMPLIANT · ACCESSIBLE · READABLE AT SCALE" />
        </TokenCard>
      </section>

      {/* ── 3. Spacing ── */}
      <section>
        <SectionHeader num="3" title="Spacing & Layout"
          desc="An app-level 4px-based spacing scale. All values are multiples of 4px." />
        <TokenCard title="Spacing Tokens">
          {[
            { name: "space-1", px: 4, rem: "0.25rem" },
            { name: "space-2", px: 8, rem: "0.5rem" },
            { name: "space-3", px: 12, rem: "0.75rem" },
            { name: "space-4", px: 16, rem: "1rem" },
            { name: "space-6", px: 24, rem: "1.5rem" },
            { name: "space-8", px: 32, rem: "2rem" },
            { name: "space-10", px: 40, rem: "2.5rem" },
            { name: "space-12", px: 48, rem: "3rem" },
            { name: "space-16", px: 64, rem: "4rem" },
            { name: "space-20", px: 80, rem: "5rem" },
          ].map(s => <SpacingToken key={s.name} {...s} />)}
          <div className="mt-4 p-4 rounded-xl" style={{ background: "var(--surface-container-low)" }}>
            <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Grid System</p>
            <div className="grid grid-cols-3 gap-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
              <div className="p-3 rounded-lg text-center" style={{ background: "var(--accent)", border: "1px solid var(--primary-container)" }}>
                <p style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)" }}>Desktop</p>
                <p>12 columns · 24px gutter</p>
                <p>Max width: 1440px</p>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ background: "var(--violet-container)", border: "1px solid var(--violet-border)" }}>
                <p style={{ fontWeight: "var(--font-weight-medium)", color: "var(--violet)" }}>Tablet</p>
                <p>8 columns · 16px gutter</p>
                <p>768px – 1199px</p>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ background: "var(--warning-container)", border: "1px solid var(--warning-border)" }}>
                <p style={{ fontWeight: "var(--font-weight-medium)", color: "var(--warning)" }}>Mobile</p>
                <p>4 columns · 16px gutter</p>
                <p>320px – 767px</p>
              </div>
            </div>
          </div>
        </TokenCard>
      </section>

      {/* ── 4. Radius & Shadows ── */}
      <section>
        <SectionHeader num="4" title="Radius & Elevation"
          desc="Material 3-inspired shape tokens (var(--shape-*)) and shadow elevation levels for depth and hierarchy." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TokenCard title="Border Radius Tokens">
            <div className="flex items-end gap-6 flex-wrap py-2">
              {[
                { name: "XS", value: "var(--shape-xs)", px: "--shape-xs · 4px" },
                { name: "SM", value: "var(--shape-sm)", px: "--shape-sm · 8px" },
                { name: "MD", value: "var(--shape-md)", px: "--shape-md · 12px" },
                { name: "LG", value: "var(--shape-lg)", px: "--shape-lg · 16px" },
                { name: "XL", value: "var(--shape-xl)", px: "--shape-xl · 28px" },
                { name: "Full", value: "9999px", px: "full · 9999px" },
              ].map(r => <RadiusToken key={r.name} name={r.name} value={r.value} px={r.px} />)}
            </div>
          </TokenCard>
          <TokenCard title="Shadow Elevation">
            <div className="flex items-center gap-8 flex-wrap py-4">
              {[
                { name: "Elev 1", shadow: "0 1px 3px color-mix(in srgb, var(--foreground) 6%, transparent)", desc: "Cards, subtle" },
                { name: "Elev 2", shadow: "0 4px 12px color-mix(in srgb, var(--foreground) 8%, transparent)", desc: "Dropdowns" },
                { name: "Elev 3", shadow: "0 8px 24px color-mix(in srgb, var(--foreground) 10%, transparent)", desc: "Modals" },
                { name: "Elev 4", shadow: "0 16px 40px color-mix(in srgb, var(--foreground) 12%, transparent)", desc: "Popovers" },
                { name: "Elev 5", shadow: "0 24px 60px color-mix(in srgb, var(--foreground) 16%, transparent)", desc: "Toasts" },
              ].map(s => <ShadowToken key={s.name} {...s} />)}
            </div>
          </TokenCard>
        </div>
      </section>

      {/* ── 5. Motion ── */}
      <section>
        <SectionHeader num="5" title="Motion & Animation"
          desc="Duration and easing tokens for consistent micro-interactions. Hover the buttons to preview." />
        <TokenCard title="Motion Tokens">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MotionDemo name="Instant" desc="Focus rings, color swaps" duration="80ms" easing="linear" />
            <MotionDemo name="Fast" desc="Button feedback, toggles" duration="150ms" easing="ease-out" />
            <MotionDemo name="Normal" desc="Hover states, panels" duration="200ms" easing="cubic-bezier(0.4,0,0.2,1)" />
            <MotionDemo name="Smooth" desc="Modals, drawers" duration="300ms" easing="cubic-bezier(0.34,1.56,0.64,1)" />
            <MotionDemo name="Deliberate" desc="Page transitions" duration="400ms" easing="cubic-bezier(0.4,0,0.2,1)" />
            <MotionDemo name="Expressive" desc="Celebratory states" duration="600ms" easing="cubic-bezier(0.34,1.56,0.64,1)" />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Easing — Standard", value: "cubic-bezier(0.4,0,0.2,1)" },
              { label: "Easing — Enter", value: "cubic-bezier(0,0,0.2,1)" },
              { label: "Easing — Exit", value: "cubic-bezier(0.4,0,1,1)" },
              { label: "Easing — Spring", value: "cubic-bezier(0.34,1.56,0.64,1)" },
            ].map(e => (
              <div key={e.label} className="p-3 rounded-xl" style={{ background: "var(--surface-container-low)", border: "1px solid var(--surface-container)" }}>
                <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{e.label}</p>
                <p className="text-xs mt-1 font-mono break-all" style={{ color: "var(--outline)", fontSize: "var(--fs-label-sm)" }}>{e.value}</p>
              </div>
            ))}
          </div>
        </TokenCard>
      </section>

    </div>
  );
}
