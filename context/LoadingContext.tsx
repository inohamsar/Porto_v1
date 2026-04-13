"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface LoadingContextType {
  progress: number;
  isLoaded: boolean;
  updateProgress: (value: number) => void;
  setLoaded: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const updateProgress = useCallback((value: number) => {
    setProgress(Math.floor(value));
  }, []);

  const setLoaded = useCallback((value: boolean) => {
    setIsLoaded(value);
  }, []);

  return (
    <LoadingContext.Provider value={{ progress, isLoaded, updateProgress, setLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
