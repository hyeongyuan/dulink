import { InputLink } from "@/components/InputLink";
import { QueryTable } from "@/components/QueryTable";
import { LinkStoreProvider } from "@/providers/linkStoreProvider";

interface HomeProps {
  searchParams: Promise<{ link?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { link } = await searchParams;

  return (
    <div className="p-4 flex flex-col h-full gap-4 bg-base-200">
      <LinkStoreProvider initialLink={link}>
        <InputLink />
        <div className="overflow-x-auto">
          <QueryTable />
        </div>
      </LinkStoreProvider>
    </div>
  );
}
