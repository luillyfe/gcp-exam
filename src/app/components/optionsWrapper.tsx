"use client";
import { useState, ChangeEvent } from "react";

import clsx from "clsx";

import Option from "@/app/components/option";

export default function OptionsWrapper({
  data,
  feedback,
}: {
  data: { a: string; b: string; c: string; d: string };
  feedback: {
    option: string;
    text: string;
    explanation: string;
  };
}) {
  const [checked, setChecked] = useState("");
  const [correct, setCorrectOption] = useState("");
  const handleChange = (id: string) => {
    setChecked(id);
    setCorrectOption("");
  };

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: if no input control has been selected, show an alert
    // TODO: if input control has been selected, mark the input control
    // as correct or incorrect
    if (feedback.option === checked) {
      setCorrectOption(feedback.option);
      console.log(feedback.explanation);
    } else {
      setCorrectOption(feedback.option);
      console.log("wrong");
    }
  }

  return (
    <form
      className="w-full flex flex-col justify-around"
      onSubmit={handleSubmit}
    >
      <fieldset className="flex items-center justify-between mb-4">
        {
          <Option
            handleChange={handleChange}
            key={"a"}
            text={data.a}
            id={"a"}
            checked={checked === "a"}
            correct={correct}
          />
        }
        {
          <Option
            handleChange={handleChange}
            key={"b"}
            text={data.b}
            id={"b"}
            checked={checked === "b"}
            correct={correct}
          />
        }
        {
          <Option
            handleChange={handleChange}
            key={"c"}
            text={data.c}
            id={"c"}
            checked={checked === "c"}
            correct={correct}
          />
        }
        {
          <Option
            handleChange={handleChange}
            key={"d"}
            text={data.d}
            id={"d"}
            checked={checked === "d"}
            correct={correct}
          />
        }
      </fieldset>

      {correct && checked === correct && (
        <p className="flex w-full justify-center rounded-lg border border-transparent border-b px-5 py-4 dark:border-green-700 dark:text-green-700 mb-2">
          <code className="font-mono font-bold">{feedback.explanation}</code>
        </p>
      )}

      <button
        disabled={!checked}
        type="submit"
        className={clsx(
          "bg-blue-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded dark:bg-gray-700 dark:text-gray-200",
          {
            "opacity-50": !checked,
          }
        )}
      >
        Submit
      </button>
    </form>
  );
}
