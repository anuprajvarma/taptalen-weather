// src/hooks/useTempUnit.ts
import { useContext } from "react";
import { TempUnitContext } from "../context/TempUnitContext";

export const useTempUnit = () => {
  const context = useContext(TempUnitContext);
  if (!context) {
    throw new Error("useTempUnit must be used within a TempUnitProvider");
  }
  return context;
};
