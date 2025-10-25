import { v4 as uuid } from 'uuid';
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
  updateQuery: (id: string, query: Partial<Query>) => void;
};

export type LinkStore = LinkState & {
  actions: LinkActions;
};

const initialLinkState: LinkState = {
  value: '',
  queries: [{ id: uuid(),  name: '', value: '' }],
};

export const createLinkStore = (initialState: LinkState = initialLinkState) => {
  return createStore<LinkStore>()((set, get) => ({
    ...initialState,
    actions: {
      setValue: (newValue) => {
        set({
          value: newValue,
          queries: extractQueries(newValue),
        });
      },
      addEmptyQuery: () => {
        const { queries } = get();
        set({
          queries: [...queries, { id: uuid(), name: '', value: '' }],
        });
      },
      updateQuery: (id, newQuery) => {
        const { queries, value: link } = get();
        if (!queries.find((query) => query.id === id)) {
          return;
        }
  
        const newQueries = queries.map((query) => query.id === id ? { ...query, ...newQuery } : query);

        const baseLink = link.split('?')[0];
        const searchParams = new URLSearchParams();
        newQueries.forEach(({ name, value }) => {
          if (name) {
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
      },
    },
  }));
};

export const useLinkValue = () => useLinkStore((state) => state.value);
export const useLinkQueries = () => useLinkStore((state) => state.queries);
export const useLinkActions = () => useLinkStore((state) => state.actions);
