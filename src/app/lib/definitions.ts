// export type Response = []Question

// Question type
export type AIModelResponse = {
  question: string;
  options: Array<Option>;
  explanation: Array<Explanation>;
};

export type Option = {
  name: string;
  text: string;
  isCorrect: boolean;
};

export type Explanation = {
  name: string;
  text: string;
};

// Response coming from fetch questions endpoint
export type QueryResponse = {
  // context: string;
  question: string;
  options: Options;
  feedback: Options;
  answer: Answer;
};

export type Options = {
  a: string;
  b: string;
  c: string;
  d: string;
};

export type Answer = "a" | "b" | "c" | "d";
