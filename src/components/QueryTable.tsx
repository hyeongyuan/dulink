'use client';

export function QueryTable() {
  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" className="input input-ghost" />
          </td>
          <td>
            <input type="text" className="input input-ghost" />
          </td>
          <td>
            <input type="text" className="input input-ghost" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
