"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<"A" | "B" | "C">("A");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      const tierRes = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: selectedTier }),
      });

      if (!tierRes.ok) {
        setError("Membership gagal disimpan. Silakan coba lagi.");
        return;
      }

      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-ink text-sand fade-up">
      <div className="mesh" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center">
        <div className="space-y-6 lg:max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
            Launch your community
          </p>
          <h1 className="text-4xl font-semibold text-sand sm:text-5xl">
            Create a membership that feels premium.
          </h1>
          <p className="text-base text-stone-300">
            Mulai dengan setup yang sederhana, lalu kembangkan ke tier premium,
            konten eksklusif, dan event komunitas.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Preview build - sample data only
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-stone-500">
            <span>Fast onboarding</span>
            <span>Tiered access</span>
            <span>Automations</span>
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
            <h2 className="text-2xl font-semibold">Create account</h2>
            <p className="text-sm text-stone-300">
              Start your free trial and set up your first tier today.
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
              Sign up with Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-700 bg-ink/60 px-4 py-2 text-sm text-stone-200 transition hover:border-stone-500"
            >
              Sign up with Facebook
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-stone-500">
            <span className="h-px w-full bg-stone-800" />
            OR
            <span className="h-px w-full bg-stone-800" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs uppercase tracking-[0.3em] text-stone-500">
              Full name
              <input
                name="name"
                placeholder="Your name"
                required
                className="mt-2 w-full rounded-2xl border border-stone-800 bg-ink px-4 py-3 text-sm text-sand placeholder:text-stone-500"
              />
            </label>
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
                placeholder="Minimum 8 characters"
                required
                minLength={8}
                className="mt-2 w-full rounded-2xl border border-stone-800 bg-ink px-4 py-3 text-sm text-sand placeholder:text-stone-500"
              />
            </label>
            <fieldset className="space-y-3">
              <legend className="text-xs uppercase tracking-[0.3em] text-stone-500">
                Membership type
              </legend>
              {([
                { key: "A", label: "Membership A", desc: "Akses 1 konten & 1 video." },
                { key: "B", label: "Membership B", desc: "Akses 3 konten & 3 video." },
                { key: "C", label: "Membership C", desc: "Akses penuh semua konten." },
              ] as const).map((tier) => (
                <label
                  key={tier.key}
                  className={`flex items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                    selectedTier === tier.key
                      ? "border-amber-200 bg-amber-200/10"
                      : "border-stone-800 bg-ink/60 hover:border-stone-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="membership-tier"
                    value={tier.key}
                    checked={selectedTier === tier.key}
                    onChange={() => setSelectedTier(tier.key)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-sand">{tier.label}</p>
                    <p className="text-sm text-stone-300">{tier.desc}</p>
                  </div>
                </label>
              ))}
            </fieldset>
            <button
              type="submit"
              className="w-full rounded-full bg-sand px-4 py-3 text-sm font-semibold text-ink transition hover:bg-amber-200"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-400">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/sign-in")}
              className="font-semibold text-sand transition hover:text-amber-200"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12">
        <div className="rounded-3xl border border-stone-800 bg-ink/60 p-6 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Launch checklist
            </p>
            <p className="mt-2 text-sm text-stone-300">
              Pilih tier, siapkan konten, lalu undang member pertama Anda.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
            <button
              onClick={() => router.push("/content")}
              className="rounded-full border border-stone-700 px-4 py-2 text-sm font-semibold text-sand transition hover:border-stone-500"
            >
              Preview konten
            </button>
            <button
              onClick={() => router.push("/")}
              className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink transition hover:bg-amber-200"
            >
              Lihat fitur
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}