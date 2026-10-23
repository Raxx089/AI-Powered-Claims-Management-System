import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AIAssistant } from "../AIAssistant";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function MainLayout() {
  const navigate = useNavigate();
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar onNewClaim={() => navigate("/app/intake")} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onOpenAI={() => setAiOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Button */}
      {!aiOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
          onClick={() => setAiOpen(true)}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 rounded-2xl px-4 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5 active:scale-95"
          style={{
            height: 48,
            background: "var(--violet)",
            color: "var(--primary-foreground)",
            boxShadow: "0 8px 24px color-mix(in srgb, var(--violet) 35%, transparent)",
          }}
        >
          <div className="relative flex-shrink-0">
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ background: "var(--violet-soft)" }}
            />
            <Sparkles size={17} className="relative" />
          </div>
          <div className="text-left">
            <p className="text-xs leading-none" style={{ fontWeight: "var(--font-weight-medium)" }}>AI Assistant</p>
            <p className="text-xs leading-none opacity-60 mt-0.5">Ask me anything</p>
          </div>
        </motion.button>
      )}

      {/* AI Assistant Panel */}
      <AIAssistant open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
