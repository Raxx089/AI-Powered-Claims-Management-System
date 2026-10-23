import { useEffect, useState } from "react";

export type StyleMode = "material" | "classic";
const KEY = "claimai-style";

function read(): StyleMode {
  return localStorage.getItem(KEY) === "classic" ? "classic" : "material";
}

function apply(mode: StyleMode) {
  if (mode === "classic") document.documentElement.dataset.style = "classic";
  else delete document.documentElement.dataset.style;
}

export function initStyleMode() {
  apply(read());
}

export function useStyleMode() {
  const [mode, setMode] = useState<StyleMode>(read);
  useEffect(() => {
    apply(mode);
    localStorage.setItem(KEY, mode);
  }, [mode]);
  return [mode, setMode] as const;
}
