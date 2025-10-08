

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
