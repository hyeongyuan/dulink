import { InputLink } from "@/components/InputLink";
import { QueryTable } from "@/components/QueryTable";

export default function Home() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <a className="btn btn-ghost text-xl" href="/">Dulink</a>
      </div>
      <div className="p-4 flex flex-col gap-4 bg-base-100">
        <InputLink />
        <div className="overflow-x-auto">
          <QueryTable />
        </div>
      </div>
    </>
  );
}
