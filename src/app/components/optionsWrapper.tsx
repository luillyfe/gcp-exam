"use client";
import { useState, ChangeEvent, useCallback, useEffect } from "react";

import clsx from "clsx";

import { Answer, Options } from "@/app/lib/definitions";

import { fetchNextQuestion } from "@/app/actions";

import Option from "@/app/components/option";

export default function OptionsWrapper({
  options,
  feedback,
  answer,
}: {
  options: Options;
  feedback: Options;
  answer: Answer;
}) {
  const [checked, setChecked] = useState("");
  const [selected, setOptionSelected] = useState("");
  const [disableNext, setDisableNext] = useState(false);

  const entries = Object.entries(options);

  const handleChange = useCallback((id: string) => {
    setChecked(id);
    setOptionSelected("");
  }, []);

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    // reveal if selected option is correct
    setOptionSelected(answer);
  }

  function handleNext() {
    setDisableNext(true);
    fetchNextQuestion();
  }

  useEffect(() => {
    setChecked("");
    setOptionSelected("");
    setDisableNext(false);
  }, [options, feedback]);

  return (
    <form
      className="w-full flex flex-col justify-around"
      onSubmit={handleSubmit}
    >
      <fieldset className="flex justify-between mb-4">
        {entries.map(([key, value]) => (
          <Option
            handleChange={handleChange}
            key={key}
            text={value}
            id={key}
            checked={checked === key}
            selected={selected}
          />
        ))}
      </fieldset>

      {/* show feedback if the correct option has been selected */}
      {selected && checked === selected && (
        <p className="flex w-full justify-center rounded-lg border border-transparent border-b px-5 py-4 dark:border-green-700 dark:text-green-700 mb-2">
          <code className="font-mono font-bold">{feedback[answer]}</code>
        </p>
      )}

      {/* show a message if data.a === "" || feedback.text === ""  */}
      {(options.a === "" || feedback.a === "") && (
        <p className="flex w-full justify-center rounded-lg border border-transparent border-b px-5 py-4 dark:border-red-700 dark:text-red-700 mb-2">
          <code className="font-mono font-bold">
            Something went wrong. Please click on the button below to try again.
          </code>
        </p>
      )}

      {/* show submit button if answer has not been submitted: checked && correct */}
      {/* show next button if answer has been submitted: checked && correct */}
      {/* disable next button if answer has been submitted and next question is loading */}
      {/* show next button if some error has ocurred on the server: data = null || feedback = null */}
      {(checked && selected !== "") || options.a === "" || feedback.a === "" ? (
        <button
          disabled={disableNext}
          type="button"
          onClick={handleNext}
          className={clsx(
            "  text-white font-bold py-2 px-4 rounded dark:bg-gray-200 dark:text-gray-700",
            {
              "opacity-50": disableNext,
            }
          )}
        >
          Next
        </button>
      ) : (
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
      )}
    </form>
  );
}
