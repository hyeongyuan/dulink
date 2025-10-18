import { createStore } from 'zustand';
import { useLinkStore } from '@/providers/linkStoreProvider';
import { extractQueries, type Query } from '@/utils/url';

export type LinkState = {
  value: string;
  queries: Query[];
};

export type LinkActions = {
  setValue: (newValue: string) => void;
  addEmptyQuery: () => void;
  setQueryValue: (name: string, newValue: string) => void;
};

export type LinkStore = LinkState & {
  actions: LinkActions;
};

const initialLinkState: LinkState = {
  value: '',
  queries: [{ name: '', value: '' }],
};

export const createLinkStore = (initialState: LinkState = initialLinkState) => {
  return createStore<LinkStore>()((set, get) => ({
    ...initialState,
    actions: {
      setValue: (newValue: string) => {
        set({
          value: newValue,
          queries: extractQueries(newValue),
        });
      },
      addEmptyQuery: () => {
        const { queries } = get();
        set({
          queries: [...queries, { name: '', value: '' }],
        });
      },
      setQueryValue: (name: string, newValue: string) => {
        const { value: link, queries } = get();
        if (!queries.find((query) => query.name === name)) {
          return;
        }
  
        const newQueries = queries.map((query) =>
          query.name === name ? { ...query, value: newValue } : query
        );
        
        const baseLink = link.split('?')[0];
        const searchParams = new URLSearchParams();
        newQueries.forEach(({ name, value }) => {
          if (value) {
            searchParams.append(name, value);
          }
        });
        const newLink = searchParams.toString()
          ? `${baseLink}?${searchParams.toString()}`
          : baseLink;
  
        set({
          value: newLink,
          queries: newQueries,
        });
      }
    },
  }));
};

export const useLinkValue = () => useLinkStore((state) => state.value);
export const useLinkQueries = () => useLinkStore((state) => state.queries);
export const useLinkActions = () => useLinkStore((state) => state.actions);
