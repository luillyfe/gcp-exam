"use client";
import { memo } from "react";

import clsx from "clsx";

function Option({
  text,
  id,
  handleChange,
  checked = false,
  selected = "",
}: {
  text: string;
  id: string;
  handleChange: (id: string) => void;
  checked: boolean;
  selected: string;
}) {
  return (
    <div
      className={clsx(
        "group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-gray-100 hover:dark:border-neutral-100 hover:dark:bg-neutral-800/30",
        { "dark:border-neutral-100": checked && !selected },
        {
          "dark:border-green-700 dark:text-green-700":
            checked && selected === id,
        },
        {
          "dark:border-red-700 dark:text-red-700":
            selected !== "" && checked && selected !== id,
        }
      )}
      onClick={() => handleChange(id)}
    >
      <input
        checked={checked}
        onChange={() => handleChange(id)}
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

export default memo(Option);
