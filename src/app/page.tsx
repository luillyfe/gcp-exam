import Image from "next/image";

import { run as predict } from "@/app/lib/generativeAI";

import Option from "@/app/components/option";

export default async function Home() {
  const gcpExamOutput = await predict();
  const data = JSON.parse(gcpExamOutput);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Professional Cloud Architect &nbsp;
          <code className="font-mono font-bold">
            https://github.com/luillyfe/gcp-exam/issues
          </code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://cloud.google.com/learn/certification/cloud-architect"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/gcp.ico"
              alt="Google Cloud Platform"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="max-w-5xl flex place-items-center">
        <fieldset className="flex items-center justify-center h-[480px]">
          <legend className="w-full font-bold dark:text-gray-30">
            <p>Context: {data.context}</p>
            <br />
            <p className="text-2xl">{data.situationalQuestion}</p>
          </legend>

          {<Option key={"a"} text={data.options.a} id={"a"} />}
          {<Option key={"b"} text={data.options.b} id={"b"} />}
          {<Option key={"c"} text={data.options.c} id={"c"} />}
          {<Option key={"d"} text={data.options.d} id={"d"} />}
        </fieldset>
      </div>

      <div />
    </main>
  );
}
