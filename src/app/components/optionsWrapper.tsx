"use client";
import { useState, ChangeEvent, useCallback, useEffect } from "react";

import clsx from "clsx";

import { getNextQuestion } from "@/app/actions";

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
  const [disableNext, setDisableNext] = useState(false);

  const handleChange = useCallback((id: string) => {
    setChecked(id);
    setCorrectOption("");
  }, []);

  // TODO: if no input control has been selected, show an alert.
  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    // if input control has been selected, mark the input control
    // as correct or incorrect
    if (feedback.option === checked) {
      setCorrectOption(feedback.option);
    } else {
      setCorrectOption(feedback.option);
    }
  }

  function handleNext() {
    setDisableNext(true);
    getNextQuestion();
  }

  useEffect(() => {
    setChecked("");
    setCorrectOption("");
    setDisableNext(false);
  }, [data, feedback]);

  return (
    <form
      className="w-full flex flex-col justify-around"
      onSubmit={handleSubmit}
    >
      <fieldset className="flex justify-between mb-4">
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

      {/* show feedback if the correct option has been selected */}
      {correct && checked === correct && (
        <p className="flex w-full justify-center rounded-lg border border-transparent border-b px-5 py-4 dark:border-green-700 dark:text-green-700 mb-2">
          <code className="font-mono font-bold">{feedback.explanation}</code>
        </p>
      )}

      {/* show a message if data.a === "" || feedback.text === ""  */}
      {(data.a === "" || feedback.text === "") && (
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
      {(checked && correct !== "") || data.a === "" || feedback.text === "" ? (
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
