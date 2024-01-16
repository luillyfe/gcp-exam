// Dear Duet AI, help me write a function that given a text,
// returns anything in between the backtips.
// Example, Input: This is ```the text``` I want. Output: the text
export function getTextBetweenBackticks(text: string) {
  const regex = /```([\s\S]*)```/;
  const matches = regex.exec(text);

  if (matches && matches.length > 1) {
    return matches[1];
  }

  return null;
}

// Dear Duet AI, help me write a function named validateResponse,
// it will check if the input has all the properties in the Response type definition.
// Otherwise return an error.

export function validateResponse(response: Array<Response>): Array<Response> {
  const requiredProperties = ["question", "options", "explanation"];

  // Check if the response has all the required properties
  // If not, throw an error
  // Otherwise return the response
  if (!Array.isArray(response)) {
    throw new Error("Response is not an array");
  }

  for (const item of response) {
    if (typeof item !== "object") {
      throw new Error("Response is not an object");
    }

    for (const property of requiredProperties) {
      if (!item.hasOwnProperty(property)) {
        throw new Error(`Missing property: ${property}`);
      }
    }
  }

  return response;
}
