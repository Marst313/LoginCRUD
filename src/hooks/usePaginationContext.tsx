import React, { createContext, useContext, useState } from 'react';

interface PaginationContextType {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export function PaginationProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  return <PaginationContext.Provider value={{ currentPage, setCurrentPage, pageSize, setPageSize }}>{children}</PaginationContext.Provider>;
}

export function usePaginationHook() {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePaginationHook must be used within a PaginationProvider');
  }
  return context;
}
