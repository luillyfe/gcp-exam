import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Get model name and API KEY
const MODEL_NAME = process.env.MODEL_NAME || "";
const API_KEY = process.env.API_KEY || "";

// Get conversation history
const PART_1_USER = process.env.PART_1_USER || "";
const PART_1_MODEL = process.env.PART_1_MODEL || "";
const PART_2_USER = process.env.PART_2_USER || "";
const PART_2_MODEL = process.env.PART_2_MODEL || "";
const PART_3_USER = process.env.PART_3_USER || "";
const PART_3_MODEL = process.env.PART_3_MODEL || "";
const PART_4_USER = process.env.PART_4_USER || "";
const PART_4_MODEL = process.env.PART_4_MODEL || "";
const PART_5_USER = process.env.PART_5_USER || "";
const PART_5_MODEL = process.env.PART_5_MODEL || "";

export async function runAIModel() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 4096,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: PART_1_USER,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: PART_1_MODEL,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: PART_2_USER,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: PART_2_MODEL,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: PART_3_USER,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: PART_3_MODEL,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: PART_4_USER,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: PART_4_MODEL,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: PART_5_USER,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: PART_5_MODEL,
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(
    "Dear Gemini, please generate 5 more questions."
  );

  const response = result.response;
  return response.text();
}
