

export interface Query {
  name: string;
  value: string;
}

export function extractQueries(link: string): Query[] {
  try {
    const url = new URL(link);
    return Array.from(url.searchParams.entries()).map(([name, value]) => ({ name, value }));
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
