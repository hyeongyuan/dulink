'use client';

import { type ChangeEvent, Fragment, type UIEvent, useEffect, useRef, useState } from "react";
import { useLinkActions, useLinkValue } from "@/stores/linkStore";
import { encodeOnlyQueries } from "@/utils/url";

export function InputLink() {
  const value = useLinkValue();
  const { setValue } = useLinkActions();

  const keyWordsRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState(0); 

  const [isShowToast, setIsShowToast] = useState(false);

  useEffect(() => {
    if (keyWordsRef.current) {
      keyWordsRef.current.scrollLeft = scrollValue;
    }
  }, [scrollValue]);

  useEffect(() => {
    const encodedLink = encodeURIComponent(value);
    const url = new URL(window.location.toString());
    url.searchParams.set('link', encodedLink);

    window.history.pushState(null, '', url);
  }, [value]);

  const preventPressEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleScroll = (event: UIEvent<HTMLTextAreaElement>) => {
    setScrollValue(event.currentTarget.scrollLeft);
  };

  const handleBlur = () => {
    setValue(encodeOnlyQueries(value));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsShowToast(true);
      setTimeout(() => setIsShowToast(false), 2000);
    } catch {
      // ignore
    }
  };

  const wordBlocks = generateWordBlocks(value);

  return (
    <div className="flex gap-2 w-full">
      <label className="input flex flex-1">
        <span className="badge badge-neutral">
          Link
        </span>
        <div className="relative flex items-stretch flex-1">
          <div ref={keyWordsRef} className="Input__keyWordsWrapper mr-[2px]">
            {wordBlocks.map(({ text, highlight, type }, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: key is acceptable here
              <Fragment key={`text-block-${index}`}>
                {
                  highlight
                    ? <span className={`Input__keyWord ${type}`}>{text}</span>
                    : text
                }
              </Fragment>
            ))}
          </div>
          <textarea
            name="link"
            className="Input__field grow textarea-ghost mr-[2px]"
            placeholder="https://xxx.onelink.me"

            onKeyDown={preventPressEnter}
            value={value}
            onChange={handleChange}
            onScroll={handleScroll}
            onBlur={handleBlur}
            rows={1}
            spellCheck={false}
          />
        </div>
      </label>
      <button type="button" className="btn" onClick={handleCopy}>
        복사
      </button>
      <div className="toast toast-end">
        {isShowToast && (
          <div className="alert alert-success">
            <span>링크가 복사되었습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface WordBlock {
  text: string;
  highlight: boolean;
  type?: 'key' | 'value';
}

function generateWordBlocks(link: string) {
  const queryStartIndex = link.indexOf('?');
  if (queryStartIndex === -1) {
    return [{ text: link, highlight: false }];
  }

  const urlWithoutQueries = link.slice(0, queryStartIndex + 1);
  const queryString = link.slice(queryStartIndex + 1);
  const keyValues = queryString.split('&') || [];
  return [
    { text: urlWithoutQueries, highlight: false },
    ...keyValues.flatMap((keyValue, index) => {
      const valueStartIndex = keyValue.indexOf('=');
      if (valueStartIndex === -1) {
        return [
          index !== 0 && { text: '&', highlight: false },
          { text: keyValue, highlight: true, type: 'key' },
        ].filter(Boolean);
      }

      const key = keyValue.slice(0, valueStartIndex);
      const value = keyValue.slice(valueStartIndex + 1);
      return [
        index !== 0 && { text: '&', highlight: false },
        { text: key, highlight: true, type: 'key' },
        { text: '=', highlight: false },
        { text: value, highlight: true, type: 'value' },
      ].filter(Boolean);
  }),
  ].filter(Boolean) as WordBlock[];
}
