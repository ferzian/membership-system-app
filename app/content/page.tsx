"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

type MembershipTier = "A" | "B" | "C";

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
  A: 1,
  B: 3,
  C: "all",
};

const tierLabels: Record<MembershipTier, string> = {
  A: "Membership A",
  B: "Membership B",
  C: "Membership C",
};

export default function ContentPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
      return;
    }

  }, [isPending, session, router]);

  const sessionTier = (
    session?.user as { membershipTier?: MembershipTier } | undefined
  )?.membershipTier;
  const membershipTier = sessionTier && tierLimits[sessionTier] ? sessionTier : "A";

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
    return <p className="text-center mt-8 text-stone-500">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-stone-500">Redirecting...</p>;

  const renderList = (items: Item[], visibleCount: number) =>
    items.map((item, index) => {
      const isLocked = index >= visibleCount;
      return (
        <li
          key={item.id}
          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
            isLocked
              ? "border-stone-800 bg-ink/40 text-stone-400"
              : "border-stone-700 bg-ink/60"
          }`}
        >
          <span>{item.title}</span>
          {isLocked && (
            <span className="rounded-full bg-stone-800 px-3 py-1 text-xs text-stone-300">
              Terkunci
            </span>
          )}
        </li>
      );
    });

  return (
    <main className="min-h-screen bg-ink text-sand fade-up">
      <div className="mesh" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="mx-auto w-full max-w-6xl space-y-8 px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Member library
            </p>
            <h1 className="text-3xl font-semibold">Konten & Video</h1>
            <p className="text-sm text-stone-300">
              Akses terbatas berdasarkan membership.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Preview build - sample data only
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-stone-700 bg-ink/60 px-4 py-2 text-sm text-stone-200">
              {tierLabels[membershipTier]}
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-full border border-stone-700 bg-ink/60 px-4 py-2 text-sm text-stone-200 transition hover:border-stone-500"
            >
              Ubah Membership
            </button>
          </div>
        </div>

        <section className="rounded-3xl border border-stone-800 bg-charcoal p-6">
          <h2 className="text-xl font-semibold">Ringkasan Akses</h2>
          <p className="mt-2 text-sm text-stone-300">
            Membership A: 1 konten & 1 video. Membership B: 3 konten & 3 video.
            Membership C: semua konten & video.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-800 bg-charcoal p-6">
            <div>
              <h2 className="text-xl font-semibold">Video</h2>
              <p className="text-sm text-stone-300">
                Menampilkan {visibleVideos.length}/{videos.length} video.
              </p>
            </div>
            <ul className="mt-4 space-y-3">
              {renderList(videos, visibleVideos.length)}
            </ul>
          </div>

          <div className="rounded-3xl border border-stone-800 bg-charcoal p-6">
            <div>
              <h2 className="text-xl font-semibold">Konten</h2>
              <p className="text-sm text-stone-300">
                Menampilkan {visibleContents.length}/{contents.length} konten.
              </p>
            </div>
            <ul className="mt-4 space-y-3">
              {renderList(contents, visibleContents.length)}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-stone-800 bg-ink/60 p-6 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Next steps
            </p>
            <p className="mt-2 text-sm text-stone-300">
              Upgrade tier untuk membuka lebih banyak materi premium.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-full border border-stone-700 px-4 py-2 text-sm font-semibold text-sand transition hover:border-stone-500"
            >
              Kelola membership
            </button>
            <button
              onClick={() => router.push("/settings")}
              className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink transition hover:bg-amber-200"
            >
              Atur preferensi
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
