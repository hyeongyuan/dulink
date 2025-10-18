import { useState } from "react";
import { isValidJson, minifyJson, prettyPrintJson } from "@/utils/json";

interface TextareaJsonProps {
  name: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextareaJson({ name, value, onChange }: TextareaJsonProps) {
  const [jsonValue, setJsonValue] = useState<string>(prettyPrintJson(value));

  const handleJsonInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    setJsonValue(newValue);
  };

  const handleSaveClick = () => {
    if (isValidJson(jsonValue) && onChange) {
      const syntheticEvent = {
        target: {
          name,
          value: minifyJson(jsonValue),
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const isValidJsonValue = isValidJson(jsonValue);
  return (
    <div className="relative">
      <textarea
        className={`textarea textarea-sm w-full whitespace-pre-wrap ${isValidJsonValue ? 'textarea-ghost' : 'textarea-error'}`}
        name={`${name}-json`}
        value={jsonValue}
        onChange={handleJsonInputChange}
        spellCheck={false}
      />
      {isValidJsonValue && (
        <button
          type="button"
          className="btn btn-xs absolute bottom-0 right-0"
          onClick={handleSaveClick}
        >
          저장
        </button>
      )}
    </div>
  );
}
