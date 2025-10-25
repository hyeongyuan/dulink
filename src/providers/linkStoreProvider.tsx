'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand';
import { createLinkStore, type LinkState, type LinkStore } from '@/stores/linkStore';

export type LinkStoreApi = ReturnType<typeof createLinkStore>;

export const LinkStoreContext = createContext<LinkStoreApi | undefined>(
  undefined,
);

export interface LinkStoreProviderProps {
  children: ReactNode;
  initialState: LinkState;
}

export const LinkStoreProvider = ({
  children,
  initialState,
}: LinkStoreProviderProps) => {
  const storeRef = useRef<LinkStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createLinkStore(initialState);
  }

  return (
    <LinkStoreContext.Provider value={storeRef.current}>
      {children}
    </LinkStoreContext.Provider>
  );
};

export const useLinkStore = <T,>(
  selector: (store: LinkStore) => T,
): T => {
  const linkStoreContext = useContext(LinkStoreContext)

  if (!linkStoreContext) {
    throw new Error(`useLinkStore must be used within LinkStoreProvider`)
  }

  return useStore(linkStoreContext, selector);
}
