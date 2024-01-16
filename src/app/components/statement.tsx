import { predict } from "@/app/lib/generativeAI";

import OptionsWrapper from "@/app/components/optionsWrapper";

export default async function Statement() {
  const gcpExamOutput = await predict();
  // @ts-expect-error: gcpExamOutput is a valid string since is coming from the Network
  const data = JSON.parse(gcpExamOutput);

  return (
    <div className="max-w-5xl flex place-items-center flex-col justify-between">
      <header className="w-full font-bold dark:text-gray-30">
        <p className="mt-4 mb-4">Context: {data.context}</p>
        <p className="text-2xl mb-4">{data.situationalQuestion}</p>
      </header>

      <OptionsWrapper data={data.options} feedback={data.feedback} />
    </div>
  );
}
