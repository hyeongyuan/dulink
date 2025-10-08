'use client';

import { type ChangeEvent, Fragment, type UIEvent, useEffect, useRef, useState } from "react";
import { useLinkActions, useLinkValue } from "@/stores/linkStore";

export function InputLink() {
  const value = useLinkValue();
  const { setValue } = useLinkActions();

  const keyWordsRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState(0); 

  useEffect(() => {
    if (keyWordsRef.current) {
      keyWordsRef.current.scrollLeft = scrollValue;
    }
  }, [scrollValue]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleScroll = (event: UIEvent<HTMLTextAreaElement>) => {
    setScrollValue(event.currentTarget.scrollLeft);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const wordBlocks = generateWordBlocks(value);

  return (
    <div className="flex gap-2 w-full">
      <label className="input flex flex-1">
        Link
        <div className="relative flex items-stretch flex-1">
          <div ref={keyWordsRef} className="Input__keyWordsWrapper">
            {wordBlocks.map(({ text, highlight }, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: key is acceptable here
              <Fragment key={`text-block-${index}`}>
                {highlight ? (
                  <span className="Input__keyWord">{text}</span>
                ) : text}
              </Fragment>
            ))}
          </div>
          <textarea
            name="link"
            className="Input__field grow textarea-ghost"
            placeholder="https://xxx.onelink.me"
            value={value}
            onChange={handleChange}
            onScroll={handleScroll}
            rows={1}
          />
        </div>
      </label>
      <button type="button" className="btn" onClick={handleCopy}>
        복사
      </button>
    </div>
  );
}

interface WordBlock {
  text: string;
  highlight: boolean;
}

function generateWordBlocks(link: string) {
  const [urlWithoutQueries, queryString] = link.split('?');
  const keyValues = queryString?.split('&') || [];
  return [
    { text: urlWithoutQueries, highlight: false },
    queryString !== undefined && { text: '?', highlight: false },
    ...keyValues.flatMap((keyValue, index) => {
      const [key, value] = keyValue.split('=');
      return [
        index !== 0 && { text: '&', highlight: false },
        { text: key, highlight: true },
        value !== undefined && { text: '=', highlight: false },
        value !== undefined && { text: value || '', highlight: true },
      ].filter(Boolean);
  }),
  ].filter(Boolean) as WordBlock[];
}
