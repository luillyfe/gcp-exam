const { db } = require("@vercel/postgres");
const { v4: uuidv4 } = require("uuid");

import { AIModelResponse, Option } from "@/app/lib/definitions";

export async function insertIntoDatabase(data: Array<AIModelResponse>) {
  const client = await db.connect();

  for (const item of data) {
    const { question, options, explanation } = item;

    // Insert the question into the questions table
    console.log("Inserting into question table...");
    const questionId = uuidv4();
    await client.sql`
            INSERT INTO questions (id, text, objective, difficulty)
            VALUES (${questionId}, ${question}, ${null}, 'easy')
        `;

    // Insert the answers into the answers table
    console.log("Inserting into answers table...");
    const answers = await Promise.all(
      options.map((option) => {
        const id = uuidv4();
        return client.sql`
        INSERT INTO answers (id, question_id, text, is_correct)
        VALUES (${id}, ${questionId}, ${option.text}, ${option.isCorrect})
    `.then(() => {
          return { name: option.name, id };
        });
      })
    );

    // Insert the feedback into the feedback table
    console.log("Inserting into feedback table...");
    await Promise.all(
      explanation.map(
        (exp) => client.sql`
        INSERT INTO feedback (question_id, answer_id, text)
        VALUES ( ${questionId}, ${findAnswerId(exp.name, answers)}, ${exp.text})
    `
      )
    );
  }

  await client.end();
  console.log("Success...");
}

function findAnswerId(
  name: string,
  insertedOption: Array<Option & { id: string }>
) {
  for (const option of insertedOption) {
    if (option.name === name) {
      return option.id;
    }
  }
  return null;
}
