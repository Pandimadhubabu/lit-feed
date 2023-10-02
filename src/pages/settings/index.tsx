import { User } from "../../types";

export default function Settings({ user }: { user: User }) {
  return (
    <main className="hidden w-full h-full lg:block lg:fixed lg:left-96 xl:left-[42rem]">
      Show the saved items here
    </main>
  );
}
