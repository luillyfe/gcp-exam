import { NextResponse } from "next/server";

import { AIModelResponse } from "@/app/lib/definitions";

import {
  getTextBetweenBackticks,
  validateResponse,
} from "@/app/lib/utils/textUtils";

import { insertIntoDatabase } from "@/app/lib/database";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = process.env.MODEL_NAME || "";
const API_KEY = process.env.API_KEY || "";
// Chat history
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

// GET /api/generative-ai
export async function GET() {
  const response = await run();
  let json;

  // parse JSON from text response
  try {
    const JSONString = getTextBetweenBackticks(response) || "{}";
    json = JSON.parse(JSONString);
  } catch {
    return NextResponse.json(
      { message: "Error parsing response" },
      {
        status: 501,
      }
    );
  }

  // validate that the json has the expected properties
  let validated: Array<AIModelResponse>;
  try {
    // @ts-expect-error: type coercion is valid
    validated = validateResponse(json);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error validating response" },
      {
        status: 501,
      }
    );
  }

  try {
    await insertIntoDatabase(validated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error inserting into database" },
      {
        status: 501,
      }
    );
  }

  // success: return response
  return NextResponse.json(json, {
    status: 200,
  });
}

async function run() {
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
