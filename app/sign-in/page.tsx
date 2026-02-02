"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign In</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-neutral-700 rounded-md px-4 py-2 hover:bg-neutral-900"
        >
          Continue with Google
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-neutral-700 rounded-md px-4 py-2 hover:bg-neutral-900"
        >
          Continue with Facebook
        </button>
      </div>

      <div className="w-full flex items-center gap-3 text-neutral-400 text-sm">
        <span className="h-px w-full bg-neutral-800" />
        OR
        <span className="h-px w-full bg-neutral-800" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >
          Sign In
        </button>
      </form>
    </main>
  );
}