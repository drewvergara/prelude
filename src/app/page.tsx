import DotCountdown from "@/components/dot-countdown";

export default function Home() {
  return (
    <div className="bg-black min-h-full w-full justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DotCountdown />
      </main>
    </div>
  );
}
