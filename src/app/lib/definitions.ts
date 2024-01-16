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
