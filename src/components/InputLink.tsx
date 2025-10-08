'use client';

import { type ChangeEvent, useState } from "react";

export function InputLink() {
  const [value, setValue] = useState('');

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
