import OptionsWrapper from "@/app/components/optionsWrapper";
import { Store } from "@/app/lib/store";

export default async function Statement() {
  // Get a reference to the store, then get next question
  const myStore = Store.getStore();
  const { questions, questionIndex } = myStore.getState();
  const data = questions[questionIndex];

  return (
    <div className="max-w-5xl flex place-items-center flex-col justify-between">
      <header className="w-full font-bold dark:text-gray-30">
        <p className="mt-4 mb-4">
          Background: Acme Corporation is a leading provider of cloud-based
          software solutions. The company has been using Google Cloud Platform
          (GCP) for several years to host its applications and data. As the
          company&rsquo;s cloud usage has grown, so has the need for skilled
          cloud architects.
        </p>
        <p className="text-2xl mb-4">{data.question}</p>
      </header>

      <OptionsWrapper
        options={data.options}
        feedback={data.feedback}
        answer={data.answer}
      />
    </div>
  );
}
