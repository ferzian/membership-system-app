"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-6 text-white">
      <div className="w-full text-center space-y-1">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome, {user.name || "User"}!</p>
        <p>Email: {user.email}</p>
      </div>

      <section className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
        <h2 className="text-lg font-semibold">Membership Filter</h2>
        <p className="text-sm text-neutral-300">
          Pilih tipe membership yang ingin ditampilkan.
        </p>

        <fieldset className="mt-4 space-y-3">
          <legend className="sr-only">Tipe Membership</legend>

          <label className="flex items-start gap-3 rounded-lg border border-neutral-800 p-3 hover:border-neutral-600">
            <input
              type="radio"
              name="membership-filter"
              defaultChecked
              className="mt-1"
            />
            <div>
              <p className="font-medium">1 Video & 1 Konten</p>
              <p className="text-sm text-neutral-300">
                Hanya dapat melihat 1 video dan 1 konten.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-lg border border-neutral-800 p-3 hover:border-neutral-600">
            <input type="radio" name="membership-filter" className="mt-1" />
            <div>
              <p className="font-medium">3 Video & Konten</p>
              <p className="text-sm text-neutral-300">
                Dapat melihat 3 video dan konten.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-lg border border-neutral-800 p-3 hover:border-neutral-600">
            <input type="radio" name="membership-filter" className="mt-1" />
            <div>
              <p className="font-medium">Full Akses</p>
              <p className="text-sm text-neutral-300">
                Akses penuh semua video dan konten.
              </p>
            </div>
          </label>
        </fieldset>

        <div className="mt-4">
          <button className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200">
            Terapkan Filter
          </button>
        </div>
      </section>

      <button
        onClick={() => signOut()}
        className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
      >
        Sign Out
      </button>
    </main>
  );
}