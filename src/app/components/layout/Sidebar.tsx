import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Shield,
  BarChart3,
  FileBarChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Bell,
  Plus,
  GitBranch,
  Sparkles,
} from "lucide-react";
import { currentUser } from "../../data/mockData";

const navItems = [
  { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/claims", label: "Claims", icon: FileText },
  { path: "/app/fraud", label: "Fraud Detection", icon: Shield, badge: "47" },
  { path: "/app/workflow", label: "Workflow", icon: GitBranch },
  { path: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/app/reports", label: "Reports", icon: FileBarChart },
  { path: "/app/design-system", label: "Design System", icon: Sparkles },
  { path: "/app/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  onNewClaim?: () => void;
}

export function Sidebar({ onNewClaim }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside
      className="flex flex-col h-full transition-all duration-300 relative flex-shrink-0"
      style={{
        width: collapsed ? "72px" : "240px",
        background: "var(--sidebar)",
        borderRight: "1px solid color-mix(in srgb, var(--card) 6%, transparent)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5"
        style={{ borderBottom: "1px solid color-mix(in srgb, var(--card) 7%, transparent)" }}
      >
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{
            width: 36,
            height: 36,
            background: "var(--primary)",
            boxShadow: "0 4px 12px color-mix(in srgb, var(--primary) 40%, transparent)",
          }}
        >
          <Zap size={18} className="text-primary-foreground" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sidebar-foreground leading-tight" style={{ fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-md)" }}>
              ClaimAI
            </p>
            <p className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 60%, transparent)" }}>
              InsureCorp Global
            </p>
          </div>
        )}
      </div>

      {/* New Claim Button */}
      <div className="px-3 pt-4 pb-2">
        <button
          onClick={onNewClaim}
          className="flex items-center gap-2 rounded-xl w-full transition-all hover:opacity-90 active:scale-95"
          style={{
            background: "var(--primary)",
            padding: collapsed ? "9px" : "9px 14px",
            justifyContent: collapsed ? "center" : "flex-start",
            boxShadow: "0 4px 12px color-mix(in srgb, var(--primary) 30%, transparent)",
          }}
        >
          <Plus size={16} className="text-primary-foreground flex-shrink-0" />
          {!collapsed && (
            <span className="text-primary-foreground text-sm" style={{ fontWeight: "var(--font-weight-medium)" }}>
              New Claim
            </span>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto space-y-0.5">
        {!collapsed && (
          <p
            className="px-3 mb-2 text-xs uppercase tracking-wider"
            style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 45%, transparent)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-label-sm)" }}
          >
            Navigation
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl mb-0.5 transition-all duration-150 ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-sidebar-foreground/65 hover:text-sidebar-foreground"
                }`
              }
              style={({ isActive }) => ({
                padding: collapsed ? "10px" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                background: isActive
                  ? "color-mix(in srgb, var(--primary) 18%, transparent)"
                  : "transparent",
                borderLeft: isActive
                  ? "2px solid var(--primary)"
                  : "2px solid transparent",
              })}
              title={collapsed ? item.label : undefined}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("text-primary-foreground"))
                  e.currentTarget.style.background = "color-mix(in srgb, var(--card) 4%, transparent)";
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("text-primary-foreground"))
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={17}
                    className="flex-shrink-0"
                    style={{ color: isActive ? "var(--inverse-primary)" : undefined }}
                  />
                  {!collapsed && (
                    <span className="text-sm flex-1">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className="ml-auto text-xs rounded-full px-2 py-0.5 flex-shrink-0"
                      style={{
                        background: "var(--destructive)",
                        color: "var(--primary-foreground)",
                        fontSize: "var(--fs-label-sm)",
                        fontWeight: "var(--font-weight-medium)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* AI Alerts Card */}
      {!collapsed && (
        <div
          className="mx-3 mb-3 rounded-xl p-3 cursor-pointer transition-all hover:opacity-90"
          style={{
            background: "color-mix(in srgb, var(--primary) 8%, transparent)",
            border: "1px solid color-mix(in srgb, var(--primary) 18%, transparent)",
          }}
          onClick={() => navigate("/app/fraud")}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Bell size={13} style={{ color: "var(--inverse-primary)" }} />
            <span className="text-xs" style={{ color: "var(--inverse-primary)", fontWeight: "var(--font-weight-medium)" }}>
              3 AI Alerts
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 70%, transparent)" }}>
            Fraud ring detected in Miami region
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--inverse-primary)", fontWeight: "var(--font-weight-medium)" }}>
            Review now →
          </p>
        </div>
      )}

      {/* User */}
      <div
        className="flex items-center gap-3 px-3 py-4 cursor-pointer transition-colors"
        style={{ borderTop: "1px solid color-mix(in srgb, var(--card) 7%, transparent)" }}
        onClick={() => navigate("/")}
        title={collapsed ? currentUser.name : undefined}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "color-mix(in srgb, var(--card) 4%, transparent)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }
      >
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0 text-xs text-primary-foreground"
          style={{
            width: 34,
            height: 34,
            background: "var(--success)",
            fontWeight: "var(--font-weight-medium)",
            boxShadow: "0 2px 8px color-mix(in srgb, var(--success) 30%, transparent)",
          }}
        >
          {currentUser.avatar}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm text-primary-foreground truncate" style={{ fontWeight: "var(--font-weight-medium)" }}>
              {currentUser.name}
            </p>
            <p className="text-xs truncate" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 60%, transparent)" }}>
              {currentUser.role}
            </p>
          </div>
        )}
        {!collapsed && <LogOut size={14} style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 60%, transparent)" }} />}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full transition-all hover:shadow-md"
        style={{
          width: 26,
          height: 26,
          background: "var(--sidebar-deep)",
          border: "1.5px solid var(--sidebar-border)",
          color: "var(--inverse-primary)",
          boxShadow: "0 2px 8px color-mix(in srgb, var(--foreground) 20%, transparent)",
        }}
      >
        {collapsed ? (
          <ChevronRight size={12} />
        ) : (
          <ChevronLeft size={12} />
        )}
      </button>
    </aside>
  );
}