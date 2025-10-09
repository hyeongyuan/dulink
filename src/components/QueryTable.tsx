'use client';

import type { ChangeEvent } from "react";
import { useLinkActions, useLinkQueries } from "@/stores/linkStore";

export function QueryTable() {
  const queries = useLinkQueries();
  const { setQueryValue } = useLinkActions();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.name, event.target.value);
  };

  return (
    <div className="tabs tabs-border">
      <input type="radio" name="parameters" className="tab" defaultChecked aria-label="파라미터" />
      <div className="tab-content pt-2">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>쿼리 파라미터 목록</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {queries.map(({ name, value }, index) => {
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: key is acceptable here
                <tr key={`${name}-${index}`}>
                  <td>
                    <input
                      type="text"
                      className="input input-sm input-ghost w-full"
                      value={name}
                      placeholder="Key"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input input-sm input-ghost w-full"
                      name={name}
                      value={value}
                      placeholder="Value"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
