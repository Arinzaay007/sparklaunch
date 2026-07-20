"use client";

import * as React from "react";

import { CommandPalette } from "@/components/command-palette";

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  openPalette: () => void;
  closePalette: () => void;
  toggle: () => void;
}

const CommandPaletteContext =
  React.createContext<CommandPaletteContextValue | null>(null);

/**
 * Provides global command-palette state and renders the palette itself.
 * Wrap the app once (see the root layout); any client component can then call
 * `useCommandPalette()` to open, close, or toggle it — no window events needed,
 * which keeps the wiring explicit and easy to drive from tests.
 */
export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const value = React.useMemo<CommandPaletteContextValue>(
    () => ({
      open,
      setOpen,
      openPalette: () => setOpen(true),
      closePalette: () => setOpen(false),
      toggle: () => setOpen((o) => !o),
    }),
    [open]
  );

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandPalette />
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette(): CommandPaletteContextValue {
  const ctx = React.useContext(CommandPaletteContext);
  if (!ctx) {
    throw new Error(
      "useCommandPalette must be used within a <CommandPaletteProvider>"
    );
  }
  return ctx;
}
