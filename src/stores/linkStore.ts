import { create } from 'zustand';
import { extractQueries, type Query } from '@/utils/url';

interface LinkStore {
  value: string;
  queries: Query[];
  actions: {
    setValue: (newValue: string) => void;
    setQueryValue: (name: string, newValue: string) => void;
  };
}

const useLinkStore = create<LinkStore>((set, get) => ({
  value: '',
  queries: [{ name: '', value: '' }],
  actions: {
    setValue: (newValue: string) => {
      set({
        value: newValue,
        queries: extractQueries(newValue),
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

export const useLinkValue = () => useLinkStore((state) => state.value);
export const useLinkQueries = () => useLinkStore((state) => state.queries);
export const useLinkActions = () => useLinkStore((state) => state.actions);
