import Image from "next/image";

import Answer from "@/app/components/answer";

export default function Home() {
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
            <p>
              Context: You are a Cloud Architect working on a project for a
              large e-commerce company. The company is looking to migrate their
              e-commerce platform to Google Cloud Platform (GCP).
            </p>
            <br />
            <p className="text-2xl">
              The company has a requirement for high availability and disaster
              recovery for their e-commerce platform. They also need to be able
              to scale their platform to handle large spikes in traffic during
              peak shopping seasons. How would you architect a solution on GCP
              to meet these requirements?
            </p>
          </legend>

          <Answer
            text="Use a single region with multiple zones for high availability and
              failover."
            id="a"
          />

          <Answer
            text="Deploy your application across multiple regions for global load
            balancing."
            id="b"
          />

          <Answer
            text="Implement a hybrid cloud solution with on-premises and GCP
            resources."
            id="c"
          />

          <Answer
            text="Use a combination of Cloud Storage, Cloud SQL, and Cloud
            Bigtable for storage and data management."
            id="d"
          />
        </fieldset>
      </div>

      <div />
    </main>
  );
}
