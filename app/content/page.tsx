"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

type MembershipTier = "a" | "b" | "c";

type Item = {
  id: string;
  title: string;
};

const videos: Item[] = [
  { id: "v1", title: "Video 1: Intro Membership" },
  { id: "v2", title: "Video 2: Materi Dasar" },
  { id: "v3", title: "Video 3: Materi Lanjutan" },
  { id: "v4", title: "Video 4: Studi Kasus" },
  { id: "v5", title: "Video 5: Bonus" },
];

const contents: Item[] = [
  { id: "c1", title: "Konten 1: Panduan Awal" },
  { id: "c2", title: "Konten 2: Checklist" },
  { id: "c3", title: "Konten 3: Template" },
  { id: "c4", title: "Konten 4: Studi Kasus" },
  { id: "c5", title: "Konten 5: Bonus" },
];

const tierLimits: Record<MembershipTier, number | "all"> = {
  a: 1,
  b: 3,
  c: "all",
};

const tierLabels: Record<MembershipTier, string> = {
  a: "Membership A",
  b: "Membership B",
  c: "Membership C",
};

export default function ContentPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const getStoredTier = (): MembershipTier => {
    if (typeof window === "undefined") return "a";
    const stored = window.localStorage.getItem("membershipTier") as
      | MembershipTier
      | null;
    return stored && tierLimits[stored] ? stored : "a";
  };

  const [membershipTier] = useState<MembershipTier>(() => getStoredTier());

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  const { visibleVideos, visibleContents } = useMemo(() => {
    const limit = tierLimits[membershipTier];
    const slice = (items: Item[]) =>
      limit === "all" ? items : items.slice(0, limit);

    return {
      visibleVideos: slice(videos),
      visibleContents: slice(contents),
    };
  }, [membershipTier]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const renderList = (items: Item[], visibleCount: number) =>
    items.map((item, index) => {
      const isLocked = index >= visibleCount;
      return (
        <li
          key={item.id}
          className={`rounded-md border px-3 py-2 flex items-center justify-between ${
            isLocked
              ? "border-neutral-800 bg-neutral-900/40 text-neutral-400"
              : "border-neutral-700"
          }`}
        >
          <span>{item.title}</span>
          {isLocked && (
            <span className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
              Terkunci
            </span>
          )}
        </li>
      );
    });

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Konten & Video</h1>
          <p className="text-sm text-neutral-300">
            Akses terbatas berdasarkan membership.
          </p>
        </div>
        <div className="rounded-full border border-neutral-700 px-4 py-2 text-sm">
          {tierLabels[membershipTier]}
        </div>
      </div>

      <section className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
        <h2 className="text-lg font-semibold">Ringkasan Akses</h2>
        <p className="text-sm text-neutral-300">
          Membership A: 1 konten & 1 video. Membership B: 3 konten & 3 video.
          Membership C: semua konten & video.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-2 inline-flex items-center justify-center border border-neutral-600 text-white font-medium rounded-md px-4 py-2 hover:bg-neutral-900"
        >
          Ubah Membership
        </button>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
          <div>
            <h2 className="text-lg font-semibold">Video</h2>
            <p className="text-sm text-neutral-300">
              Menampilkan {visibleVideos.length}/{videos.length} video.
            </p>
          </div>
          <ul className="space-y-2">
            {renderList(videos, visibleVideos.length)}
          </ul>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
          <div>
            <h2 className="text-lg font-semibold">Konten</h2>
            <p className="text-sm text-neutral-300">
              Menampilkan {visibleContents.length}/{contents.length} konten.
            </p>
          </div>
          <ul className="space-y-2">
            {renderList(contents, visibleContents.length)}
          </ul>
        </div>
      </section>
    </main>
  );
}
