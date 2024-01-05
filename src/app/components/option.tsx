"use client";
import { ChangeEvent } from "react";

import clsx from "clsx";

export default function Option({
  text,
  id,
  handleChange,
  checked,
}: {
  text: string;
  id: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}) {
  return (
    <div
      className={clsx(
        "group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-gray-100 hover:dark:border-neutral-100 hover:dark:bg-neutral-800/30",
        { "dark:border-neutral-100": checked }
      )}
      // @ts-expect-error: to fix later
      onClick={(event) => handleChange(event)}
    >
      <input
        checked={checked}
        onChange={handleChange}
        id={id}
        type="radio"
        value={id}
        className="hidden w-4 h-4"
      />

      <label htmlFor={id} className={`mb-3 text-sm`}>
        <h2 className={`mb-3 text-2xl font-semibold uppercase`}>
          {id}{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        {text}
      </label>
    </div>
  );
}
