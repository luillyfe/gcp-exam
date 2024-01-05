import { run as predict } from "@/app/lib/generativeAI";

import Options from "@/app/components/options";

export default async function Statement() {
  const gcpExamOutput = await predict();
  const data = JSON.parse(gcpExamOutput);

  return (
    <div className="max-w-5xl flex place-items-center flex-col justify-between">
      <header className="w-full font-bold dark:text-gray-30">
        <p>Context: {data.context}</p>
        <br />
        <p className="text-2xl">{data.situationalQuestion}</p>
      </header>

      <Options data={data.options} />
    </div>
  );
}
