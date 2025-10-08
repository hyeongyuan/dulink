'use client';

import type { ChangeEvent } from "react";
import { useLinkActions, useLinkQueries } from "@/stores/linkStore";

export function QueryTable() {
  const queries = useLinkQueries();
  const { setQueryValue } = useLinkActions();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.name, event.target.value);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {queries.map(({ name, value }) => (
          <tr key={name}>
            <td>
              <input type="text" className="input input-sm input-ghost" value={name} readOnly />
            </td>
            <td>
              <input type="text" className="input input-sm input-ghost" name={name} value={value} onChange={handleChange} />
            </td>
            <td>
              <input type="text" className="input input-sm input-ghost" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
