"use client";
import { useState, ChangeEvent } from "react";

import Option from "@/app/components/option";

export default function OptionsWrapper({
  data,
}: {
  data: { a: string; b: string; c: string; d: string };
}) {
  const [checked, setChecked] = useState("");
  const handleChange = (id: string) => {
    setChecked(id);
  };

  return (
    <form className="w-full flex flex-col justify-around">
      <fieldset className="flex items-center justify-between h-[240px]">
        {
          <Option
            handleChange={handleChange}
            key={"a"}
            text={data.a}
            id={"a"}
            checked={checked === "a"}
          />
        }
        {
          <Option
            handleChange={handleChange}
            key={"b"}
            text={data.b}
            id={"b"}
            checked={checked === "b"}
          />
        }
        {
          <Option
            handleChange={handleChange}
            key={"c"}
            text={data.c}
            id={"c"}
            checked={checked === "c"}
          />
        }
        {
          <Option
            handleChange={handleChange}
            key={"d"}
            text={data.d}
            id={"d"}
            checked={checked === "d"}
          />
        }
      </fieldset>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded dark:bg-gray-700 dark:text-gray-200"
      >
        Submit
      </button>
    </form>
  );
}
