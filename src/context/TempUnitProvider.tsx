// src/context/TempUnitProvider.tsx
import React, { useState, useEffect } from "react";
import { TempUnitContext, type Unit } from "./TempUnitContext";

export const TempUnitProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unit, setUnit] = useState<Unit>(() => {
    // load from localStorage if available
    return (localStorage.getItem("tempUnit") as Unit) || "C";
  });

  useEffect(() => {
    localStorage.setItem("tempUnit", unit);
  }, [unit]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <TempUnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TempUnitContext.Provider>
  );
};
