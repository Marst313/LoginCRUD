import { createContext, useContext, useState } from 'react';

// Define the SearchContext with an additional filter for `type`
const SearchContext = createContext<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  taskTypeFilter: 'Done' | 'Process' | 'Declined' | '';
  setTaskTypeFilter: React.Dispatch<React.SetStateAction<'Done' | 'Process' | 'Declined' | ''>>;
}>({
  search: '',
  setSearch: () => {},
  taskTypeFilter: '',
  setTaskTypeFilter: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('');
  const [taskTypeFilter, setTaskTypeFilter] = useState<'Done' | 'Process' | 'Declined' | ''>('');

  return <SearchContext.Provider value={{ search, setSearch, taskTypeFilter, setTaskTypeFilter }}>{children}</SearchContext.Provider>;
}

export function useSearchHook() {
  return useContext(SearchContext);
}
