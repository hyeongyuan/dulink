import { useEffect, useRef, useState } from "react";
import { isValidJson, minifyJson, prettyPrintJson } from "@/utils/json";

interface TextareaJsonProps {
  name: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextareaJson({ name, value, onChange }: TextareaJsonProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [jsonValue, setJsonValue] = useState<string>(prettyPrintJson(value));
  const [isShowToast, setIsShowToast] = useState(false);

  useEffect(() => {
    setJsonValue(prettyPrintJson(value));
  }, [value]);

  const handleJsonInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    setJsonValue(newValue);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: 값 변경에 따른 높이 조절
  useEffect(() => {
    const textareaElement = textareaRef.current;
    if (!textareaElement) {
      return;
    }
    textareaElement.style.height = 'auto';
    textareaElement.style.height = `${textareaElement.scrollHeight}px`;
  }, [jsonValue, textareaRef.current]);

  const handleJsonInputKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 's' && event.metaKey) {
      event.preventDefault();

      handleSaveClick();
    }
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

      setIsShowToast(true);
      setTimeout(() => setIsShowToast(false), 2000);
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
        onKeyDown={handleJsonInputKeyDown}
        spellCheck={false}
        ref={textareaRef}
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
      <div className="toast toast-end">
        {isShowToast && (
          <div className="alert alert-success">
            <span>값이 저장되었습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}
