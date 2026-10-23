import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Search, Bell, HelpCircle, Sparkles, X } from "lucide-react";
import { aiInsights } from "../../data/mockData";
import { useStyleMode } from "../../styleMode";

const pageTitles: Record<string, { title: string; sub: string }> = {
  "/app/dashboard": { title: "Claims Dashboard", sub: "Overview & AI Insights" },
  "/app/claims": { title: "Claims Management", sub: "AI-prioritized claim queue" },
  "/app/fraud": { title: "Fraud Detection", sub: "AI-powered risk analysis" },
  "/app/analytics": { title: "Analytics", sub: "Performance metrics & trends" },
  "/app/reports": { title: "Reports", sub: "Export & share data" },
  "/app/settings": { title: "Settings", sub: "Platform configuration" },
  "/app/intake": { title: "New Claim Intake", sub: "Submit a new claim" },
  "/app/workflow": { title: "Workflow Automation", sub: "Pipeline & automation rules" },
};

interface HeaderProps {
  onOpenAI?: () => void;
}

export function Header({ onOpenAI }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [styleMode, setStyleMode] = useStyleMode();

  const page = pageTitles[location.pathname] ?? { title: "ClaimAI", sub: "" };
  const criticalAlerts = aiInsights.filter((i) => i.severity === "critical").length;

  return (
    <>
      <header
        className="flex items-center gap-4 px-6 flex-shrink-0"
        style={{
          height: 64,
          background: "var(--card)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 1px 3px color-mix(in srgb, var(--foreground) 4%, transparent)",
        }}
      >
        {/* Page Title */}
        <div className="flex-1 min-w-0">
          <h1
            className="leading-tight truncate"
            style={{ color: "var(--foreground)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-lg)", margin: 0 }}
          >
            {page.title}
          </h1>
          {page.sub && (
            <p className="text-xs truncate" style={{ color: "var(--outline)", marginTop: 1 }}>
              {page.sub}
            </p>
          )}
        </div>

        {/* Search */}
        <div className="relative hidden sm:block" style={{ width: 300 }}>
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: searchFocused ? "var(--primary)" : "var(--outline)", transition: "color 0.2s" }}
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search claims, claimants, IDs..."
            className="w-full rounded-xl pl-9 pr-3 text-sm outline-none transition-all"
            style={{
              height: 38,
              background: searchFocused ? "var(--card)" : "var(--surface-container-low)",
              border: searchFocused ? "1.5px solid var(--primary)" : "1.5px solid var(--border)",
              color: "var(--foreground)",
              fontSize: "var(--fs-body-sm)",
              boxShadow: searchFocused ? "0 0 0 3px color-mix(in srgb, var(--primary) 10%, transparent)" : "none",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={12} style={{ color: "var(--outline)" }} />
            </button>
          )}
        </div>

        {/* Style switch */}
        <div
          className="flex items-center rounded-full p-0.5 flex-shrink-0"
          style={{ background: "var(--surface-container)", border: "1px solid var(--border)" }}
          role="group"
          aria-label="Design style"
        >
          {(["material", "classic"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setStyleMode(m)}
              aria-pressed={styleMode === m}
              className="rounded-full px-3 transition-all"
              style={{
                height: 28,
                fontSize: "var(--fs-label-sm)",
                fontWeight: "var(--font-weight-medium)",
                background: styleMode === m ? "var(--primary)" : "transparent",
                color: styleMode === m ? "var(--primary-foreground)" : "var(--on-surface-variant)",
              }}
            >
              {m === "material" ? "Material 3" : "Classic"}
            </button>
          ))}
        </div>

        {/* AI Assistant Button */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-2 rounded-xl px-4 transition-all hover:opacity-90 active:scale-95 relative overflow-hidden"
          style={{
            height: 38,
            background: "var(--violet)",
            color: "var(--primary-foreground)",
            boxShadow: "0 2px 8px color-mix(in srgb, var(--violet) 35%, transparent)",
            flexShrink: 0,
          }}
        >
          <Sparkles size={14} />
          <span className="text-xs hidden md:block" style={{ fontWeight: "var(--font-weight-medium)" }}>
            AI Assistant
          </span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex items-center justify-center rounded-xl transition-all"
            style={{
              width: 38,
              height: 38,
              background: showNotifications ? "var(--accent)" : "var(--surface-container-low)",
              border: showNotifications ? "1.5px solid var(--primary-container)" : "1.5px solid var(--border)",
            }}
          >
            <Bell size={17} style={{ color: showNotifications ? "var(--primary)" : "var(--on-surface-variant)" }} />
            {criticalAlerts > 0 && (
              <span
                className="absolute top-1.5 right-1.5 flex items-center justify-center rounded-full text-primary-foreground"
                style={{
                  width: 14,
                  height: 14,
                  background: "var(--destructive)",
                  fontSize: "var(--fs-label-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  border: "1.5px solid var(--card)",
                }}
              >
                {criticalAlerts}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 top-12 rounded-2xl z-50 overflow-hidden"
              style={{
                width: 380,
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "0 20px 60px color-mix(in srgb, var(--foreground) 12%, transparent)",
              }}
            >
              <div
                className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: "1px solid var(--surface-container)" }}
              >
                <div>
                  <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>
                    AI Alerts & Notifications
                  </p>
                  <p className="text-xs" style={{ color: "var(--outline)" }}>
                    {aiInsights.length} new alerts
                  </p>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="flex items-center justify-center rounded-lg transition-colors hover:bg-surface-container"
                  style={{ width: 28, height: 28 }}
                >
                  <X size={14} style={{ color: "var(--outline)" }} />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {aiInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="px-5 py-3.5 cursor-pointer transition-colors hover:bg-surface-container-low"
                    style={{ borderBottom: "1px solid var(--surface-container-low)" }}
                    onClick={() => {
                      setShowNotifications(false);
                      navigate("/app/fraud");
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 rounded-xl flex items-center justify-center"
                        style={{
                          width: 34,
                          height: 34,
                          background:
                            insight.severity === "critical"
                              ? "var(--destructive-container)"
                              : insight.severity === "warning"
                              ? "var(--warning-container)"
                              : "var(--accent)",
                          marginTop: 1,
                        }}
                      >
                        <Sparkles
                          size={14}
                          style={{
                            color:
                              insight.severity === "critical"
                                ? "var(--destructive)"
                                : insight.severity === "warning"
                                ? "var(--warning)"
                                : "var(--primary)",
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p
                            className="text-xs truncate"
                            style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}
                          >
                            {insight.title}
                          </p>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{
                              background:
                                insight.severity === "critical"
                                  ? "var(--destructive-container)"
                                  : insight.severity === "warning"
                                  ? "var(--warning-container)"
                                  : "var(--accent)",
                              color:
                                insight.severity === "critical"
                                  ? "var(--destructive)"
                                  : insight.severity === "warning"
                                  ? "var(--warning)"
                                  : "var(--primary)",
                              fontWeight: "var(--font-weight-medium)",
                              textTransform: "capitalize",
                            }}
                          >
                            {insight.severity}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: "var(--muted-foreground)", lineHeight: 1.5 }}>
                          {insight.description}
                        </p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs" style={{ color: "var(--outline)" }}>
                            {insight.timestamp}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}
                          >
                            {insight.action} →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center justify-center py-3"
                style={{ borderTop: "1px solid var(--surface-container)" }}
              >
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/app/fraud");
                  }}
                  className="text-xs transition-colors hover:opacity-80"
                  style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}
                >
                  View all alerts →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button
          className="flex items-center justify-center rounded-xl transition-all"
          style={{
            width: 38,
            height: 38,
            background: "var(--surface-container-low)",
            border: "1.5px solid var(--border)",
          }}
          onClick={onOpenAI}
          title="Help & AI Assistant"
        >
          <HelpCircle size={17} style={{ color: "var(--on-surface-variant)" }} />
        </button>
      </header>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </>
  );
}