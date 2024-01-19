import { NextResponse } from "next/server";

import { AIModelResponse } from "@/app/lib/definitions";

import {
  getTextBetweenBackticks,
  validateResponse,
} from "@/app/lib/utils/textUtils";

import { insertIntoDatabase } from "@/app/lib/database";
import { runAIModel } from "@/app/api/generative-ai/index";

// GET /api/generative-ai
export async function GET() {
  const response = await runAIModel();
  let json;

  // parse JSON from text response
  try {
    const JSONString = getTextBetweenBackticks(response) || "{}";
    json = JSON.parse(JSONString);
  } catch {
    console.error(response);
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

  // insert into database
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
