'use client';

import { type ChangeEvent, useCallback } from "react";
import { QueryTableRow } from "@/components/QueryTableRow";
import { useLinkActions, useLinkQueries } from "@/stores/linkStore";

export function QueryTable() {
  const queries = useLinkQueries();
  const { addEmptyQuery, setQueryValue } = useLinkActions();

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.name, event.target.value);
  }, [setQueryValue]);

  return (
    <div className="tabs tabs-border">
      <input type="radio" name="parameters" className="tab" defaultChecked aria-label="파라미터" />
      <div className="tab-content pt-2">
        <table className="table table-xs">
          <thead>
            <tr>
              <td colSpan={3}>쿼리 파라미터 목록</td>
            </tr>
          </thead>
          <tbody>
            {queries.map(({ name, value }, index) => {
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: key is acceptable here
                <QueryTableRow key={`${name}-${index}`} name={name} value={value} onInputChange={handleInputChange}  />
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="w-full" colSpan={3}>
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
