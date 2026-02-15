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
    <main className="min-h-screen bg-ink text-sand">
      <div className="mesh" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center">
        <div className="space-y-6 lg:max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
            MemberHaus Access
          </p>
          <h1 className="text-4xl font-semibold text-sand sm:text-5xl">
            Welcome back. Let’s run your membership.
          </h1>
          <p className="text-base text-stone-300">
            Masuk untuk mengelola tier, konten premium, dan pengalaman member
            Anda dalam satu dashboard yang rapi.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Preview build - sample data only
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-stone-500">
            <span>Secure login</span>
            <span>Unified analytics</span>
            <span>Member tools</span>
          </div>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm text-stone-300 transition hover:text-sand"
          >
            Back to homepage
          </button>
        </div>

        <div className="w-full rounded-3xl border border-stone-800 bg-charcoal p-8 shadow-hero">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Sign In</h2>
            <p className="text-sm text-stone-300">
              Use your credentials to access the dashboard.
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-700 bg-ink/60 px-4 py-2 text-sm text-stone-200 transition hover:border-stone-500"
            >
              Continue with Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-700 bg-ink/60 px-4 py-2 text-sm text-stone-200 transition hover:border-stone-500"
            >
              Continue with Facebook
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-stone-500">
            <span className="h-px w-full bg-stone-800" />
            OR
            <span className="h-px w-full bg-stone-800" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs uppercase tracking-[0.3em] text-stone-500">
              Email
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                className="mt-2 w-full rounded-2xl border border-stone-800 bg-ink px-4 py-3 text-sm text-sand placeholder:text-stone-500"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-stone-500">
              Password
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="mt-2 w-full rounded-2xl border border-stone-800 bg-ink px-4 py-3 text-sm text-sand placeholder:text-stone-500"
              />
            </label>
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Remember this device</span>
              <button
                type="button"
                className="transition hover:text-sand"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-sand px-4 py-3 text-sm font-semibold text-ink transition hover:bg-amber-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-400">
            New here?{" "}
            <button
              onClick={() => router.push("/sign-up")}
              className="font-semibold text-sand transition hover:text-amber-200"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12">
        <div className="rounded-3xl border border-stone-800 bg-ink/60 p-6 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Need help?
            </p>
            <p className="mt-2 text-sm text-stone-300">
              Reset akses atau lihat panduan onboarding terbaru.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
            <button
              onClick={() => router.push("/sign-up")}
              className="rounded-full border border-stone-700 px-4 py-2 text-sm font-semibold text-sand transition hover:border-stone-500"
            >
              Create account
            </button>
            <button
              onClick={() => router.push("/")}
              className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink transition hover:bg-amber-200"
            >
              View overview
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}