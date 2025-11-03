// src/context/TempUnitContext.ts
import { createContext } from "react";

export type Unit = "C" | "F";

export interface TempUnitContextProps {
  unit: Unit;
  toggleUnit: () => void;
}

// ✅ Just the context — no React components here
export const TempUnitContext = createContext<TempUnitContextProps | undefined>(
  undefined
);
