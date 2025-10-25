import { v4 as uuid } from 'uuid';

export interface Query {
  id: string;
  name: string;
  value: string;
}

export function extractQueries(link: string): Query[] {
  try {
    const url = new URL(link);
    return Array.from(url.searchParams.entries())
      .map(([name, value]) => ({ id: uuid(), name, value }));
  } catch {
    return [];
  }
}

export function encodeOnlyQueries(url: string): string {
  try {
    const parsedUrl = new URL(url);
    const encodedParams = new URLSearchParams();

    parsedUrl.searchParams.forEach((value, key) => {
      encodedParams.append(key, value);
    });
    
    parsedUrl.search = encodedParams.toString();
    return parsedUrl.toString();
  } catch {
    return url;
  }
}
