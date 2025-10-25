import { InputLink } from "@/components/InputLink";
import { QueryTable } from "@/components/QueryTable";
import { LinkStoreProvider } from "@/providers/linkStoreProvider";
import { extractQueries } from "@/utils/url";

interface HomeProps {
  searchParams: Promise<{ link?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { link = '' } = await searchParams;

  const decodedLink = decodeURIComponent(link);
  return (
    <div className="p-4 flex flex-col h-full gap-4 bg-base-200">
      <LinkStoreProvider initialState={{
        value: decodedLink,
        queries: extractQueries(decodedLink),
      }}>
        <InputLink />
        <div className="overflow-x-auto">
          <QueryTable />
        </div>
      </LinkStoreProvider>
    </div>
  );
}
