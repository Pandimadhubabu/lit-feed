"use client";
import Shell from "@/components/Shell";
import { useEffect, useState } from "react";

export default function Filters() {
  return (
    <Shell headerTitle="Filters">
      <main className="hidden w-full h-full lg:block lg:fixed lg:left-96 xl:left-[42rem]">
        Show the filters here and let the user edit them
      </main>
    </Shell>
  );
}
