"use server";
import { sql } from "@vercel/postgres";

import { QueryResponse } from "@/app/lib/definitions";
import { formatData } from "@/app/lib/utils/textUtils";

export async function queryQuestionAnswersByPage(
  pageNumber = 1,
  pageSize = 10
): Promise<Array<QueryResponse>> {
  const offset = (pageNumber - 1) * pageSize;

  // Fetching records for the specific page number returning 10 records per page
  const { rows } = await sql`
        SELECT  a.question_id AS id,
                q.text question,
                array_agg(a.text) AS answers,
                array_agg(a.is_correct) iscorrect,
                array_agg(f.text) feedback,
                COUNT(*) AS answer_count
        FROM answers a
        JOIN questions q ON a.question_id = q.id
        JOIN feedback f ON f.answer_id = a.id 
        GROUP BY a.question_id, q.text
        LIMIT ${pageSize}
        OFFSET ${offset};
  `;

  return rows.map(formatData);
}
