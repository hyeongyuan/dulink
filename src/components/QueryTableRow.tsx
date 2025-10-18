'use client';

import { useState } from "react";
import { TextareaJson } from "@/components/TextareaJson";
import { isValidJson } from "@/utils/json";

type ValueType = 'text' | 'json';

interface QueryTableRowProps {
  name: string;
  value: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function QueryTableRow({ name, value, onInputChange }: QueryTableRowProps) {
  const [valueType, setValueType] = useState<ValueType>('text');

  const handleValueTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValueType(event.target.value as ValueType);
  };

  return (
    <tr className="flex">
      <td className="flex-2 max-w-xs">
        <input
          type="text"
          className="input input-sm input-ghost w-full"
          name={`key-${name}`}
          value={name}
          placeholder="Key"
          readOnly
        />
      </td>
      <td className="flex-3">
        {valueType === 'text' && (
          <input
            type="text"
            className="input input-sm input-ghost w-full"
            name={name}
            value={value}
            placeholder="Value"
            onChange={onInputChange}
          />
        )}
        {valueType === 'json' && (
          <TextareaJson name={name} value={value} onChange={onInputChange} />
        )}
      </td>
      <td className="flex">
        <select
          className="select select-sm"
          value={valueType}
          onChange={handleValueTypeChange}
        >
          <option value="text">TEXT</option>
          <option value="json" disabled={!isValidJson(value)}>JSON</option>
        </select>
      </td>
    </tr>
  );
}
