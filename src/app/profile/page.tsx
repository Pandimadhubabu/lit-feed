"use client";
import { Loading } from "@/components/Loading";
import Shell from "@/components/Shell";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function Profile() {
  const { user, isLoading: isUserLoading, error: userError } = useUser();
  if (isUserLoading) {
    return (
      <Shell headerTitle="Profile">
        <main className="w-full h-full">
          <Loading />
        </main>
      </Shell>
    );
  }

  if (userError) {
    return (
      <Shell headerTitle="Profile">
        <main className="w-full h-full">
          <div>{userError.message}</div>
        </main>
      </Shell>
    );
  }

  if (!user) {
    return (
      <Shell headerTitle="Profile">
        <main className="w-full h-full">
          <div>Not logged in</div>
        </main>
      </Shell>
    );
  }
  return (
    <Shell headerTitle="Profile">
      <main className="w-full h-full">
        <div className="flex flex-col items-center">
          {user.picture && (
            <Image
              src={user.picture}
              alt={user.name ?? ""}
              width={120}
              height={120}
              className="rounded-full p-4"
            />
          )}
          <div className="p-4">{user.name}</div>
          <div className="py-2 px-4">{user.email}</div>
          <button
            onClick={() => {
              window.location.href = "/api/auth/logout";
            }}
            className="bg-gray-800 text-white px-4 py-2 m-4 rounded-md"
          >
            Logout
          </button>
        </div>
      </main>
    </Shell>
  );
}
