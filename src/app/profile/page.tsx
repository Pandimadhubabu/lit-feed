"use client";
import Shell from "@/components/Shell";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Profile() {
  const { user, isLoading: isUserLoading, error: userError } = useUser();
  return (
    <Shell headerTitle="Profile">
      <main className="w-full h-full">
        {isUserLoading || !user ? (
          "Loading..."
        ) : userError ? (
          <div>{userError.message}</div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={user.picture}
              alt={user.name}
              className="w-60 h-60 rounded-full p-4"
            />
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
        )}
      </main>
    </Shell>
  );
}
