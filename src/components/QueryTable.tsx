'use client';

import type { ChangeEvent } from "react";
import { useLinkActions, useLinkQueries } from "@/stores/linkStore";

export function QueryTable() {
  const queries = useLinkQueries();
  const { addEmptyQuery, setQueryValue } = useLinkActions();

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
              <td colSpan={2}>쿼리 파라미터 목록</td>
            </tr>
          </thead>
          <tbody>
            {queries.map(({ name, value }, index) => {
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: key is acceptable here
                <tr key={`${name}-${index}`}>
                  <td className="w-[40%]">
                    <input
                      type="text"
                      className="input input-sm input-ghost w-full"
                      name={`key-${name}`}
                      value={name}
                      placeholder="Key"
                      readOnly
                    />
                  </td>
                  <td className="w-[60%]">
                    <input
                      type="text"
                      className="input input-sm input-ghost w-full"
                      name={`value-${name}`}
                      value={value}
                      placeholder="Value"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="w-full" colSpan={2}>
                <button type="button" className="btn btn-ghost btn-sm w-full justify-start" onClick={addEmptyQuery}>
                  + 새로운 쿼리
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
