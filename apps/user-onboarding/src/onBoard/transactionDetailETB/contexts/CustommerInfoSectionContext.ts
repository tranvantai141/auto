import { createContext, useContext } from 'react';

export const CustommerInfoSectionContext = createContext<{
  selectedButton: 'updated' | 'old';
}>({
  selectedButton: 'updated',
});

export const CustommerInfoSectionProvider = CustommerInfoSectionContext.Provider;

export function useCustommerInfoSectionContext() {
  return useContext(CustommerInfoSectionContext);
}
