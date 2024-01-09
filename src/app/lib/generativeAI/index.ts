// call run function from init file
import { run } from "./init";

// interface for data
interface Data {
  context: string;
  situationalQuestion: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  feedback: {
    option: string;
    text: string;
    explanation: string;
  };
}

// function to predict the next question
export async function predict() {
  const response = await run();
  let data: Data = {
    context: "",
    situationalQuestion: "",
    options: {
      a: "",
      b: "",
      c: "",
      d: "",
    },
    feedback: {
      option: "",
      text: "",
      explanation: "",
    },
  };

  try {
    data = JSON.parse(response);
  } catch (error) {
    console.log(error);
  }

  return data;
}
