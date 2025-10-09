import { InputLink } from "@/components/InputLink";
import { QueryTable } from "@/components/QueryTable";

export default function Home() {
  return (
    <div className="p-4 flex flex-col h-full gap-4 bg-base-200">
      <InputLink />
      <div className="overflow-x-auto">
        <QueryTable />
      </div>
    </div>
  );
}
