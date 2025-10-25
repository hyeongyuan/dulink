'use client';

import { type ChangeEvent, useCallback } from "react";
import { QueryTableRow } from "@/components/QueryTableRow";
import { useLinkActions, useLinkQueries } from "@/stores/linkStore";

export function QueryTable() {
  const queries = useLinkQueries();
  const { addEmptyQuery, updateQuery } = useLinkActions();

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const [id, name] = event.target.name.split('_');

    updateQuery(id, { [name]: event.target.value });
  }, [updateQuery]);

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
            {queries.map(({ id, name, value }) => {
              return (
                <QueryTableRow
                  key={id}
                  id={id}
                  name={name}
                  value={value}
                  onInputChange={handleInputChange}
                />
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
