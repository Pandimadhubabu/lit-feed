"use client";
import Shell from "@/components/Shell";

export default function Home() {
  return (
    <Shell headerTitle="Home">
      <main className="hidden w-full h-full lg:block lg:fixed lg:left-96 xl:left-[42rem]">
        Select a feed to get started
      </main>
    </Shell>
  );
}
