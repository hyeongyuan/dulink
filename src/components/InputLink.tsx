'use client';

import type { ChangeEvent } from "react";
import { useLinkActions, useLinkValue } from "@/stores/linkStore";

export function InputLink() {
  const value = useLinkValue();
  const { setValue } = useLinkActions();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex gap-2 w-full">
      <label className="input flex flex-1">
        Link
        <input type="text" className="grow" placeholder="https://xxx.onelink.me" value={value} onChange={handleChange} />
      </label>
      <button type="button" className="btn">보내기</button>
    </div>
  );
}
