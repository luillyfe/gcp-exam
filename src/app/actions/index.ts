"use server";
import { revalidatePath } from "next/cache";

import { queryQuestionAnswersByPage } from "@/app/lib/database/queries";
import { Store } from "@/app/lib/store";

export async function fetchQuestions() {
  const myStore = Store.getStore();
  let { questionIndex, currentPage, pageSize, questions } = myStore.getState();

  // The question index is equal to -1 means that the store has not been
  // populate for the first time.
  // Every time the question index gets equal to the size of the page:
  // The question index must be reset to 0.
  // The current page must be incrementing by 1.
  // Otherwise: the question index and must be incremented by 1
  if (pageSize - 1 >= questionIndex || questionIndex === -1) {
    const nextQuestions = await queryQuestionAnswersByPage(
      currentPage,
      pageSize
    );

    questionIndex = 0;
    currentPage++;
    questions = nextQuestions;
  } else {
    questionIndex++;
  }

  myStore.setState({
    questionIndex,
    currentPage,
    pageSize,
    questions,
  });
}

export async function getNextQuestion() {
  await fetchQuestions();
  revalidatePath("/");
}
